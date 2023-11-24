import FileList from "@/components/FileLists";
import SearchFiles from "@/components/Search";

export default function Home() {
    
    return (
        <>
            <header className="py-5">
                <h1 className="fs-3 fw-800 text-center">
                    Consonant
                </h1>
                <p className="fs-1 text-center">
                    Consonant is an open-source resource point for students of various faculties across FUTA
                </p>

                {/* Feeds */}


                {/* Search input */}
                <SearchFiles className="mt-md-5 mx-auto" />

            </header>

            <FileList search />
        </>
    )
}
