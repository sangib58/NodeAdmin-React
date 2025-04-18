import { createContact } from '../../store/features/landingSlice'
import MetaTags from '../../components/common/MetaTags'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import {useNavigate} from "react-router-dom"
import {Facebook,Twitter,Linkedin,Instagram} from 'lucide-react'
import { toast } from 'react-toastify'

const LandingPage = ({settings}) => {
  const contactState={
    name:'',
    email:'',
    message:''
  }
  const errorState={
    nameError:'',
    emailError:'',
    messageError:''
  }
  const [contactForm,setContactForm]=useState(contactState)
  const [errors,setErrors]=useState(errorState)
  const {name,email,message}=contactForm
  const {nameError,emailError,messageError}=errors
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const resetForm=()=>{
    setContactForm({name:'',email:'',message:''})
  }

  const onInputChange=(e)=>{
    let {name,value}=e.target 
    setContactForm({...contactForm,[name]:value})
    if(e.target.name=='name')contactForm.name=value
    else if(e.target.name=='email')contactForm.email=value
    else if(e.target.name=='message')contactForm.message=value
    validateForm()
  }

  const validateForm=()=>{
    const newErrors={}
    if(contactForm.name.trim().length<=3){
      newErrors.name='Length must be greater than or equal to 4 characters'
    }
    if(contactForm.email.trim().length==0){
      newErrors.email='Email is required'
    }else if(!/\S+@\S+\.\S+/.test(contactForm.email.trim())){
      newErrors.email='Email must be valid'
    }
    if(contactForm.message.trim().length<=5){
      newErrors.message='Length must be greater than or equal to 10 characters'
    }
    setErrors({nameError:newErrors.name,emailError:newErrors.email,messageError:newErrors.message})
    return newErrors
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const newErrors=validateForm()
    if(Object.keys(newErrors).length==0){
      dispatch(createContact({contactForm}))
      .then((res)=>{
        if(res.payload.status==200){
          resetForm()
          toast.success(res.payload.data.responseMsg)
        }
      })
      .catch(err=>console.log(err))
    }
  }

  const handleRegistrationWindow=()=>{
    navigate('/signin')
  }
  
  return (
    <div className='space-y-60 px-3 md:px-0'>
      <MetaTags
        title={`${settings.siteTitle} | Landing`}
        image={process.env.APIURL+'/'+settings.faviconPath}
      />
      <section id='home' className='space-y-20 pt-6 md:pt-2'>
        {/* Hero Top Section */}
        <div className='container mx-auto flex flex-col md:flex-row space-y-32'>
          <div className='flex flex-col justify-center md:w-2/3 space-y-8'>
            <p className='text-5xl text-dark-black font-bold leading-[3.5rem]'>{settings.homeHeader1}</p>
            <p className='text-gray-600 text-md'>{settings.homeDetail1}</p>
            <div className='float-left'>
              <button onClick={handleRegistrationWindow} className='border px-6 py-[5.5px] border-gray-500 hover:bg-gray-200 text-md text-gray-600 font-semibold rounded-md'>Get Registered</button>
            </div>        
          </div>
          <div className='md:w-2/3'>
            <img src={process.env.APIURL+'/'+settings.homePicture} alt="Hero Img" />
          </div>
        </div>

        {/* Hero Bottom Section */}
        <div className='container mx-auto flex flex-col justify-center space-y-20'>
          <p className='text-5xl text-dark-black leading-[4rem] text-center font-bold'>{settings.homeHeader2}</p>
          <p className='text-center text-md text-gray-600'>{settings.homeDetail2}</p>
          <div className='flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-6 md:space-y-0'>
            <div className='shadow-2xl rounded-br-2xl md:w-1/4'>
              <p className='rounded-tl-2xl bg-dark-gray text-white text-lg font-bold px-6 py-3 text-center'>{settings.homeBox1Header}</p>
              <p className='px-3 pb-12 pt-2 text-md text-gray-600'>{settings.homeBox1Detail}</p>
            </div>        
            <div className='shadow-2xl rounded-br-2xl md:w-1/4'>
              <p className='rounded-tl-2xl bg-dark-gray text-white text-lg font-bold px-6 py-3 text-center'>{settings.homeBox2Header}</p>
              <p className='px-3 pb-12 pt-2 text-md text-gray-600'>{settings.homeBox2Detail}</p>
            </div>        
            <div className='shadow-2xl rounded-br-2xl md:w-1/4'>
              <p className='rounded-tl-2xl bg-dark-gray text-white text-lg font-bold px-6 py-3 text-center'>{settings.homeBox3Header}</p>
              <p className='px-3 pb-12 pt-2 text-md text-gray-600'>{settings.homeBox3Detail}</p>
            </div>        
            <div className='shadow-2xl rounded-br-2xl md:w-1/4'>
              <p className='rounded-tl-2xl bg-dark-gray text-white text-lg font-bold px-6 py-3 text-center'>{settings.homeBox4Header}</p>
              <p className='px-3 pb-12 pt-2 text-md text-gray-600'>{settings.homeBox4Detail}</p>
            </div>        
          </div>
        </div>
      </section>
      
      <section id='feature' className='space-y-32'>
        {/* Feature Section */}
        <div className='container mx-auto space-y-20'>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-1/2 flex flex-col justify-center'>
              <p className='text-2xl text-dark-black font-bold'>{settings.feature1Header}</p>
              <p className='text-md text-gray-600 mt-2'>{settings.feature1Detail}</p>
            </div>
            <div className='w-full md:w-1/2'>
              <img src={process.env.APIURL+'/'+settings.feature1Picture} alt="Feature Img 1" />
            </div>
          </div>
          <div className='flex flex-col md:flex-row-reverse'>
            <div className='w-full md:w-1/2 flex flex-col justify-center'>
              <p className='text-2xl font-bold'>{settings.feature2Header}</p>
              <p className='text-md text-gray-600 mt-2'>{settings.feature2Detail}</p>
            </div>
            <div className='w-full md:w-1/2'>
              <img src={process.env.APIURL+'/'+settings.feature2Picture} alt="Feature Img 2" />
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-1/2 flex flex-col justify-center'>
              <p className='text-2xl font-bold'>{settings.feature3Header}</p>
              <p className='text-md text-gray-600 mt-2'>{settings.feature3Detail}</p>
            </div>
            <div className='w-full md:w-1/2'>
              <img src={process.env.APIURL+'/'+settings.feature3Picture} alt="Feature Img 3" />
            </div>
          </div>
          <div className='flex flex-col md:flex-row-reverse'>
            <div className='w-full md:w-1/2 flex flex-col justify-center'>
              <p className='text-2xl font-bold'>{settings.feature4Header}</p>
              <p className='text-md text-gray-600 mt-2'>{settings.feature4Detail}</p>
            </div>
            <div className='w-full md:w-1/2'>
              <img src={process.env.APIURL+'/'+settings.feature4Picture} alt="Feature Img 4" />
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className='mx-auto flex flex-col px-4 py-10 justify-center text-center space-y-6 bg-dark-black rounded'>
          <p className='text-md text-white'>{settings.registrationText}</p>
          <div className='flex justify-center'><button onClick={handleRegistrationWindow} className='text-gray-100 text-lg font-bold border-2 border-white hover:bg-gray-800 px-8 py-2 rounded-md'>Register Now</button></div>        
        </div>
      </section>
      
      <section id='contact' className='space-y-32'>
        {/* Contact Section */}
        <div className='container mx-auto flex flex-col md:flex-row md:space-x-8 space-y-16 md:space-y-2'>
          <div className='w-full space-y-2'>
            <p className='text-2xl text-dark-black font-bold'>Contact-us</p>
            <p className='text-md text-gray-600'>{settings.contactUsText}</p>
            <p className='text-md text-gray-600'>{settings.contactUsTelephone}</p>
            <p className='text-md text-gray-600'>{settings.contactUsEmail}</p>
          </div>
          <div className='w-full'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Name</label>
                <input type="text" autoComplete='off' value={name} name='name' onChange={onInputChange} className={`py-1 border-b border-gray-300 outline-none text-gray-600 text-md block w-full focus:border-blue-600`}/>
                {nameError!='' && <p className='mt-2 text-sm text-red-500'>{nameError}</p>}
              </div>
              <div>
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Email</label>
                <input type="text" autoComplete='off' value={email} name='email' onChange={onInputChange} className="py-1 border-b border-gray-300 outline-none text-gray-600 text-md block w-full focus:border-blue-600"/>
                {emailError!='' && <p className='mt-2 text-sm text-red-500'>{emailError}</p>}
              </div>
              <div>
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium mb-2">Message</label>
                <textarea rows={6} value={message} name='message' onChange={onInputChange} className="block outline-none border-b border-gray-300 rounded-lg w-full text-md text-gray-600 focus:border-blue-600"></textarea>
                {messageError!='' && <p className='mt-2 text-sm text-red-500'>{messageError}</p>}
              </div>
              <div>
                <button type='submit' className="mt-16 block rounded-full text-sm py-2 font-semibold bg-superLight-gray text-center w-full">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id='footer'>
        {/* Footer Section */}
        <div className='mx-auto flex flex-col px-4 py-2 justify-center space-y-6 text-white text-md bg-dark-black rounded'>
          <div className='flex space-x-10 justify-center mt-4'>
            <a href={settings.footerLinkedin} target='_blank'><Linkedin size={20}/></a>
            <a href={settings.footerFacebook} target='_blank'><Facebook size={20}/></a>
            <a href={settings.footerTwitter} target='_blank'><Twitter size={20}/></a>
            <a href={settings.footerInstagram} target='_blank'><Instagram size={20}/></a>                                  
          </div>
          <div className='border-b border-gray-50 pb-4 text-center'>
            {settings.footerText}
          </div>
          <div className='flex justify-center'>
            {settings.copyRightText}
          </div>
        </div>
      </section>
    </div>   
  )
}

export default LandingPage