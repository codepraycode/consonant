import { Content } from '@/types/content.types';
import { fetchContents } from '@/utils/requestContent';
import { useQuery } from '@tanstack/react-query';
// import contents from '../data/contents.json';
import { useEffect, useMemo, useState } from 'react';


const useFiles = () => {

    const {isLoading, data, error} = useQuery({
        queryKey: ['contents'],
        queryFn: fetchContents
    })

    return {loading:isLoading, data, error}
    // return {loading:true, data: null, error: null}
}


type UseFile = {
    file: Content | null
}


const useFile = (id:string): UseFile => {

    // const {loading, data, error} = useFiles();


    // const file = useMemo(()=>{
    //     const filter = contents.filter((item)=>item.id === id);

    //     if (filter.length < 1) return null;

    //     return filter.pop() as Content;
    // }, [id, contents])

    // return { file } as const;
    return { file: null }
}


const useFileRecommendation = (file: Content | null) => {

    // const [ contents ] = useFiles();


    // const {id, departments} = file || {};


    // const recommendations = useMemo(()=>{
    //     if (!departments) return [];

    //     return contents.filter((item)=>{
    //         if (item.id === id) return false


    //         // The alogrithm is to combine the current item's department
    //         //  with the departments given, then remove the recurring values
    //         // If the length of the list is less that the combined length, that means
    //         // there's something in common, otherwise, nothing in common.

    //         const combined_lst = [...departments, ...item.departments];

    //         const uniq = Array.from(new Set(combined_lst));

    //         return uniq.length < combined_lst.length
    //     });

    // }, [id, departments, contents])

    // return { recommendations } as const;
    return { recommendations: null }
}

export {
    useFiles,
    useFile,
    useFileRecommendation
}