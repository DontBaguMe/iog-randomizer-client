class LogService {
    private readonly _logLevel: number

    constructor() {
        this._logLevel = parseInt(process.env.REACT_APP_IOGR_LOG_LEVEL)
    }

    public trace(msg: string, ...params: any[]): void {
        const level: number = 5
        if (this._logLevel < level) return

        if (params.length > 0) console.trace(msg, params)
        else console.trace(msg)
    }

    public debug(msg: string, ...params: any[]): void {
        const level: number = 4
        if (this._logLevel < level) return

        if (params.length > 0) console.debug(msg, params)
        else console.debug(msg)
    }

    public info(msg: string, ...params: any[]): void {
        const level: number = 3
        if (this._logLevel < level) return

        if (params.length > 0) console.log(msg, params)
        else console.log(msg)
    }

    public warn(msg: string, ...params: any[]): void {
        const level: number = 2
        if (this._logLevel < level) return

        if (params.length > 0) console.warn(msg, params)
        else console.warn(msg)
    }

    public error(msg: string, ...params: any[]): void {
        const level: number = 1
        if (this._logLevel < level) return

        if (params.length > 0) console.error(msg, params)
        else console.error(msg)
    }
}

const logService = new LogService()
export default logService
