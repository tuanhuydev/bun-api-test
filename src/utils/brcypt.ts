import { pbkdf2, randomBytes } from 'crypto';

const salt = randomBytes(16).toString('hex');
const iterations = 1000;
const keyLength = 64;
const digest = 'sha512';

export const hashPassword = async (password: string) => {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      digest,
      (error, derivedKey) => {
        if (error) return reject(error);
        return resolve(derivedKey.toString('hex'));
      },
    );
  });
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return new Promise((resolve, reject) => {
    pbkdf2(
      password,
      hashedPassword,
      iterations,
      keyLength,
      digest,
      (error, derivedKey) => {
        if (error) return reject(error);
        return resolve(hashedPassword === derivedKey.toString('hex'));
      },
    );
  });
};
