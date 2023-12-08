'use client'
import { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Content } from '@/types/content.types';
import { fetchContents } from '@/utils/requestContent';
import { useQuery } from '@tanstack/react-query';

export interface SearchContextProps {
    searchResult: Content[],
    search: (searchString: string) => void,
    loading: boolean,
    error: any
}


const SearchContext = createContext<SearchContextProps | null>(null);

const useSearch = ()=>useContext(SearchContext) as SearchContextProps;

export default useSearch;



export const SearchProvider: FC<{ children: ReactNode}> = ({ children }) => {

    const {isLoading:loading, data, error} = useQuery({
        queryKey: ['contents'],
        queryFn: fetchContents
    })

    const [searchText, setSearchText] = useState<string | null>(null);


    const searchResult = useMemo(()=>{
        if (!searchText) return []

        // console.log(data);
        if(!data) return []

        return data.filter(item=> 
            item.title.includes(searchText) ||
            item.departments?.includes(searchText)
        )

    },[searchText, data])


    const context: SearchContextProps = {
        searchResult,
        loading,
        error,
        search: (str)=>setSearchText(()=>str)
    }
    
    return (
        <SearchContext.Provider value={context}>
            { children }
        </SearchContext.Provider>
    )
}
