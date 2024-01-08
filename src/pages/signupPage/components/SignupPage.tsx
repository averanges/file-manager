import { useState, ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { LogoSVG } from '../../../ui/svg/svg'
import { auth } from "../../../config/firebaseConfig"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"

export interface INewUser {
    name: string,
    email: string,
    psw: string,
    confirmPsw: string
}
export interface INewUserFocusOrBlur {
    name: boolean,
    email: boolean,
    psw: boolean,
    confirmPsw: boolean
}

export const validateForm = ({ name, value, setValidationErrors, inputedPsw }: {name: string, value: string}) => {
  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValidEmail ? "" : "Please, write a correct email address",
    }))
  }

  if (name === "psw") {
    const passwordLength = [...value].length;

    if (passwordLength < 6 || passwordLength > 20) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: passwordLength < 6
          ? "Password should have at least 6 characters"
          : "Password should have maximum 20 characters",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }))
    }
  }
  
  if (name === "confirmPsw") {
    if (value !== inputedPsw) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Passwords don't match. Please, try again.",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }))
    }
  }

  if (name === "name") {
    const nameRegex = /^[a-zA-Z]+$/
    const isValidName = nameRegex.test(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValidName ? "" : "Name should contain only letters",
    }))
  }
}
const SignupPage = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState<INewUser>({
        name: '',
        email: '',
        psw: '',
        confirmPsw: ''
    })
    const [inputBlur, setInputBlur] = useState<INewUserFocusOrBlur>({
        name: false,
        email: false,
        psw: false,
        confirmPsw: false
    })
    const [validationErrors, setValidationErrors] = useState<INewUser>({
        name: '',
        email: '',
        psw: '',
        confirmPsw: ''
    })
    const addNewUser = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        validateForm({value, name, setValidationErrors, inputedPsw: newUser.psw})
        setNewUser(prevUser => {
           return {...prevUser,[name] : value}
        })
    }
    const createNewUser = async (e: FormEvent) => {
        e.preventDefault();
        if (Object.values(validationErrors).some(el => el !== '')) {
            console.log("Check validation form");
            return;
        }
        try {
          const userCreated = await createUserWithEmailAndPassword(auth, newUser.email, newUser.psw)
            if (userCreated) {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    await sendEmailVerification(currentUser)
                    await updateProfile(currentUser, { displayName: newUser.name })
                    .then(() => navigate('/'))
                } else {
                    throw new Error("User is null");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
      const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {  name } = e.target
        setInputBlur(prevBlur => {
            return {...prevBlur, [name] : true}
        })
      }
      const handleFocusInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target
        setInputBlur(prevBlur => {
            return {...prevBlur, [name] : false}
        })
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
          <form onSubmit={(e) => createNewUser(e)}
          className='flex flex-col gap-5 text-black'>

            <input value={newUser.name} onChange={(e) => addNewUser(e)} required
            type="text" name="name" placeholder='User name' 
            onBlur={(e) => handleBlurInput(e)}
            onFocus={(e) => handleFocusInput(e)}
            className={`rounded-lg pl-2 py-2 outline-none ${inputBlur.name && validationErrors.name ? "border-2 border-red-500" : ''}`}/>
            {inputBlur.name && validationErrors.name ? <p className="text-red-500">* {validationErrors.name}</p> : null}

            <input value={newUser.email} onChange={(e) => addNewUser(e)} required
            type="text" name="email"  placeholder='Your work email' 
            onBlur={(e) => handleBlurInput(e)}
            onFocus={(e) => handleFocusInput(e)}
            className={`rounded-lg pl-2 py-2 outline-none ${inputBlur.email && validationErrors.email ? "border-2 border-red-500" : ''}`}/>
            {inputBlur.email && validationErrors.email ? <p className="text-red-500">* {validationErrors.email}</p> : null}
            
            <input value={newUser.psw} onChange={(e) => addNewUser(e)} required
            type="password" name="psw" placeholder='Password' 
            onBlur={(e) => handleBlurInput(e)}
            onFocus={(e) => handleFocusInput(e)}
            className={`rounded-lg pl-2 py-2 outline-none ${inputBlur.psw && validationErrors.psw ? "border-2 border-red-500" : ''}`}/>
            {inputBlur.psw && validationErrors.psw ? <p className="text-red-500">* {validationErrors.psw}</p> : null}
            
            <input value={newUser.confirmPsw} onChange={(e) => addNewUser(e)} required
            type="password" name="confirmPsw" placeholder='Repeat your password' 
            onBlur={(e) => handleBlurInput(e)}
            onFocus={(e) => handleFocusInput(e)}
            className={`rounded-lg pl-2 py-2 outline-none ${inputBlur.confirmPsw && validationErrors.confirmPsw ? "border-2 border-red-500" : ''}`}/>
            {inputBlur.confirmPsw && validationErrors.confirmPsw ? <p className="text-red-500">* {validationErrors.confirmPsw}</p> : null}

            <div className='flex justify-around text-white'>
                <p>Already have an account? </p>
                <Link to="/auth/login"  className='text-orange-prime cursor-pointer'>Sign In</Link>
            </div>
            <div className='flex justify-center mt-5'>
                <button
                className='border-[1px] border-white py-3 px-10 hover:shadow-sm hover:shadow-white text-xl text-white'>Sign Up</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default SignupPage