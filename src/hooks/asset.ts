import { Asset } from "@/types/entities.types";
import { AssetTbRow } from "@/types/superbase/table";
import { getAssetCacheKey } from "@/utils/cache";
import { fetchAsset } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


const useAsset = (assetId:string)=>{
    const [asset, setAsset] = useState<Asset|null>(null);

    useEffect(()=>{
        (()=>{

            if (!assetId) return
            if (asset) return

            fetchAsset(assetId)
            .then((data)=>setAsset(()=>data))
            .catch(err=>console.error(err))
        })()
    }, [assetId, asset])


    return asset;
}

export default useAsset;