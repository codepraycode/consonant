import FileList from "@/components/FileLists";
import { useFiles } from "@/hooks";
import Link from "next/link";


const AdminPage = () => {
    const [ contents ] = useFiles();
    return (
        <>
            {/* <h1>Admin page</h1> */}

            <section className="mt-5">

                <div className="d-flex align-center justify-between">
                    <h1 className="fw-800 fs-2 my-1">Your files</h1>

                    <Link
                        href={"/admin/upload"}
                        className="btn bg-elem border-none box-shadow upload">

                        <span className="icon icon-upload"/>
                        Upload file
                    </Link>
                </div>
                
                <FileList files={contents}/>
            </section>
        </>
    )
}


export default AdminPage;