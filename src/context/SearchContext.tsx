'use client'
import { FC, ReactNode, createContext, useContext } from 'react';
import SearchStore from '@/store/Search';


// ================================================

const SearchContext = createContext<SearchStore | null>(null);

const useSearch = ()=>useContext(SearchContext) as SearchStore;
export default useSearch;


export const SearchWrapper: FC<{ children: ReactNode}> = ({ children }) => {

    const searchStore = new SearchStore();

    return (
        <SearchContext.Provider value={searchStore}>
            { children }
        </SearchContext.Provider>
    )
}
