import { AdminMaterials } from "@/components/FileLists";
import { MaterialUploadForm } from "@/components/forms";


const UploadSection = () => (
    <div className="admin-upload">

        <h1 className="mt-5 px-1">Upload Resource</h1>
        <MaterialUploadForm />        

    </div>
)




const AdminFileLists = () => (
    <div className="admin-files">
        <div className="d-flex align-center justify-between sticky bg-blur py-1 px-1">
            <h1 className="fw-800 fs-md-2">Your files</h1>

            <button
                // href={"/admin/upload"}
                // onClick={(e)=>e.preventDefault()}
                title="Upload a material"
                className="btn bg-elem border-none box-shadow upload">

                <span className="icon icon-upload"/>
                Upload file
            </button>
        </div>

        <br/>
        
        <AdminMaterials />

        <br/><br/><br/>
    </div>
)



const AdminPage = () => {
    
    return (
        <>
            <section className="admin-split">


                <UploadSection />

                <AdminFileLists />
    
            </section>
        </>
    )
}


export default AdminPage;