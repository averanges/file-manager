import { useState, ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { LogoSVG } from '../../../ui/svg/svg'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebaseConfig"

interface IOldUser {
    email: string,
    psw: string,
}


const LoginPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [existedUser, setExistedUser] = useState<IOldUser>({
        email: '',
        psw: '',
    })
    const handleLoginUser = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setExistedUser(prevUser => {
           return {...prevUser,[name] : value}
        })
    }
    const createNewUser = async (e:FormEvent) => {
        e.preventDefault()
        try {
            const userResponse = await signInWithEmailAndPassword(auth, existedUser.email, existedUser.psw)
            console.log(userResponse)
            if(userResponse){
                return navigate('/')
            }
        } catch (error) {
            setError('Email or password doesn`t match. Please, try again')
        }
    }
  return (
    <div className=' w-screen h-screen flex justify-center items-center bg-black/75 text-white'>
        <div className='flex flex-col gap-5 w-[75%] sm:w-[50%] lg:w-[25%]'>
          <div className="flex justify-center items-center gap-2 cursor-pointer font-bold">
            <LogoSVG/>
            <h2 className='text-2xl'>K-Cloud.io</h2>
          </div>
          <div className='flex justify-center'>
             <p>Welcome to K-Cloud.io!</p>
          </div>
          <div className='flex justify-center'>
            <button className='border-[1px] border-white py-3 px-10 shadow-sm shadow-white'>Sign In With Google</button>
          </div>
          <div className='flex justify-center'>
            <p>-- Or --</p>
          </div>
          <form className='flex flex-col gap-5 text-black' onSubmit={createNewUser}>
            {error && <p className="text-red-500">{error}</p>}
            <input value={existedUser.email} onChange={(e) => handleLoginUser(e)}
            type="text" name="email" placeholder='Email' className='rounded-lg pl-2 py-2 outline-orange-prime'/>
            <input value={existedUser.psw} onChange={(e) => handleLoginUser(e)}
            type="password" name="psw"  placeholder='Password' className='rounded-lg pl-2 py-2 outline-orange-prime'/>
            <div className='flex justify-around text-white'>
            <p>Still don't have an account?  Fix it now!</p>
                <Link to="/auth/signup" className='text-orange-prime cursor-pointer'>Sign Up</Link>
            </div>
            <div className='flex justify-center mt-5 text-white'>
                <button className='border-[1px] border-white py-3 px-10 hover:shadow-sm hover:shadow-white text-xl'>Sign In</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default LoginPage