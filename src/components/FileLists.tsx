'use client'
import useSearch from "@/context/SearchContext";
import SpinnerPreloader from "./Preloader";
import { useAdminContext } from "@/context/AdminContext";
import { MaterialTbRow } from "@/types/superbase/table";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useEffect } from "react";
import '../store/Search';
import { observer } from "mobx-react-lite";
import FileListItem from "./FileItem";



const FileListing = ({ files, admin, altMessage, error}: { files: MaterialTbRow[], error?:string | null, admin?:boolean, more?: boolean, altMessage?:string}) => {

    if (!error && files.length < 1) return (
        <h4 className="preloader-center placeholder text-grey">{altMessage}</h4>
    )

    return (
        <div className="material-listing" data-admin={admin}>
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

            { error &&
                <h4 className="preloader-center placeholder text-grey">
                    {error}
                </h4>
            }
        </div>
    )
};





const LoadMore = ({loader}:{loader:()=>void}) => {

    useEffect(() => {

        // Add an event listener for scrolling
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                // loadMore();
                loader();
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Clean up the event listener when the component is unmounted
        return () => window.removeEventListener('scroll', handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return null;
}


export const SearchedFileList = observer(() => {

    const searchStore = useSearch();

    const firstLoad = searchStore.searchResult.found < 0 && searchStore.loading;

    if (firstLoad) return <section className="preloader-center">
        <SpinnerPreloader/>
    </section>
    
    return <>
        <FileListing
            files={ searchStore.searchResult.documents }
            altMessage={
                searchStore.query !== '' ? 
                "No material found, try searching with another keyword":
                'Enter a keyword related to the material you seek on the mutal network'
            }
            error={searchStore.error}
            more={false}
        />

        <LoadMore loader={()=>searchStore.loadMore()}/>
    </>
});

export const AdminMaterials = () => {
    const {materials, loading, error} = useAdminContext();

    if (loading) return <section className="preloader-center">
        <SpinnerPreloader/>
    </section>

    if (error) return <h4 className="fs-3 fw-400">Error loading your files</h4>
    
    if (materials) return <FileListing files={materials} admin altMessage="You have no material"/>

    return null;
}

