'use client'
import { FC, ReactNode, createContext, useContext, useReducer } from 'react';
import { MaterialTbRow } from '@/types/superbase/table';

export interface SearchContextProps {
    searchResult: MaterialTbRow[],
    loading: boolean,
    error: any
    updateSearch: (result: MaterialTbRow[]) => void,
    setLoading: () => void,
    setError: (err:any) => void,
}


const SearchContext = createContext<SearchContextProps | null>(null);

const useSearch = ()=>useContext(SearchContext) as SearchContextProps;

export default useSearch;



const SearchReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                loading: true,
                searchResult: []
            }
        case 'loaded':
            return {
                ...state,
                loading: false,
                searchResult: action.payload
            }
        case 'error':
            return {
                ...state,
                loading: false,
                searchResult: [],
                error: action.payload
            }
        default:
            return state
    }
}

const searchInitialState = {
    loading: false,
    searchResult: [],
    searchError: null
}


export const SearchProvider: FC<{ children: ReactNode}> = ({ children }) => {

    // const {isLoading:loading, data, error} = useQuery({
    //     queryKey: ['contents'],
    //     queryFn: fetchContents
    // })

    // const [searchResult, setSearchResult] = useState<MaterialTbRow[]>([]);

    const [state, dispatch] = useReducer(SearchReducer, searchInitialState);


    const context: SearchContextProps = {
        searchResult: state.searchResult,
        loading: state.loading,
        error: state.error,
        updateSearch: (result:MaterialTbRow[])=>dispatch({
            type: 'loaded',
            payload: result
        }),
        setLoading: ()=>dispatch({
            type: 'loading'
        }),
        setError: (err:any)=>dispatch({
            type: 'error',
            payload: err
        })
    }
    
    return (
        <SearchContext.Provider value={context}>
            { children }
        </SearchContext.Provider>
    )
}
