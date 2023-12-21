import { NextResponse } from "next/server"

// type Status = 200 | 201 | 400 | 500;

export enum StatusCodes {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
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
interface RequestResponse {response:ResponseDTO, meta:{status: StatusCodes}}

const responseTemplate:RequestResponse = {
    response:{ 
        error: null,
        data: null,
        status: StatusCodes.OK
    },

    meta: {
        status: StatusCodes.OK
    }
}

const prepareResponseDTO = (
    data: ResponseDataPayload | ResponseErrorPayload,
    status: StatusCodes,
    error:boolean = false
    ): RequestResponse => {
    
    const responseDTO = {...responseTemplate}

    if (error) {
        responseDTO.response.error = data;
    }
    else responseDTO.response.data = data;

    responseDTO.response.status = status
    responseDTO.response.status = status
    return responseDTO;
}


// TODO: simplify this class methods
class ServerResponse {

    static created(data:ResponseDataPayload = {}){
        
        const {response, meta} = prepareResponseDTO(data, StatusCodes.CREATED)

        // console.log(data, {response, meta})
        return NextResponse.json(
            response,
            // data,
            // {status: 201}
            meta
        )
    }

    static ok(data:ResponseDataPayload = {}){

        const {response, meta} = prepareResponseDTO(data, StatusCodes.OK)

        return NextResponse.json(
            response, meta
        )
    }

    static error(
        data:ResponseDataPayload = {},
        status:StatusCodes =  StatusCodes.BAD_REQUEST
        ){
        
            const {response, meta} = prepareResponseDTO(data, status, true)
        return NextResponse.json(
            response, meta
        )
    }

}

export default ServerResponse