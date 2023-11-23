
export default function Home() {
    return (
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
                <ul className="filters d-flex">
                    <li className="bg-white box-shadow">
                        <a href="/">Past questions</a>
                    </li>
                    <li>Past questions</li>
                    <li>Past questions</li>
                </ul>
            </div>
        </header>
    )
}
