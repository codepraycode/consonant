'use client'
import useSearch from "@/context/SearchContext";
import { Material } from "@/types/superbase";
import { getMaterialCacheKey } from "@/utils/cache";
import { fetchAdminMaterials } from "@/utils/requests";
import { formatDateDistance } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"
import SpinnerPreloader from "./Preloader";



const FileListItem = ({file, admin}: {file:Material, admin?:boolean}) => (

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
                By {file.owner?.firstName}
                <span className="fw-800 dot-sep">&#183;</span>
                { formatDateDistance(file.created_at as Date) }
            </small>
        </div>
    </Link>
)


const FileListing = ({ files, admin, altMessage}: { files: Material[], admin?:boolean, altMessage?:string}) => {

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
    const {isLoading:loading, data, error} = useQuery({
        queryKey: [getMaterialCacheKey('admin')],
        queryFn: fetchAdminMaterials
    })

    if (loading) return <h4 className="fw-400">Loading your files...</h4>

    if (error) return <h4 className="fs-3 fw-400">Error loading your files</h4>
    
    if (data) return <FileListing files={data} admin altMessage="You have no materials"/>

    return null;
}

