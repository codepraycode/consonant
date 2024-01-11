
const docType: Record<string, string> = {
    'application/msword': 'Word document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word document',
    'application/pdf': 'PDF document',
    'application/text': 'Text document',
}

export function getDocumentType(type:string) {
    let _type = docType[type];


    if (!_type) _type = "Unknown document";


    return _type;
}
