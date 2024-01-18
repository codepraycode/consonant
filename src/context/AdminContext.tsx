'use client'

import MaterialModel from "@/lib/superbase/models/material.model";
import { MaterialTbRow } from "@/types/superbase/table";
import { fetchAdminMaterials, postMaterial } from "@/utils/requests";
import { createContext, useContext, useEffect, useReducer } from "react";


interface AdminState {
    materials: MaterialModel[],
    loading: boolean,
    error: string | null,
    postNewMaterial: (data: FormData)=>Promise<void>;
}


const initialAdminContextState = {
    materials: [],
    loading: true,
    error: null,
    postNewMaterial: async()=>{}
}


const AdminContext = createContext<AdminState>(initialAdminContextState);

export const useAdminContext = ()=>useContext(AdminContext);




const AdminReducer = (state:any, action:any) => {

    const payload = action.payload;
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                loading: true,
                materials: [],
                error: null
            }
        case 'loaded':
            return {
                ...state,
                loading: false,
                materials: payload
            }
        case 'error':
            return {
                ...state,
                loading: false,
                materials: [],
                error: payload
            }
        case 'update':
            return {
                ...state,
                materials: state.materials.map((item: MaterialTbRow)=>{
                    if (item.id === payload.id) {
                        return payload;
                    }

                    return item;
                })
            }
        default:
            return state
    }
}


const initialAdminState = {
    materials:[],
    loading: true,
    error: null
}

export const AdminContextProvider = ({children}: any)=>{


    const [state, dispatch] = useReducer(AdminReducer, initialAdminState);

    // const {isLoading:loading, data, error} = useQuery({
    //     queryKey: [getMaterialCacheKey('admin')],
    //     queryFn: fetchAdminMaterials
    // })

    async function fetchMaterials (){

        try {
            const data = await fetchAdminMaterials()
            
            dispatch({
                type: 'loaded',
                payload: data
            })
        } catch(error:any) {
            dispatch({
                type: 'error',
                payload: error.message
            })
        }
    }


    const postNewMaterial = async (data: FormData) => {
        await postMaterial(data);

        console.log("Data is submitted")

        return await fetchMaterials();
    }



    useEffect(()=>{
        (async ()=>{

            if (!state.loading || state.materials.length > 0) return
            await fetchMaterials();
        })()
    }, [state.loading, state.materials.length, state.error])


    // (async ()=>{
    //     if (!state.loading || state.materials.length > 0) return
    //     await fetchAdminMaterials();
    // })()


    const context:AdminState = {
        ...state,
        postNewMaterial
    }

    return (
        <AdminContext.Provider value={context}>
            {children}
        </AdminContext.Provider>
    )
}
