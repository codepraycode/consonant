import { AdminMaterials } from "@/components/FileLists";
import HandlerButton from "@/components/Form/HandlerButton";
import MaterialUploadForm from "@/components/MaterialUploadForm";
import { AdminContextProvider } from "@/context/AdminContext";


const UploadSection = () => (
    <div className="admin-upload">

        {/* <h1 className="mt-5 px-1">Upload Resource</h1> */}
        <MaterialUploadForm />

    </div>
)




const AdminFileLists = () => (
    <div className="admin-files">
        <div className="d-flex align-center justify-between sticky bg-blur py-1 px-1">
            <h1 className="fw-800 fs-md-2">Your files</h1>

            <HandlerButton />
        </div>

        <br/>
        
        <AdminMaterials />

        <br/><br/><br/>
    </div>
)



const AdminPage = () => {
    
    return (
        <AdminContextProvider>
            <section className="admin-split">


                <UploadSection />

                <AdminFileLists />
    
            </section>
        </AdminContextProvider>
    )
}


export default AdminPage;