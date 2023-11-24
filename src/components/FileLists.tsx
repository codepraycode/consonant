'use client'
import useSearch from "@/context/SearchContext";
import { Content } from "@/types/content.types"
import Link from "next/link"


type FileListProps  = {
    files?: Content[]
} 

const FileListItem = ({file}:{ file: Content}) => (

    <Link
        href={`/files/${file.id}`}
        className="file-content box-shadow"
    >
        <span className="icon icon-file"/>

        <div>
            <h3>{ file.title }</h3>

            {/* <Tags small/> */}
            <p>By XXXXXX (4 months ago)</p>
        </div>
    </Link>
)


const FileListing = ({ files }: FileListProps & { files: Content[]}) => {

    return (
        <div className="file-listing">

            {
                files.map((item)=> <FileListItem key={item.id} file={item}/>)
            }
        </div>
    )
};


const FileList = ({ search, files }: FileListProps & { search?: boolean }) => {
    const { searchResult } = useSearch();
    
    if (search) return <FileListing files={ searchResult }/>


    return <FileListing files={files as Content[]}/>
}

export default FileList;
