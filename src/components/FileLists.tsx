'use client'
import useSearch from "@/context/SearchContext";
import { formatDateDistance } from "@/utils/time";
import Link from "next/link"
import SpinnerPreloader from "./Preloader";
import { useAdminContext } from "@/context/AdminContext";
import MaterialModel from "@/lib/superbase/models/material.model";



const FileListItem = ({file, admin}: {file:MaterialModel, admin?:boolean}) => (

    <Link
        href={`/files/${file.id}`}
        onClick={(e)=>admin && e.preventDefault()}
        className="file-content box-shadow"
        // title={admin && 'Click to edit'}
    >
        <span className="icon icon-file"/>

        <div>
            <h3>{ file.title }</h3>

            {/* <Tags small/> */}
            <small className="text-small">
                {/* By {file.user?.firstName}
                <span className="fw-800 dot-sep">&#183;</span> */}
                { formatDateDistance(file.created_at as Date) }
            </small>
        </div>
    </Link>
)


const FileListing = ({ files, admin, altMessage}: { files: MaterialModel[], admin?:boolean, altMessage?:string}) => {

    return (
        <div className="file-listing" data-admin={admin}>
            {files.length < 1 && <h4 className="preloader-center fs-2 text-grey">{altMessage}</h4>}
            {
                files.map((item)=> <FileListItem key={item.id} file={item} admin={admin}/>)
            }
        </div>
    )
};


export const SearchedFileList = () => {
    const { searchResult, loading } = useSearch();

    if (loading) return <section className="preloader-center">
        <SpinnerPreloader/>
    </section>
    
    
    
    return <FileListing files={ searchResult } altMessage="No materials found"/>
}

export const AdminMaterials = () => {
    const {materials, loading, error} = useAdminContext();

    if (loading) return <h4 className="fw-400">Loading your files...</h4>

    if (error) return <h4 className="fs-3 fw-400">Error loading your files</h4>
    
    if (materials) return <FileListing files={materials} admin altMessage="You have no materials"/>

    return null;
}

