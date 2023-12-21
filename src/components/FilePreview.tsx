'use client';

import Image from "next/image";
import Tags from "./Tag";
import { formatDateDistance } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { fetchMaterial } from "@/utils/requests";
import { getMaterialCacheKey } from "@/utils/cache";
import { Asset, Material } from "@/types/superbase";
import useMaterial from "@/hooks/material";
import useAsset from "@/hooks/asset";


const FilePreview = ({file, asset}: {file: Material, asset: Asset | null}) => (
    <section className="file-preview">
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
                <h2>{file.title}</h2>

                {/* <Tags items={file.departments}/> */}
                <p>{file.owner && `By ${file.owner.firstName}`} <span className="fw-800 dot-sep">
                    &#183;
                    </span> { formatDateDistance(file.created_at as Date) }</p>
            </div>


            <div className="cta">

                {/* Download */}
                <button 
                    className="icon icon-download btn box-shadow"
                    onClick={()=>window.open(asset?.access)}
                    aria-disabled={!asset}
                />
                <button
                    className="icon icon-link btn box-shadow"
                    onClick={()=>window.open(asset?.download)}
                    // download={true}
                    aria-disabled={!asset}/>
            </div>
        </div>

        {/* Feeds */}
    </section>
);




const FileDisplay = ({id}:{id:string}) => {
    const {loading, data, error} = useMaterial(id);
    const asset = useAsset(data?.asset as string)


    let template = <h3 className="fs-2 fw-700 text-center">Oops, file not found</h3>
    
    if (loading) template = <h3 className="fs-2 fw-700 text-center">Loading...</h3>

    if (error) template = <h3 className="fs-2 fw-700 text-center">{error.message}</h3>

    if (data) template = <FilePreview file={data} asset={asset}/>
    

    return template;
}


export default FileDisplay;
