'use client'
import useSearch from "@/context/SearchContext";
import { Material } from "@/types/superbase";
import { MaterialTbRow } from "@/types/superbase/table";
import { fetchContents } from "@/utils/requests";
import { formatDateDistance } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"



const FileListItem = ({file}: {file:Material}) => (

    <Link
        href={`/files/${file.id}`}
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


const FileListing = ({ files }: { files: Material[]}) => {

    return (
        <div className="file-listing">

            {
                files.map((item)=> <FileListItem key={item.id} file={item}/>)
            }
        </div>
    )
};


export const SearchedFileList = () => {
    const { searchResult } = useSearch();

    // TODO: Implement preloader for load state
    
    return <FileListing files={ searchResult }/>    
}

export const UserFileList = () => {
    const {isLoading:loading, data, error} = useQuery({
        queryKey: ['user-files'],
        queryFn: fetchContents
    })

    if (loading) return <h4 className="fs-3 fw-400">Loading your files...</h4>

    if (error) return <h4 className="fs-3 fw-400">Error loading your files</h4>
    
    if (data) return <FileListing files={data}/>

    return null;
}

