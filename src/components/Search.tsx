'use client'
import useSearch from "@/context/SearchContext";
import { debounce } from "lodash";
import { useCallback } from "react";

interface SearchProps {
    className?: string,
}


const DEBOUNCE_TIMEOUT = 300;

const SearchFiles = (props: SearchProps) => {
    // const { handleSearch, loading } = useSearch() as SearchContextProps;

    const searchStore = useSearch();

    const loading = searchStore.loading;
    const search = (val:string) => {
        searchStore.updateQuery(val);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce(search, DEBOUNCE_TIMEOUT), []);

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
        </form>
    )
}

export default SearchFiles;
