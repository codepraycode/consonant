'use client'
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { Content } from '@/types/content.types';
import { useFiles } from '@/hooks';

export interface SearchContextProps {
    searchResult: Content[],
    search: (searchString: string) => void
}


const SearchContext = createContext<SearchContextProps | null>(null);

const useSearch = ()=>useContext(SearchContext) as SearchContextProps;

export default useSearch;



export const SearchProvider: FC<{ children: ReactNode}> = ({ children }) => {

    const [searchResult, setSearchResult] = useState<Content[]>([]);
    const [ contents ] = useFiles();

    const searchFiles = (searchString:string) => {

        if (!searchString) return setSearchResult(()=>[])
        const result = contents.filter((item)=> {
            return item.title.includes(searchString)
                    || item.departments.includes(searchString)
        });

        setSearchResult(()=> result);
    }


    const context: SearchContextProps = {
        searchResult,
        search: (str)=>searchFiles(str)
    }
    
    return (
        <SearchContext.Provider value={context}>
            { children }
        </SearchContext.Provider>
    )
}
