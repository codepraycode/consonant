'use client';

import Image from "next/image";
import { formatDateDistance } from "@/utils/time";
import useMaterial from "@/hooks/material";
import Icon from "./Icon";
import MaterialModel from "@/lib/superbase/models/material.model";
import copy from "copy-to-clipboard";
import { useToasts } from "toast-noty";


const FilePreview = ({ file, copyLink }: {file: MaterialModel, copyLink:(link:string)=>void}) => (
    <section className="material-preview">
        <div className="img-preview">
            <Image
                src={"/images/icons/file.svg"}
                width={100}
                height={100}
                alt="Document preview"
            />
        </div>


        <div>
            <div className="details-preview">
                <h3>{file.title}</h3>
                
                <p>
                    { formatDateDistance(file.created_at as Date) }
                </p>
            </div>


            <div className="cta">

                {/* Download */}

                <Icon name="download" label="Download File" onClick={()=>window.open(file.asset_download)}/>
                <Icon
                    name="link"
                    label="Copy link to share"
                    onClick={()=>{
                        const link = `${window.location.origin}/files/${file.id}`;
                        
                        copyLink(link);
                    }}
                />
            </div>
        </div>
        {/* Feeds */}
    </section>
);




const FileDisplay = ({id}:{id:string}) => {
    const {loading, data, error} = useMaterial(id);


    const { createToast } = useToasts();


    let template = <h3 className="fs-2 fw-700 text-center">Oops, file not found</h3>
    
    if (loading) template = <h3 className="fs-2 fw-700 text-center">Loading...</h3>

    if (error) template = <h3 className="fs-2 fw-700 text-center">{error.message}</h3>

    if (data) template = <FilePreview
        file={data}
        copyLink={(link:string)=>{
            const copied = copy(link);

            const config = {
                type: !copied ? 'danger' : 'success',
                title: !copied ? 'Failed to copy link': 'Copied Material link',
                message: !copied ? 'Could not copy material link, try again after a while'
                                    :'You can now share the link with others',
                duration: 3.5
            }

            createToast(config);
        }}/>
    

    return template;
}


export default FileDisplay;
