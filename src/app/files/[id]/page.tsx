// import FileList from "@/components/FileLists";
import FileDisplay from "@/components/FilePreview";
import { Content, DynamicRoute } from "@/types";



const FileInfoPage = ({params}: DynamicRoute) => {

    const { id }= params;

    
    // const { recommendations } = useFileRecommendation(file);
    const recommendations:Content[] = []

    
    return (
        <>
            <FileDisplay id={id}/>

            <section className="mt-5">
                {recommendations.length > 0 && <h2>Related materials</h2>}

                {/* <FileList files={recommendations} /> */}
            </section>
                

        </>
    )
}


export default FileInfoPage;