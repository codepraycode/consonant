'use client';

import { Content } from "@/types";
import Image from "next/image";
import Tags from "./Tag";
import { formatDateDistance } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "@/utils/requests";


const FilePreview = ({file}: {file: Content }) => (
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

                <Tags items={file.departments}/>
                <p>By {file.owner?.firstName} <span className="fw-800 dot-sep">&#183;</span> { formatDateDistance(file.createdAt as Date) }</p>
            </div>


            <div className="cta">

                {/* Download */}
                <button className="icon icon-download btn box-shadow" />
                <button className="icon icon-link btn box-shadow" />
            </div>
        </div>

        {/* Feeds */}
    </section>
);




const FileDisplay = ({id}:{id:string}) => {
    const {isLoading:loading, data, error} = useQuery({
        queryKey: [`contents-${id}`],
        queryFn: ()=>fetchContent(id)
    });


    let template = <h3 className="fs-2 fw-700 text-center">Oops, file not found</h3>
    
    if (loading) template = <h3 className="fs-2 fw-700 text-center">Loading...</h3>

    if (error) template = <h3 className="fs-2 fw-700 text-center">{error.message}</h3>

    if (data) template = <FilePreview file={data}/>
    

    return template;
}


export default FileDisplay;
