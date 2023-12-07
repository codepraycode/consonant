import { NextResponse } from "next/server"

// type Status = 200 | 201 | 400 | 500;

export enum StatusCodes {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}

type ResponseDataPayload = Record<string, any>
type ResponseErrorPayload = {
    code?:'',
    message?: '',
    field?: ''
}

interface ResponseDTO {
    error: null | ResponseErrorPayload,

    data: null | ResponseDataPayload | ResponseDataPayload[],
    
    status: StatusCodes
}


const responseTemplate:ResponseDTO = {
    error: null,
    data: null,
    status: StatusCodes.OK
}

const prepareResponseDTO = (
    data: ResponseDataPayload | ResponseErrorPayload,
    status: StatusCodes,
    error:boolean = false
    ): ResponseDTO => {
    const response = {...responseTemplate}

    if (error) {
        response.error = data;
    }
    else response.data = data;

    response.status = status
    return response;
}

const responseMeta = (status: StatusCodes) => {
    return {
        status
    }
}

class ServerResponse {

    static created(data:ResponseDataPayload = {}){
        
        return NextResponse.json(
            prepareResponseDTO(data, StatusCodes.CREATED),
            responseMeta(StatusCodes.CREATED)
        )
    }

    static ok(data:ResponseDataPayload = {}){

        return NextResponse.json(
            prepareResponseDTO(data, StatusCodes.OK),
            responseMeta(StatusCodes.OK)
        )
    }

    static error(
        data:ResponseDataPayload = {},
        status:StatusCodes =  StatusCodes.BAD_REQUEST
        ){

        return NextResponse.json(
            prepareResponseDTO(data, status, true),
            responseMeta(status)
        )
    }

}

export default ServerResponse