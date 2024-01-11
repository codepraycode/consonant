// import FileList from "@/components/FileLists";
import FileDisplay from "@/components/FilePreview";
import MaterialModel from "@/lib/superbase/models/material.model";
import { DynamicRoute } from "@/types";



const FileInfoPage = ({params}: DynamicRoute) => {

    const { id }= params;

    
    // const { recommendations } = useFileRecommendation(file);
    const recommendations:MaterialModel[] = []

    
    return (
        <section className="container mx-auto">


            <FileDisplay id={id}/>

            <section className="mt-5">
                {recommendations.length > 0 && <h2>Related materials</h2>}

                {/* <FileList files={recommendations} /> */}
            </section>
                

        </section>
    )
}


export default FileInfoPage;