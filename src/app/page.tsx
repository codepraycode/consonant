import FileList from "@/components/FileLists";
import SearchFiles from "@/components/Search";
// import { upload, fetchResource } from '@/lib/cloudinary';

// upload("/home/codepraycode/Downloads/nobox.png")
// upload("/home/codepraycode/Downloads/SEN-2-202 LECTURE NOTES-Copy (1).pdf")
// fetchResource("vtfotty6pr8utpenemlc").then(data=>console.log("Asset", data));

export default function Home() {
    
    return (
        <>
            <header>
                <h1 className="fs-3 fw-800 text-center">
                    Consonant
                </h1>
                <p className="fs-1 text-center">
                    Consonant is an open-source resource point for students of various faculties across FUTA
                </p>

                {/* Feeds */}


                {/* Search input */}
                <SearchFiles />

            </header>

            <FileList search />
            <br/><br/><br/>
        </>
    )
}
