'use client'
import { useState, useRef, ChangeEvent } from "react"
import axios from "axios"
import { TextInput } from "."
import { getDocumentType } from "@/utils/getDocType"
import logger from "@/utils/logger"


interface UploadProps {
    name: string,
    onChange:(val:any)=>void,
    remove:()=>void,
    value: File,
    label: string
}





const ReceiveUpload = ({name, onChange}: {name:string, onChange:(val:any)=>void}) => {
    
    const elemRef = useRef<HTMLInputElement | null>(null);

    function onDragenter(e: any) {
        e.stopPropagation();
        e.preventDefault();
    }

    function onDragover(e:any) {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDrop = (e:any) => {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;

        // handleFiles(files);
        logger.debug(files)
    }

    return (
        <div
            className="drop_box"
            onDragEnter={onDragenter}
            onDragOver={onDragover}
            onDrop={onDrop}
        >

            <h4>Select File here</h4>
            <p>{ "Files Supported: PDF, TEXT, DOC , DOCX" }</p>

            <label htmlFor="file" className="sr-only">Upload a file</label>
            <input
                type="file"
                name={name}
                hidden
                accept=".doc,.docx,.pdf"
                ref={elemRef}
                onChange={(e)=>onChange(e.target.files && (e.target.files[0] as File))}

            />

            <button
                type="button"
                className="btn"
                onClick={()=>elemRef.current!.click()}
            >
                Choose File
            </button>
        </div>
    );
}



const PreviewUpload = ({file, label, remove}:{file:File, label:string, remove: ()=>void}) => {

    const type = getDocumentType(file.type);

    return (
        <>
        <p className="preview">
            <span>{type}</span>
            <button
                className="icon icon-times"
                title="Remove"
                onClick={()=>remove()}
            />

        </p>
        <TextInput
            name="title"
            label="Enter a label for searching"
            onChange={(val)=>{}}
            value={label}
            disabled
        />
        </>
    )
}


const DocumentUpload = (props:UploadProps) => {


    const {value:file, label, name, onChange, remove} = props;

    return(
        <div className="form-group box-shadow  doc-upload">
            {/* <h3>Add file</h3> */}

            
            {file ? <PreviewUpload file={file} remove={remove} label={label}/> :
                    <ReceiveUpload name={name} onChange={onChange}/>
            }
        </div>
    )
};


export default DocumentUpload;