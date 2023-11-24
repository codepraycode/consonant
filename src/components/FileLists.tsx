import { Content } from "@/types/content.types"
import Link from "next/link"


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


const FileList = ({ files }: { files: Content[] }) => {
    return (
        <div className="file-listing">

            {
                files.map((item)=> <FileListItem key={item.id} file={item}/>)
            }
        </div>
    )
};


export default FileList;
