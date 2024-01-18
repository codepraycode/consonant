'use client';

import Image from "next/image";
import { formatDateDistance } from "@/utils/time";
import useMaterial from "@/hooks/material";
import Icon from "./Icon";
import MaterialModel from "@/lib/superbase/models/material.model";
import copy from "copy-to-clipboard";


const FilePreview = ({ file }: {file: MaterialModel}) => (
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
                        copy(link);
                    }}
                />
            </div>
        </div>
        {/* Feeds */}
    </section>
);




const FileDisplay = ({id}:{id:string}) => {
    const {loading, data, error} = useMaterial(id);


    let template = <h3 className="fs-2 fw-700 text-center">Oops, file not found</h3>
    
    if (loading) template = <h3 className="fs-2 fw-700 text-center">Loading...</h3>

    if (error) template = <h3 className="fs-2 fw-700 text-center">{error.message}</h3>

    if (data) template = <FilePreview file={data} />
    

    return template;
}


export default FileDisplay;
