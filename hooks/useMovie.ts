import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useMovie = (id?: string) => {
    console.log("idid :",id);
    
    const { data, error ,isLoading} = useSWR(id ?`/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    console.log("get data :",data);
    
    return {
        data, 
        error,
        isLoading
  }
}

export default useMovie;