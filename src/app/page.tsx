import Tags from "@/components/Tag"
import Link from "next/link"

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
                <div className="form-group mt-md-5 mx-auto">
                    <input
                        className="w-full bg-white search_input d-block mx-auto box-shadow"
                        placeholder="Search for resources"
                    />
                    {/* Filters */}
                    <Tags />
                </div>
            </header>

            <section className="file-listing">
                {[1,2,3,4,5].map((i)=>(
                    <Link href={`/files/${i}`} key={i} className="file-content box-shadow">
                        <span className="icon icon-file"/>

                        <div>
                            <h3>SEN 201</h3>

                            {/* <Tags small/> */}
                            <p>By XXXXXX (4 months ago)</p>

                            {/* <button>View</button> */}
                        </div>
                    </Link>
                ))}
            </section>
        </>
    )
}
