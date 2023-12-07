export enum SuperBaseError {
    NOTFOUND = 'NOT-FOUND',
    FILETOOLARGE="FILE-TOO-LARGE",
}


export function handleSuperBaseResponse({data, error}: Record<string, any>){

    const _parsed_error = {code: ''};

    if (error) {

        if (error.stack?.includes("Bucket not found")) {
            _parsed_error.code = SuperBaseError.NOTFOUND
        }
        else if (error.error === 'Payload too large'){
            _parsed_error.code = SuperBaseError.FILETOOLARGE
        }
        
        else console.error("Error object:", error)
    }


    return {data, error: error && {..._parsed_error, ...error}}
}



/**
 * Calculate storage size for superbase storage
 * @param number size Size in megabytes
 * @return number   Calculated size in kilobytes
 */

export function calculateStorageSpace(size: number) {

    return size * 1024 * 1024;
}