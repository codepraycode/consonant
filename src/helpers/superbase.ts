export enum SuperBaseError {
    DEFAULT = 'FILE-ERROR',
    FILENOTFOUND = 'FILE-NOT-FOUND',
    FILETOOLARGE="FILE-TOO-LARGE",
    FILEALREADYEXIST="FILE-ALREADY-EXIST",
}


export function handleSuperBaseResponse({data, error}: Record<string, any>){

    const _parsed_error = {code: '', message:''};

    if (error) {

        if (error.stack?.includes("Bucket not found")) {
            _parsed_error.code = SuperBaseError.FILENOTFOUND
            _parsed_error.message = "File missing or does not exist"
        }
        else if (error.error === 'Payload too large'){
            _parsed_error.code = SuperBaseError.FILETOOLARGE
            _parsed_error.message = "File must not be more than 25mb"
        }
        else if (error.error === 'Duplicate'){
            _parsed_error.code = SuperBaseError.FILEALREADYEXIST
            _parsed_error.message = "File already exist"
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