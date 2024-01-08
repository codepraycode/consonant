/* Request DTO */

import { ValidData } from "@/types/superbase";

type ValidationIssue = {
    field: string,
    message: string
};




interface Validation {
    issues: ValidationIssue[] | null,
    validData: ValidData
}

class DTO {
    get fields(): ValidationIssue[] {
        return []
    }


    validateFormDataFieldsPresent(reqData: FormData): Validation {
        const fields = this.fields
        const validData:ValidData = {}


        const issues = fields.filter((item)=>{
            const dt = reqData.get(item.field);

            if (!dt) return true;

            validData[item.field] = dt;
        });

        return {
            issues: issues.length < 1 ? null : issues,
            validData
        }
    }
}


export class PostMaterialDTO extends DTO {

    get fields() {
        return [
            {
                field: 'title',
                message: 'title is required'
            },
            {
                field: 'course',
                message: 'Course is required'
            },
            {
                field: 'asset',
                message: 'Asset is required'
            },
            {
                field: 'user',
                message: 'User is required'
            },
        ]
    }    

}