

// Configure log level

const log_level = process.env.LOG_LEVEL; // if not specified, defaults to 'all'
// const isDevelopment = process.env.NODE_ENV === 'development';
const all_log_level = log_level === 'all';
const debug_level = log_level === 'debug';
const info_level = log_level === 'info';
const error_level = log_level === 'error';

/**
 * Custom logger
 * 
 * Manage all logs in app, can be turned on/off anytime in any environment
 */
class Logger {

    private _log = console;

    debug(...args: any[]) {
        if (!all_log_level || !debug_level) return

        this._log.debug(...args)
    }
    error(...args: any[]) {
        if (!all_log_level || !error_level) return
        this._log.error(...args)
    }
    info(...args: any[]) {
        if (!all_log_level || !info_level) return
        this._log.log(...args)
    }
}


const logger = new Logger()
export default logger;