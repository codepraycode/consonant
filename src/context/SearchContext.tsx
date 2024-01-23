'use client'
import { FC, ReactNode, createContext, useCallback, useContext, useReducer } from 'react';
import { debounce } from 'lodash';
import { MaterialTbRow } from '@/types/superbase/table';
import Searcher from '@/lib/typesense';




interface SearchResult {
    found: number,
    page?: number,
    documents: MaterialTbRow[]
}


interface SearchParameters {
    q: string,
    query_by: string | string[],
    per_page?: number,
    offset:number,
}


export interface SearchContextProps {
    searchResult: SearchResult,
    searchQuery: SearchParameters,
    loading: boolean,
    error: any,
    handleSearch: (q:string)=>void,
    searchExhausted: boolean
    // updateSearch: (result: MaterialModel[], query:string) => void,
    // setLoading: () => void,
    // setError: (err:any) => void,
}

const DEBOUNCE_TIMEOUT = 300;

const SearchContext = createContext<SearchContextProps | null>(null);

const useSearch = ()=>useContext(SearchContext) as SearchContextProps;

export default useSearch;


const searchInitialState = {
    loading: false,
    searchResult: {found: -1, page:0, documents:[]},
    searchQuery: {q:'', query_by:'title', per_page:15, offset:0},
    searchError: null
}


const SearchReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                loading: true,
                searchResult: [],
                searchQuery: ''
            }
        case 'loaded':
            return {
                ...state,
                loading: false,
                searchResult: action.payload.result,
                searchQuery: action.payload.query
            }
        case 'clear':
            return {
                ...searchInitialState
            }
        case 'error':
            return {
                ...state,
                loading: false,
                searchResult: [],
                searchQuery: '',
                error: action.payload
            }
        default:
            return state
    }
}




async function runSearch(params:SearchParameters): Promise<SearchResult>{

    const searchResult = await Searcher.collections('materials')
        .documents()
        .search(params)
    
    // Extract details
    const searchResultDetails: SearchResult = {
        found: searchResult.found,
        // total: searchResults.out_of,
        page: searchResult.page,
        documents: searchResult.hits?.map((item)=>{
            return item.document as MaterialTbRow;
        }) ?? []
    };


    return searchResultDetails;
    
}


export const SearchProvider: FC<{ children: ReactNode}> = ({ children }) => {

    const [state, dispatch] = useReducer(SearchReducer, searchInitialState);


    const search = useCallback(async(q: string)=>{


        if (state.loading) return;

        if (q === '') {

            dispatch({
                type: 'clear'
            });

            return
        }


        dispatch({
            type: 'loading'
        })

        // Construct the params
        const query_params = {
            ...state.searchQuery,
            q,
            query_by: 'title',
            per_page: 15,
            offset: state.searchResult.documents.length
        }
        
        runSearch(query_params)
        .then((result)=>{
            dispatch({
                type: 'loaded',
                payload: {
                    result,
                    query: query_params
                }
            })
        })
        .catch((error:any)=>{

            console.dir(error);
            dispatch({
                type: 'error',
                payload: error.message || 'Could not perfom search'
            });
        })

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce(search, DEBOUNCE_TIMEOUT), []);


    const context: SearchContextProps = {
        searchResult: state.searchResult,
        searchQuery: state.searchQuery,
        loading: state.loading,
        error: state.error,
        handleSearch,
        searchExhausted: state.searchResult.found === state.searchQuery.offset
        // updateSearch: (result:MaterialModel[], query:string)=>dispatch({
        //     type: 'loaded',
        //     payload: {result, query}
        // }),
        // setLoading: ()=>dispatch({
        //     type: 'loading'
        // }),
        // setError: (err:any)=>dispatch({
        //     type: 'error',
        //     payload: err
        // })
    }
    
    return (
        <SearchContext.Provider value={context}>
            { children }
        </SearchContext.Provider>
    )
}
