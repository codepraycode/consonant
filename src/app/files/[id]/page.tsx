import FileList from "@/components/FileLists";
import FilePreview from "@/components/FilePreview";
import { useFile, useFileRecommendation, useFiles } from "@/hooks";
import { DynamicRoute } from "@/types";


const FileInfoPage = ({params}: DynamicRoute) => {

    const { id }= params;

    const { file } = useFile(id);
    const { recommendations } = useFileRecommendation(file);

    return (
        <>
            {
                !file ? (
                    <h3 className="fs-2 fw-700 text-center">Oops, file not found</h3>
                ) : (
                    <FilePreview file={file}/>
                )
            }

            <section className="mt-5">
                {recommendations.length > 0 && <h2>Related materials</h2>}

                <FileList files={recommendations} />
            </section>
                

        </>
    )
}


export default FileInfoPage;