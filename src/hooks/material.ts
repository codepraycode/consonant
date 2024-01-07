import { Asset } from "@/types/entities.types";
import { AssetTbRow } from "@/types/superbase/table";
import { getAssetCacheKey, getMaterialCacheKey } from "@/utils/cache";
import { fetchAsset, fetchMaterial } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAsset from "./asset";


const useMaterial = (materialId:string)=>{
    const {isLoading:loading, data, error} = useQuery({
        queryKey: [getMaterialCacheKey(materialId)],
        queryFn: ()=>fetchMaterial(materialId)
    });

    return {loading, data, error};
}

export default useMaterial;