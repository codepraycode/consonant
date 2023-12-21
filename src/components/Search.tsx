'use client'
import useSearch, { SearchContextProps } from "@/context/SearchContext";
import Tags from "./Tag"
import { useCallback } from "react";
import debounce from 'lodash/debounce';
import { searchMaterials } from "@/utils/requests";


interface SearchProps {
    className?: string,
}

const DEBOUNCE_TIMEOUT = 300;


const SearchFiles = (props: SearchProps) => {
    const { updateSearch, setLoading, setError, loading } = useSearch() as SearchContextProps;


    const search = async (query:string) => {

        setLoading();
        searchMaterials(query)
        .then((results)=>{

            updateSearch(results);
        })
        .catch((err)=>{
            console.error(err)
            setError(err);
        })

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce(search, DEBOUNCE_TIMEOUT), [])

    return (
        <form className={`search-group ${props.className}`}>
            <input
                className="w-full bg-white search_input d-block mx-auto box-shadow"
                placeholder={loading ? "Loading...." : "Search for resources"}
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
