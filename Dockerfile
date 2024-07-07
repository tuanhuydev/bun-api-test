# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:canary AS base
RUN apt-get update && apt-get install -y iputils-ping

WORKDIR /usr/src/app

# INSTALL STAGE
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# BUILD STAGE
ARG MONGODB_URI
ARG MONGODB_DB

# Optionally set them as environment variables in the container
ENV MONGODB_URI=${MONGODB_URI}
ENV MONGODB_DB=${MONGODB_DB}
ENV NODE_ENV=production
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist /usr/src/app

# RUNTIME STAGE
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "app.js" ]