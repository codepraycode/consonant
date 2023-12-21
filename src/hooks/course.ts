import { getCourseCacheKey } from "@/utils/cache";
import { fetchCourse } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";


const useCourses = ()=>{
    const {isLoading:loading, data, error} = useQuery({
        queryKey: [getCourseCacheKey()],
        queryFn: ()=>fetchCourse()
    });

    return {loading, courses:data,error};
}

export {useCourses};