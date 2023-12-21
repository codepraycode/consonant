'use client'
import { useState, useRef, ChangeEvent } from "react"
import axios from "axios"


interface UploadProps {
    name: string,
    onChange:(val:any)=>void,
    remove:()=>void,
    value: File
}


export const DocumentUpload = (props:UploadProps) => {


    // const [file, setFile] = useState<any>();
    const [progress, setProgress] = useState({
        started: false, pc: 0
    });
    const [message, setMessage] = useState<string | null>(null);

    const elemRef = useRef<HTMLInputElement | null>(null)

    // const handleUpload = () => {
    //     if (!file) return;

    //     const fd = new FormData();
    //     fd.append("file", file)

    //     setMessage("Uploading...")
    //     setProgress((prev)=>({
    //         ...prev,
    //         started: true,
    //     }));


    //     axios.post('https://httpbin.org/post', fd, {
    //         onUploadProgress: (progressEvent) => {

    //             // console.log(progressEvent.progress! * 100)
    //             setProgress((prev)=>({
    //                 ...prev,
    //                 pc: progressEvent.progress! * 100
    //             }));
    //         },
    //         headers: {
    //             "Custom-Header": "value"
    //         }
    //     }).then((res)=>{
    //         setMessage("Uploaded!")
    //         console.log(res.data)
    //     })
    //     .catch(err=>{
    //         setMessage("Upload Failed!")
    //         console.error(err)
    //     })
    // }

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
        console.log(files)
    }

    // console.log(file)

    const file = props.value;


    return(
        <div className="form-group box-shadow  doc-upload">
            <h3>Upload Files</h3>

            <div
                className="drop_box"
                onDragEnter={onDragenter}
                onDragOver={onDragover}
                onDrop={onDrop}
            >
                { !file ? (
                    <>
                        <h4>Select File here</h4>
                        <p>{message ? message: "Files Supported: PDF, TEXT, DOC , DOCX"}</p>

                    </>
                    ) : (
                        <p className="preview">
                            {file?.name}

                            {progress.started ? (
                                <>
                                    {
                                        progress.pc === 100 ? (
                                            <span className="icon icon-check"/>
                                        ): (
                                            <progress
                                                max={100}
                                                value={progress.pc}
                                                className="progress"
                                            />
                                        )
                                    }
                                </>
                                ) :
                                <button
                                    className="icon icon-times"
                                    title="Remove"
                                    onClick={()=>props.remove()}
                                />
                            }
                        </p>
                    )
                }

                <label htmlFor="file" className="sr-only">Upload a file</label>
                <input
                    type="file"
                    name={props.name}
                    hidden
                    accept=".doc,.docx,.pdf"
                    ref={elemRef}
                    // onChange={(e)=>setFile(()=>e.target.files && e.target.files[0])}
                    onChange={(e)=>props.onChange(e.target.files && (e.target.files[0] as File))}

                />
                {!file && (
                    <button
                        type="button"
                        className="btn"
                        onClick={()=>elemRef.current!.click()}
                    >
                        Choose File
                    </button>)
                }
            </div>

        </div>
    )
};


