'use client'
import useSearch, { SearchContextProps } from "@/context/SearchContext";
import Tags from "./Tag"
import { useCallback } from "react";
import debounce from 'lodash/debounce';


interface SearchProps {
    className: string,
}

const DEBOUNCE_TIMEOUT = 300;


const SearchFiles = (props: SearchProps) => {
    const { search } = useSearch() as SearchContextProps;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce(search, DEBOUNCE_TIMEOUT), [])

    return (
        <form className={`form-group ${props.className}`}>
            <input
                className="w-full bg-white search_input d-block mx-auto box-shadow"
                placeholder="Search for resources"
                name="search-files"
                onChange={(e)=>handleSearch(e.target.value)}
            />
            {/* Filters */}
            {/* <Tags /> */}
        </form>
    )
}

export default SearchFiles;
