import { MaterialTbRow } from "@/types/superbase/table";
import logger from "@/utils/logger";
import { formatDateDistance } from "@/utils/time";
import Icon from "./Icon";



interface FileItemProps {
    file:MaterialTbRow,
    admin?:boolean,
    copyLink:(id:string)=>void
}


const FileListItem = ({file, admin, copyLink}: FileItemProps) => (

    <article
        className="material box-shadow"
        data-admin={admin}
    >

        <div className="material__header">
            <span className="icon icon-file"/>

            <h3 title={file.title}>{ file.title }</h3>
        </div>

        <div className="material__meta">

            <div className="">
                <span className="tag" title={file.asset_type + ' file'}>{file.asset_type}</span>
                <span className="dot-sep">&#183;</span>
                <small className="text-small">
                    { formatDateDistance(file.created_at as Date) }
                </small>
            </div>

            <div className="call-to-action">
                {
                    admin ? (
                        <>
                            <Icon name="edit" label="Edit material" onClick={()=>logger.debug("Edit:", file.id)}/>
                            <Icon name="trash" label="Delete Material" onClick={()=>logger.debug("Delete:", file.id)}/>
                        </>):(
                        <>
                            <Icon button name="download" label="Download File" onClick={()=>window.open(file.asset_download)}/>
                            <Icon button name="link" label="Copy link to share" onClick={()=>copyLink(file.id)}/>
                        </>

                    )
                }
            </div>

        </div>
    </article>
)


export default FileListItem;