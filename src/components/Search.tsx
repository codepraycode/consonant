'use client'
import useSearch, { SearchContextProps } from "@/context/SearchContext";

interface SearchProps {
    className?: string,
}


const SearchFiles = (props: SearchProps) => {
    const { handleSearch, loading } = useSearch() as SearchContextProps;

    return (
        <form className={`search-group ${props.className}`}>
            <input
                className="w-full bg-white search_input d-block mx-auto box-shadow"
                placeholder={loading ? "Loading...." : "Search for resources e.g CSC"}
                name="search-files"
                onChange={(e)=>handleSearch(e.target.value)}
                autoComplete="off"
                // disabled={loading}
            />
            {/* Filters */}
            {/* <Tags /> */}
        </form>
    )
}

export default SearchFiles;
