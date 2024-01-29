import Searcher from "@/lib/typesense"
import { MaterialTbRow } from "@/types/superbase/table"
import logger from "@/utils/logger"
import { action, autorun, computed, makeObservable, observable } from "mobx"

type SearchResult = {
    found: number,
    page?: number,
    documents: MaterialTbRow[]
}


type SearchParameters = {
    q: string,
    query_by: string | string[],
    per_page?: number,
    offset?:number
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


function discernError(error: Error, alt_message?:string) {

    console.error(error);
    if (error.message.includes('Network Error')) {
        return "Network error, please check your internet connection"
    }

    return alt_message || "Could not continue search";
}


const defaultSearchResult = {
    found: -1,
    page:0,
    documents:[]
}
class SearchStore {
    loading = false;
    error:string | null = null;
    query:string = '';
    searchResult: SearchResult = defaultSearchResult;

    constructor() {
        
        makeObservable(this, {
            loading: observable,
            error: observable,
            searchResult: observable,
            query: observable,
            updateQuery: action,
            updateError: action,
            updateLoading: action,
            updateSearchResult: action,
            loadMore: action,
            searchParameters: computed,
            searchOperationDetails: computed,
        });

        // makeAutoObservable(this)

        autorun(()=>this.logSearchOperationDetails())
        autorun(()=>{
            if(this.query === '') {

                if (this.searchResult.documents.length > 0) {
                    this.updateSearchResult(defaultSearchResult);
                }

                if (this.error) {
                    this.updateError(null);
                }
                return;
            }

            this.updateSearchResult(defaultSearchResult);
            this.search();
        })
        // autorun(this.logSearchOperationDetails)
        // this.logSearchOperationDetails()
    }


    updateQuery(q:string) {
        this.query = q;
    }

    updateSearchResult(result: SearchResult) {
        this.searchResult = result;
    }

    updateError(error:string|null) {
        this.error = error;
    }

    updateLoading(loading:boolean) {
        this.loading = loading;
    }


    async search() {
        this.updateLoading(true);

        const parameters = this.searchParameters;
        let result:SearchResult;

        try {
            result = await runSearch(parameters);
        } catch (error: any) {
            const reason = discernError(error, `Could not search for '${this.query}'`);

            this.updateError(reason);
            this.updateLoading(false);
            return;
        }

        this.updateSearchResult(result);
        this.updateLoading(false)
        if (this.error) this.updateError(null);
    }

    async loadMore() {
        const found = this.searchResult.found
        const fetched = this.searchResult.documents.length


        if (found === fetched) return;
        
        this.updateLoading(true)
        const parameters = this.searchParameters;

        parameters.offset = this.searchResult.documents.length;

        let result:SearchResult;

        try {
            result = await runSearch(parameters);
        } catch (error: any) {
            const reason = discernError(error, `Could not search for '${this.query}'`);

            this.updateError(reason);
            this.updateLoading(false);
            return;
        }

        result.documents = [
            ...this.searchResult.documents,
            ...result.documents
        ]

        this.updateSearchResult(result);
        this.updateLoading(false)
        if (this.error) this.updateError(null);
    }
    
    
    get searchParameters(): SearchParameters  {
        return {
            q: this.query,
            query_by:'title',
            per_page:15,
            // offset:0
        }
    }

    get searchOperationDetails(){
        const search = this.searchResult;
        return `
            Query:${this.query || null},
            Found:${search.found},
            Fetched:${search.documents.length}
            Loading:${this.loading}
            `
    }


    logSearchOperationDetails(){
        logger.debug(this.searchOperationDetails)
    }
}

export default SearchStore;

// const searchStore = new SearchStore();

// searchStore.updateSearchResult({
//     found: 10,
//     page: 0,
//     documents: []
// })