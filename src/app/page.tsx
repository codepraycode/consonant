import {SearchedFileList} from "@/components/FileLists";
import Header from "@/components/Header";
import SearchFiles from "@/components/Search";
import { SearchProvider } from "@/context/SearchContext";
import { setupSuperbase } from "@/lib/superbase";

setupSuperbase()

export default function Home() {
    
    return (
        <SearchProvider>

            <section>
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
