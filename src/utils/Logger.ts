export class Logger {
    public log(message: string) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(message);
        }
    }
}
