import { getMaterialCacheKey } from "@/utils/cache";
import { fetchMaterial } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";


const useMaterial = (materialId:string)=>{
    const {isLoading:loading, data, error} = useQuery({
        queryKey: [getMaterialCacheKey(materialId)],
        queryFn: ()=>fetchMaterial(materialId)
    });

    return {loading, data, error};
}

export default useMaterial;