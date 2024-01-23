'use client'
import useSearch from "@/context/SearchContext";
import { formatDateDistance } from "@/utils/time";
import SpinnerPreloader from "./Preloader";
import { useAdminContext } from "@/context/AdminContext";
import Icon from "./Icon";
import { MaterialTbRow } from "@/types/superbase/table";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";



const FileListItem = ({file, admin, copyLink}: {file:MaterialTbRow, admin?:boolean, copyLink:(id:string)=>void}) => (

    <article
        className="material box-shadow"
        data-admin={admin}
    >

        <div className="material__header">
            <span className="icon icon-file"/>

            <h3>{ file.title.split('.').slice(0, -1).join('.') }</h3>
        </div>

        <div className="material__meta">

            <div className="">
                <span className="tag">{file.title.split('.').pop()}</span>
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
                            <Icon name="link" label="Copy link to share" onClick={()=>copyLink(file.id)}/>
                        </>

                    )
                }
            </div>

        </div>
    </article>
)


const FileListing = ({ files, admin, altMessage, more}: { files: MaterialTbRow[], admin?:boolean, more?: boolean, altMessage?:string}) => {

    return (
        <div className="material-listing" data-admin={admin}>
            {files.length < 1 && <h4 className="preloader-center placeholder text-grey">{altMessage}</h4>}
            {
                files.map((item)=> <FileListItem
                    key={item.id}
                    file={item}
                    admin={admin}
                    copyLink={(id:string)=>{
                        const link = `${window.location.origin}/files/${id}`;

                        const  copied = copy(link);
                        const config = {
                            title: !copied ? 'Failed to copy link': 'Copied Material link',
                            message: !copied ? 'Could not copy material link, try again after a while'
                                                :'You can now share the link with others',
                            duration: 2000,
                            type: !copied ? 'error' : 'success'
                        }

                        toast(config.title, {
                            hideProgressBar: true,
                            autoClose: 2000,
                            type: !copied ? 'error' : 'success'
                        });

                    }}
                    />)
            }
        </div>
    )
};


export const SearchedFileList = () => {
    const { searchResult,searchQuery, loading, searchExhausted } = useSearch();


    const firstLoad = searchResult.found < 0 && loading;

    if (firstLoad) return <section className="preloader-center">
        <SpinnerPreloader/>
    </section>
    
    return <FileListing
        files={ searchResult.documents }
        altMessage={
            searchQuery.q !== '' ? 
            "No material found":
            'Enter a keyword related to the material you seek on the mutal network'
        }
        more={searchExhausted}
    />
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

