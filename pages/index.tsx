import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorite';
import useMovieList from '@/hooks/useMovieList';
import useCurrentUser from '@/hooks/userCurrentUser';
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  
  //console.log(session);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = []} = useFavorites()

  console.log(movies);
  

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
      {/* <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div>
      <div className='h-96 bg-slate-500'></div> */}
    </>
  )
}
