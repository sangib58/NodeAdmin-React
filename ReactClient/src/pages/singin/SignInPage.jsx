import { useState,useRef } from 'react'
import { Link,useNavigate } from "react-router-dom"
import MetaTags from '../../components/common/MetaTags'
import { ToastContainer } from "react-toastify"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login,register,getUserIp,getUserLog,createUserLog } from '../../store/features/authSlice'
import { getUserInfoToSendEmail } from '../../store/features/userSlice'
import { passwordEmailSent,welcomeEmailSent } from '../../store/features/settingSlice'
import { useDispatch } from "react-redux"
import { detect } from 'detect-browser'

import logo from '../../assets/vue-admin-logo.png'

const SignInPage = () => {
  const signInState={
    email:'',
    password:''
  }
  const signInErrorState={
    signinEmailError:'',
    signinPasswordError:''
  }
  const registrationState={
    fullName:'',
    registartionEmail:'',
    registrationPassword:''
  }
  const registrationErrorState={
    registrationNameError:'',
    registartionEmailError:'',
    registrationPasswordError:''
  }

  const [signInForm,setSignInForm]=useState(signInState)
  const [signInErrors,setSignInErrors]=useState(signInErrorState)
  const [registrationForm,setRegistrationForm]=useState(registrationState)
  const [registrationErrors,setRegistrationErrors]=useState(registrationErrorState)
  const [forgetPasswordEmail,setForgetPasswordEmail]=useState('')
  const [forgetPasswordEmailError,setForgetPasswordEmailError]=useState('')
  const {email,password}=signInForm
  const{signinEmailError,signinPasswordError}=signInErrors
  const {fullName,registartionEmail,registrationPassword}=registrationForm
  const{registrationNameError,registartionEmailError,registrationPasswordError}=registrationErrors
  const registrationDiv=useRef(null)
  const loginDiv=useRef(null)
  const forgetPasswordDiv=useRef(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const browser=detect()
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  
  const handleSignIn=(e)=>{
    e.preventDefault()
    const newErrors=validateSignIn()
    if(Object.keys(newErrors).length==0){
      dispatch(login({signInForm}))
      .then((res)=>{
        if(res.payload.status==200){
          dispatch(getUserIp())
          .then((res)=>{
            if(res.payload.status==200){
              let userIp=res.payload.data.ip
              dispatch(getUserLog({userIp}))
              .then((res)=>{
                if(res.payload.status==200){
                  const objLogHistory={
                    userId:localStorage.getItem('userId'),
                    ip:res.payload.data.ip,
                    browser:browser.name,
                    browserVersion:browser.version,
                    platform:browser.os                            
                  }
                  dispatch(createUserLog({objLogHistory}))
                  .then((res)=>{
                    localStorage.setItem('logCode',res.payload.data.logCode)
                  })
                }
              })
            }
          })
          navigate('/dashboard')
        }else if(res.payload.status==202){
          toast.error(res.payload.data.responseMsg)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }

  const onInputChangeSignIn = (e) => {
    let { name, value } = e.target
    setSignInForm({ ...signInForm, [name]: value })
    if(e.target.name=='email')signInForm.email=value
    else if(e.target.name=='password')signInForm.password=value
    validateSignIn()
  }

  const validateSignIn=()=>{
    const newErrors={}
    if(signInForm.password.trim().length<=5){
      newErrors.password='Length must be greater than or equal to 6 characters'
    }
    if(signInForm.email.trim().length==0){
      newErrors.email='Email is required'
    }else if(!/\S+@\S+\.\S+/.test(signInForm.email.trim())){
      newErrors.email='Email must be valid'
    }
    setSignInErrors({signinEmailError:newErrors.email,signinPasswordError:newErrors.password})
    return newErrors
  }

  const handleRegistration=(e)=>{
    e.preventDefault()
    const newErrors=validateRegistration()
    if(Object.keys(newErrors).length==0){
      const objRegister={
        fullName,
        email:registartionEmail,
        password:registrationPassword
      }
      dispatch(register({objRegister}))
      .then((res)=>{
        if(res.payload.status==200){
          const signInForm={
            email:registartionEmail,
            password:registrationPassword
          }
          dispatch(login({signInForm}))
          .then((res)=>{
            if(res.payload.status==200){
              if(appInitialData.allowWelcomeEmail){
                const objEmail={
                  toEmail:registartionEmail,
                  name:fullName,               
                  password:registrationPassword,
                  logoPath:process.env.APIURL+'/'+appInitialData.logoPath,
                  siteUrl:window.location.origin,
                  siteTitle:appInitialData.siteTitle,
                }
                dispatch(welcomeEmailSent({objEmail}))
              }             
              navigate('/dashboard')
            }else if(res.payload.status==202){
              toast.error(res.payload.data.responseMsg)
            }           
          })
        }else if(res.payload.status==202){ 
          toast.error(res.payload.data.responseMsg)
        }else{
          toast.error('Please try again!')
        }        
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }

  const onInputChangeRegistration=(e)=>{
    let { name, value } = e.target;
    setRegistrationForm({ ...registrationForm, [name]: value });
    if(e.target.name=='fullName')registrationForm.fullName=value
    else if(e.target.name=='registartionEmail')registrationForm.registartionEmail=value
    else if(e.target.name=='registrationPassword')registrationForm.registrationPassword=value
    validateRegistration()
  }

  const validateRegistration=()=>{
    const newErrors={}
    if(registrationForm.fullName.trim().length<=3){
      newErrors.fullName='Length must be greater than or equal to 4 characters'
    }
    if(registrationForm.registrationPassword.trim().length<=5){
      newErrors.password='Length must be greater than or equal to 6 characters'
    }
    if(registrationForm.registartionEmail.trim().length==0){
      newErrors.email='Email is required'
    }else if(!/\S+@\S+\.\S+/.test(registrationForm.registartionEmail.trim())){
      newErrors.email='Email must be valid'
    }
    setRegistrationErrors({registrationNameError:newErrors.fullName,registrationPasswordError:newErrors.password,registartionEmailError:newErrors.email})
    return newErrors
  }

  const onInputChangeForgetPassword=(e)=>{
    //console.log(e.target)
    setForgetPasswordEmail(e.target.value)
    if(e.target.value.trim().length==0 || !/\S+@\S+\.\S+/.test(e.target.value.trim())){
      setForgetPasswordEmailError('Email must be valid')
    }else{
      setForgetPasswordEmailError('')
    }
  }

  const handleForgetPassword=(e)=>{
    e.preventDefault()
    dispatch(getUserInfoToSendEmail({forgetPasswordEmail}))
    .then((res)=>{
      if(res.payload.status==200){
        const objEmail={
          toEmail:forgetPasswordEmail,
          logoPath:process.env.APIURL+'/'+appInitialData.logoPath,
          siteUrl:window.location.origin,
          siteTitle:appInitialData.siteTitle,
          resetLink:window.location.origin+'/forget/'+res.payload.data.forgetPasswordRef
        }
        if(appInitialData.defaultEmail.length==0 || appInitialData.siteTitle.length==0 || appInitialData.host.length==0 || appInitialData.port.length==0){
          toast.error('Email Configuration not done yet! please check and do that first then sent email.')
        }else{
          dispatch(passwordEmailSent({objEmail}))
          .then((res)=>{
            if(res.payload.status==200){
              toast.success(res.payload.data.responseMsg)
            }
          })
        }
      }else if(res.payload.status==202){
        toast.error(res.payload.data.responseMsg)
      }else{
        toast.error('Something un-expected! Please try again later.')
      }
    })
    
  }

  const handleForgetPasswordWindow=()=>{
    loginDiv.current.classList.add('hidden')
    registrationDiv.current.classList.add('hidden')
    forgetPasswordDiv.current.classList.toggle('hidden')
  }

  const handlehHideForgetWindow=()=>{
    registrationDiv.current.classList.add('hidden')
    loginDiv.current.classList.toggle('hidden')
    forgetPasswordDiv.current.classList.add('hidden')
  }

  const handleRegistrationWindow=()=>{
    registrationDiv.current.classList.toggle('hidden')
    loginDiv.current.classList.toggle('hidden')
  }

  const handleAdminCredential=()=>{
    setSignInForm({...signInForm,email:'admin@nodeadmin.com',password:'abcd1234'})
  }

  const handleUserCredential=()=>{
    setSignInForm({...signInForm,email:'user@nodeadmin.com',password:'abcd1234'})
  }

  return (
    <>
    <div className='flex justify-center items-center h-screen'>
      <MetaTags
        title={`${appInitialData.siteTitle} | Sign In`}
        image={process.env.APIURL+'/'+appInitialData.faviconPath}
      />    
      <div className='shadow-xl shadow-gray-600 w-[390px] rounded-tl-3xl rounded-br-3xl'>
        <div ref={loginDiv} className='flex flex-col px-4 py-1 space-y-14'>
          <div className='flex flex-col items-center'>
            <div><img src={process.env.APIURL+'/'+appInitialData.logoPath} onClick={()=>navigate('/')} className='size-12 cursor-pointer' alt="Site Logo"/></div>
            <div className='text-2xl font-bold'>{appInitialData.siteTitle}</div>
            <div>{appInitialData.welComeMessage}</div>
          </div>

          <div className='w-full'>
            <form onSubmit={handleSignIn}>
              <div>
                <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Email</label>
                <input autoComplete='off' className='block w-full outline-none border border-gray-600 hover:border-gray-950
                rounded-full px-4 py-1 text-lg focus:border-blue-600' onChange={onInputChangeSignIn} type='text' name='email' value={email}/>
                {signinEmailError!='' && <p className='mt-2 text-sm text-red-500'>{signinEmailError}</p>}
              </div>
              <div>
                <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Password</label>
                <input className='peer block w-full outline-none border border-gray-600 hover:border-gray-950
                rounded-full px-4 py-1 text-lg focus:border-blue-600' onChange={onInputChangeSignIn} type='password' name='password' value={password}/>
                {signinPasswordError!='' && <p className='mt-2 text-sm text-red-500'>{signinPasswordError}</p>}
              </div>
              <div className='flex justify-center space-x-2 font-semibold text-blue-600 cursor-pointer pt-8 pb-2'>
                <div onClick={handleAdminCredential}>Admin</div>
                <div onClick={handleUserCredential}>User</div>
              </div>
              <div className='mt-1'>
                <button type='submit' className='text-white bg-dark-black w-full rounded-full py-1'>Sign In</button>               
              </div>
            </form>
            <button onClick={handleRegistrationWindow} className='text-black bg-dusk-gray w-full rounded-full py-1 mt-1'>Register</button>
          </div>
          <div className='flex justify-center'>
            <Link onClick={handleForgetPasswordWindow} className='font-semibold text-md py-2'>Forget Password</Link>
          </div>
        </div>
               
        <div ref={registrationDiv} className='hidden flex-col px-4 py-4 space-y-12 min-h-[530px]'>
          <div className='flex flex-col items-center space-y-2'>
            <img src={process.env.APIURL+'/'+appInitialData.logoPath} onClick={()=>navigate('/')} className='size-12 cursor-pointer' alt="Site Logo"/>
            <p className='text-xl font-bold'>Registration</p>
          </div>
          <div className='w-full'>
            <form onSubmit={handleRegistration}>
              <div className='space-y-6'>
                <div>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Name</label>
                  <input autoComplete='off' className='block w-full outline-none border-b border-gray-600 text-md focus:border-blue-600' value={fullName} onChange={onInputChangeRegistration} type='text' name='fullName'/>
                  {registrationNameError!='' && <p className='mt-2 text-sm text-red-500'>{registrationNameError}</p>}
                </div>
                <div>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Email</label>
                  <input autoComplete='off' className='block w-full outline-none border-b border-gray-600 text-md focus:border-blue-600' value={registartionEmail} onChange={onInputChangeRegistration} type='text' name='registartionEmail'/>
                  {registartionEmailError!='' && <p className='mt-2 text-sm text-red-500'>{registartionEmailError}</p>}
                </div>
                <div>
                  <label className='block after:content-["*"] after:ml-0.5 after:text-red-500'>Password</label>
                  <input className='block w-full outline-none border-b border-gray-600 text-md focus:border-blue-600' value={registrationPassword} onChange={onInputChangeRegistration} type='password' name='registrationPassword'/>
                  {registrationPasswordError!='' && <p className='mt-2 text-sm text-red-500'>{registrationPasswordError}</p>}
                </div>
              </div>
              
              <div className='flex justify-between mt-12'>
                <button type='button' onClick={handleRegistrationWindow} className='text-md hover:bg-dusk-gray hover:rounded-md p-2 font-bold'>Close</button>
                <button type='submit' className='text-md hover:bg-dusk-gray hover:rounded-md p-2 font-bold'>Register</button>
              </div>
            </form>
          </div>
        </div>

        <div ref={forgetPasswordDiv} className='hidden flex-col px-4 py-4 space-y-12 min-h-[530px]'>
          <div className='flex flex-col items-center space-y-2'>
            <img src={logo} onClick={()=>navigate('/')} className='size-12 cursor-pointer' alt="Site Logo"/>
            <p className='text-xl font-bold'>Forget Password</p>
          </div>
          <div className='w-full'>
            <form onSubmit={handleForgetPassword}>                             
              <div>
                <label className='after:content-["*"] after:ml-0.5 after:text-red-500 block'>Email</label>
                <input autoComplete='off' className='block w-full outline-none border-b border-gray-600 text-md focus:border-blue-600' value={forgetPasswordEmail} type='text' name='forgetPasswordEmail' onChange={onInputChangeForgetPassword}/>               
                {forgetPasswordEmailError!='' && <p className='mt-2 text-sm text-red-500'>{forgetPasswordEmailError}</p>}
              </div>              
              <div className='flex justify-between mt-12'>
                <button type='button' onClick={handlehHideForgetWindow} className='text-md hover:bg-dusk-gray hover:rounded-md p-2 font-bold'>Close</button>
                <button type='submit' className='text-md hover:bg-dusk-gray hover:rounded-md p-2 font-bold'>Sent Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
    </>
  )
}

export default SignInPage