import React from "react"
import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useMovieList = () => {
    const { data, error ,isLoading} = useSWR('/api/movie', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect:false
    })

    console.log(data);
    
    return {
        data,
        error,
        isLoading
    }
}

export default useMovieList;