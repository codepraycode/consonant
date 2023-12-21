import { AdminMaterials } from "@/components/FileLists";

import Link from "next/link";


const AdminPage = () => {
    
    return (
        <>
            {/* <h1>Admin page</h1> */}

            <section className="mt-5">

                <div className="d-flex align-center justify-between my-2">
                    <h1 className="fw-800 fs-2">Your files</h1>

                    <Link
                        href={"/admin/upload"}
                        className="btn bg-elem border-none box-shadow upload">

                        <span className="icon icon-upload"/>
                        Upload file
                    </Link>
                </div>
                
                <AdminMaterials />
            </section>
        </>
    )
}


export default AdminPage;