'use client'
import useSearch from "@/context/SearchContext";
import { formatDateDistance } from "@/utils/time";
import Link from "next/link"
import SpinnerPreloader from "./Preloader";
import { useAdminContext } from "@/context/AdminContext";
import MaterialModel from "@/lib/superbase/models/material.model";
import Icon from "./Icon";
import { MaterialTbRow } from "@/types/superbase/table";



const FileListItem = ({file, admin}: {file:MaterialTbRow, admin?:boolean}) => (

    <article
        className="material box-shadow"
        data-admin={admin}
    >

        <div className="material__header">
            <span className="icon icon-file"/>

            <h3>{ file.title }</h3>
        </div>

        <div className="material__meta">

            <div className="">
                <span className="tag">pdf</span>
                <span className="dot-sep">&#183;</span>
                <small className="text-small">
                    { formatDateDistance(file.created_at as Date) }
                </small>
            </div>

            <div className="call-to-action">
                {
                    admin ? (
                        <>
                            <Icon name="edit" label="Edit material" onClick={()=>console.log("Edit:", file.id)}/>
                            <Icon name="trash" label="Delete Material" onClick={()=>console.log("Delete:", file.id)}/>
                        </>):(
                        <>
                            <Icon name="download" label="Download File" onClick={()=>window.open(file.asset_download)}/>
                            <Icon name="link" label="Copy link to share" onClick={()=>window.open(file.asset_access)}/>
                        </>

                    )
                }
            </div>

        </div>
    </article>
)


const FileListing = ({ files, admin, altMessage}: { files: MaterialModel[], admin?:boolean, altMessage?:string}) => {

    return (
        <div className="material-listing" data-admin={admin}>
            {files.length < 1 && <h4 className="preloader-center placeholder text-grey">{altMessage}</h4>}
            {
                files.map((item)=> <FileListItem key={item.id} file={item} admin={admin}/>)
            }
        </div>
    )
};


export const SearchedFileList = () => {
    const { searchResult,searchQuery, loading } = useSearch();

    if (loading) return <section className="preloader-center">
        <SpinnerPreloader/>
    </section>
    
    return <FileListing files={ searchResult } altMessage={searchQuery ? "No material found": 'Enter a keyword related to the material you seek in your search'}/>
}

export const AdminMaterials = () => {
    const {materials, loading, error} = useAdminContext();

    if (loading) return <section className="preloader-center">
        <SpinnerPreloader/>
    </section>

    if (error) return <h4 className="fs-3 fw-400">Error loading your files</h4>
    
    if (materials) return <FileListing files={materials} admin altMessage="You have no material"/>

    return null;
}

