
/**
 * Custom logger
 * 
 * Manage all logs in app, can be turned on/off anytime in any environment
 */
class Logger {

    private _log = console;

    debug(...args: any[]) {
        this._log.debug(...args)
    }
    error(...args: any[]) {
        this._log.error(...args)
    }
    log(...args: any[]) {
        this._log.log(...args)
    }
}


const logger = new Logger()
export default logger;