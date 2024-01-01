import {SearchedFileList} from "@/components/FileLists";
import SearchFiles from "@/components/Search";
import { SearchProvider } from "@/context/SearchContext";
import { setupSuperbase } from "@/lib/superbase";

setupSuperbase()

export default function Home() {
    
    return (
        <SearchProvider>

            <section className="container mx-auto">
                <h1 className="fs-3 fw-800 text-center">
                    Consonant
                </h1>



                <p className="fs-1 text-center">
                    Consonant is an open-source resource point for students of various faculties across FUTA
                </p>

                {/* Feeds */}


                {/* Search input */}
                <SearchFiles />

            </section>

            <SearchedFileList />
            {/* <br/><br/><br/> */}
        </SearchProvider>
    )
}
