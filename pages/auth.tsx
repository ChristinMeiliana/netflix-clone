import Input from '@/components/input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import React, { useCallback, useState } from 'react'

import { FcGoogle } from 'react-icons/fc';
import { FaGithub} from 'react-icons/fa'

const Auth = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant(( currVariant) => currVariant === 'login' ? 'register' :'login')
    }, [])

    const login = useCallback(async () => {
        try {
            console.log(email,password);
            
            await signIn('credentials', {
                email,
                password,
                callbackUrl:'/profiles'
            })
           
        } catch (err) {
          console.log(err);
            
        }
    },[email,password])
    
    const register = useCallback(async() => {
        try {
            await axios.post('/api/register', {
                email,
                username,
                password
            })
            login()
        } catch (err) {
            console.log(err);    
        }
    }, [email, username, password, login])
    

  return (
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
          <div className='bg-black w-full h-full lg:bg-opacity-50'>
              <nav className='px-12 py-5'>
                  <img src='/images/logo.png' alt='logo' className='h-12' />
              </nav>
              <div className='flex justify-center'>
              <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
                  <h2 className='text-white text-4xl mb-8 font-semibold'>{variant === 'login' ? 'Sign In' : 'Register'}</h2>
                      <div className='flex flex-col gap-4'>
                          {variant !== 'login' && <Input
                              label='Username'
                              onChange={(ev: any) => setUsername(ev.target.value)}
                              id='name'
                              type='name'
                              value={username}
                          />}
                          <Input
                              label='Email'
                              onChange={(ev: any) => setEmail(ev.target.value)}
                              id='email'
                              type='email'
                              value={email}
                          />
                          <Input
                              label='Password'
                              onChange={(ev: any) => setPassword(ev.target.value)}
                              id='password'
                              type='password'
                              value={password}
                          />
                      </div>
                      <button className='
                      bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700
                       '
                      onClick={variant === 'login' ? login : register}>
                          {variant === 'login' ? 'Login' : 'Sign Up'}
                      </button>
                      <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
                          <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                            onClick={() => signIn('google',{callbackUrl: '/profiles'})}
                          >
                              <FcGoogle size={30} />
                          </div> 
                          <div 
                               className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition' 
                               onClick={() => signIn('github',{callbackUrl: '/profiles'})}
                            >
                              <FaGithub size={30} />
                          </div> 
                      </div>
                      <p className='text-neutral-500 mt-12'>
                          {variant === 'login' ? 'First time using Netflix ?' : 'Already have an account ?'}
                        <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                              {variant === 'login' ? 'Create and account' : 'Login'}
                          </span>
                      </p>
              </div>
          </div>
          </div>
          
    </div>
  )
}

export default Auth;
