import Navbar from '@/components/Navbar';
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
  const { data: user } = useCurrentUser();

  //console.log(user?.name);
  

  return (
    <>
      <Navbar />
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
