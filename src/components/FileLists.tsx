'use client'
import useSearch from "@/context/SearchContext";
import { Material } from "@/types/superbase";
import { MaterialTbRow } from "@/types/superbase/table";
import { getMaterialCacheKey } from "@/utils/cache";
import { fetchAdminMaterials } from "@/utils/requests";
import { formatDateDistance } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"



const FileListItem = ({file, admin}: {file:Material, admin?:boolean}) => (

    <Link
        href={`/files/${file.id}`}
        onClick={(e)=>e.preventDefault()}
        className="file-content box-shadow"
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


const FileListing = ({ files, admin}: { files: Material[], admin?:boolean}) => {

    return (
        <div className="file-listing">

            {
                files.map((item)=> <FileListItem key={item.id} file={item} admin={admin}/>)
            }
        </div>
    )
};


export const SearchedFileList = () => {
    const { searchResult } = useSearch();

    // TODO: Implement preloader for load state
    
    return <FileListing files={ searchResult }/>    
}

export const AdminMaterials = () => {
    const {isLoading:loading, data, error} = useQuery({
        queryKey: [getMaterialCacheKey('admin')],
        queryFn: fetchAdminMaterials
    })

    if (loading) return <h4 className="fs-3 fw-400">Loading your files...</h4>

    if (error) return <h4 className="fs-3 fw-400">Error loading your files</h4>
    
    if (data) return <FileListing files={data} admin/>

    return null;
}

