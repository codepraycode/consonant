export enum SuperBaseError {
    NOTFOUND = 'NOT-FOUND'
}


export function handleSuperBaseResponse({data, error}: Record<string, any>){

    const _parsed_error = {code: ''};

    if (error?.stack?.includes("Bucket not found")) {
        _parsed_error.code = SuperBaseError.NOTFOUND
    }else {
        console.log(error.stack)
    }


    return {data, error: error && {..._parsed_error, ...error}}
}