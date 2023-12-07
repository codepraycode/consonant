import { DocumentUpload, Select, TextInput } from "@/components/Form";


const FileUpload = () => {
    
    return (
        <>
            <section className="mt-5">
                <h1 className="mt-5">Upload Resource</h1>

                <form className="upload-form">
                    
                    <TextInput
                        name="file-title"
                        label="Enter file title"
                    />


                    <TextInput
                        name="file-title"
                        label="Enter file title"
                    />

                    <Select
                        name="file-category"
                        label="Select category"
                    />
                    <Select
                        name="departments"
                        label="Select departments"
                        multiple
                    />

                    <DocumentUpload/>
                </form>
            </section>
        </>
    )
}

export default FileUpload;
