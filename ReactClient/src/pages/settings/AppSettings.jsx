import {useState,useEffect, useRef} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'
import MetaTags from "../../components/common/MetaTags"
import { getAppSetting,uploadFavicon,uploadLogo,uploadImage,updateGeneralSettings,updateEmailSettings,
    updateEmailText,updateLandingText } from '../../store/features/settingSlice'
import { createErrorLog } from '../../store/features/logSlice'
import { toast } from 'react-toastify'

const AppSettings = () => {
    const initialState={
        siteSettingsId:'',
        siteTitle:'',
        welComeMessage:'',
        copyRightText:'',
        allowWelcomeEmail:false,
        allowFaq:false,
        version:'',
        logoPath:'',
        faviconPath:'',
        defaultEmail:'',
        password:'',
        host:'',
        port:'',
        welcomeEmailBody:'',
        welcomeEmailHeader:'',
        welcomeEmailSubject:'',
        forgetPasswordEmailBody:'',
        forgetPasswordEmailHeader:'',
        forgetPasswordEmailSubject:'',
        homeHeader1:'',
        homeDetail1:'',
        homeHeader2:'',
        homeDetail2:'',
        homeBox1Header:'',
        homeBox1Detail:'',
        homeBox2Detail:'',
        homeBox2Header:'',
        homeBox3Detail:'',
        homeBox3Header:'',
        homeBox4Detail:'',
        homeBox4Header:'',
        homePicture:'',
        feature1Detail:'',
        feature1Header:'',
        feature1Picture:'',
        feature2Detail:'',
        feature2Header:'',
        feature2Picture:'',
        feature3Detail:'',
        feature3Header:'',
        feature3Picture:'',
        feature4Detail:'',
        feature4Header:'',
        feature4Picture:'',
        registrationText:'',
        contactUsEmail:'',
        contactUsTelephone:'',
        contactUsText:'',
        footerFacebook:'',
        footerInstagram:'',
        footerLinkedin:'',
        footerText:'',
        footerTwitter:'',
    }

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [allSettings,setAllSettings]=useState(initialState)
    const {siteSettingsId,siteTitle,welComeMessage,copyRightText,allowFaq,allowWelcomeEmail,
        version,logoPath,faviconPath,defaultEmail,password,host,port,
        welcomeEmailBody,welcomeEmailHeader,welcomeEmailSubject,forgetPasswordEmailBody,forgetPasswordEmailHeader,forgetPasswordEmailSubject,
        homeHeader1,homeDetail1,homeHeader2,homeDetail2,homeBox1Header,homeBox1Detail,homeBox2Detail,homeBox2Header,
        homeBox3Header,homeBox4Detail,homeBox4Header,homeBox3Detail,homePicture,feature1Detail,
        feature1Header,feature1Picture,feature2Detail,feature2Header,feature2Picture,feature3Detail,feature3Header,
        feature3Picture,feature4Detail,feature4Header,feature4Picture,registrationText,contactUsEmail,
        contactUsTelephone,contactUsText,footerFacebook,footerInstagram,footerLinkedin,footerText,footerTwitter}
        =allSettings
    const [logoImg,setLogoImg]=useState('')
    const [faviconImg,setFaviconImg]=useState('')
    const [landingHomeImg,setLandingHomeImg]=useState('')
    const [landingFeature1Img,setLandingFeature1Img]=useState('')
    const [landingFeature2Img,setLandingFeature2Img]=useState('')
    const [landingFeature3Img,setLandingFeature3Img]=useState('')
    const [landingFeature4Img,setLandingFeature4Img]=useState('')
    const [generalSettingsArrow,setGeneralSettingsArrow]=useState(true)
    const [emailSettingsArrow,setEmailSettingsArrow]=useState(true)
    const [emailTextArrow,setEmailTextArrow]=useState(true)
    const [landingTextArrow,setLandingTextArrow]=useState(true)
    const generalSettingsRef=useRef(null)
    const emailSettingsRef=useRef(null)
    const emailTextRef=useRef(null)
    const landingTextRef=useRef(null)
    const {loading}=useSelector((state)=>({...state.setting}))
    const appInitialData=JSON.parse(localStorage.getItem('appSettings'))

    const handleGeneralSettingsVisibility=()=>{
        generalSettingsRef.current.classList.toggle('flex')
        generalSettingsRef.current.classList.toggle('hidden')
        setGeneralSettingsArrow(!generalSettingsArrow)
    }
    const handleEmailSettingsVisibility=()=>{
        emailSettingsRef.current.classList.toggle('flex')
        emailSettingsRef.current.classList.toggle('hidden')
        setEmailSettingsArrow(!emailSettingsArrow)
    }
    const handleEmailTextVisibility=()=>{
        emailTextRef.current.classList.toggle('flex')
        emailTextRef.current.classList.toggle('hidden')
        setEmailTextArrow(!emailTextArrow)
    }
    const handleLandingTextVisibility=()=>{
        landingTextRef.current.classList.toggle('flex')
        landingTextRef.current.classList.toggle('hidden')
        setLandingTextArrow(!landingTextArrow)
    }
    
    useEffect(()=>{
        fetchSettings()
    },[])

    const fetchSettings=()=>{
        dispatch(getAppSetting())
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                setAllSettings(res.payload.data)
                res.payload.data.logoPath!='' && setLogoImg(process.env.APIURL+'/'+res.payload.data.logoPath)
                res.payload.data.faviconPath!='' && setFaviconImg(process.env.APIURL+'/'+res.payload.data.faviconPath)
                res.payload.data.homePicture!='' && setLandingHomeImg(process.env.APIURL+'/'+res.payload.data.homePicture)
                res.payload.data.feature1Picture!='' && setLandingFeature1Img(process.env.APIURL+'/'+res.payload.data.feature1Picture)
                res.payload.data.feature2Picture!='' && setLandingFeature2Img(process.env.APIURL+'/'+res.payload.data.feature2Picture)
                res.payload.data.feature3Picture!='' && setLandingFeature3Img(process.env.APIURL+'/'+res.payload.data.feature3Picture)
                res.payload.data.feature4Picture!='' && setLandingFeature4Img(process.env.APIURL+'/'+res.payload.data.feature4Picture)
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const onInputChange=(e)=>{
        let {name,value,checked}=e.target 
        setAllSettings({...allSettings,[name]: e.target.name=='allowWelcomeEmail' || e.target.name=='allowFaq'?checked:value})
    }

    const onLogoImageChange=(e)=>{
        let files=e.target.files
        let objFormData=new FormData()
        objFormData.append('image',files[0])
        dispatch(uploadLogo({objFormData}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                setAllSettings({...allSettings,logoPath:res.payload.data.dbPath})
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }     
        })
        
        let reader=new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload=(e)=>{
            setLogoImg(e.target.result)
        }
    }

    const onFaviconImageChange=(e)=>{
        let files=e.target.files
        let objFormData=new FormData()
        objFormData.append('image',files[0])
        dispatch(uploadFavicon({objFormData}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                setAllSettings({...allSettings,faviconPath:res.payload.data.dbPath})
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }     
        })
        
        let reader=new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload=(e)=>{
            setFaviconImg(e.target.result)
        }
    }
    
    const onLandingImageChange=(e)=>{
        let imageClass=e.target.className
        let files=e.target.files
        let objFormData=new FormData()
        objFormData.append('image',files[0])
        dispatch(uploadImage({objFormData}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                if(imageClass=='homeImage'){
                    setAllSettings({...allSettings,homePicture:res.payload.data.dbPath})
                }else if(imageClass=='feature1Image'){
                    setAllSettings({...allSettings,feature1Picture:res.payload.data.dbPath})
                }else if(imageClass=='feature2Image'){
                    setAllSettings({...allSettings,feature2Picture:res.payload.data.dbPath})
                }else if(imageClass=='feature3Image'){
                    setAllSettings({...allSettings,feature3Picture:res.payload.data.dbPath})
                }else if(imageClass=='feature4Image'){
                    setAllSettings({...allSettings,feature4Picture:res.payload.data.dbPath})
                }               
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }     
        })
        
        let reader=new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload=(e)=>{
            if(imageClass=='homeImage'){
                setLandingHomeImg(e.target.result)
            }else if(imageClass=='feature1Image'){
                setLandingFeature1Img(e.target.result)
            }else if(imageClass=='feature2Image'){
                setLandingFeature2Img(e.target.result)
            }else if(imageClass=='feature3Image'){
                setLandingFeature3Img(e.target.result)
            }else if(imageClass=='feature4Image'){
                setLandingFeature4Img(e.target.result)
            }           
        }
    }

    const handleGeneralSettingsSave=(e)=>{
        e.preventDefault()
        const objGeneralSettings={
            siteSettingsId,
            siteTitle,
            welComeMessage,
            copyRightText,
            allowFaq,
            allowWelcomeEmail,
            version,
            logoPath,
            faviconPath,
            lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateGeneralSettings({objGeneralSettings}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                toast.success('Successfully saved')
            }else if(res.payload.status==202){
                toast.error('Error Occured: Please try again later!')
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEmailSettingsSave=(e)=>{
        e.preventDefault()
        const objEmailSettings={
            siteSettingsId,
            defaultEmail,
            password,
            host,
            port,
            lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateEmailSettings({objEmailSettings}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                toast.success('Successfully saved')
            }else if(res.payload.status==202){
                toast.error('Error Occured: Please try again later!')
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEmailTextSave=(e)=>{
        e.preventDefault()
        const objEmailText={
            siteSettingsId,
            welcomeEmailBody,
            welcomeEmailHeader,
            welcomeEmailSubject,
            forgetPasswordEmailBody,
            forgetPasswordEmailHeader,
            forgetPasswordEmailSubject,
            lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateEmailText({objEmailText}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                toast.success('Successfully saved')
            }else if(res.payload.status==202){
                toast.error('Error Occured: Please try again later!')
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleLandingTextSave=(e)=>{
        e.preventDefault()
        const objEmailText={
            siteSettingsId,
            homeHeader1,homeDetail1,homeHeader2,homeDetail2,homeBox1Header,homeBox1Detail,homeBox2Detail,homeBox2Header,
            homeBox3Header,homeBox4Detail,homeBox4Header,homeBox3Detail,homePicture,feature1Detail,
            feature1Header,feature1Picture,feature2Detail,feature2Header,feature2Picture,feature3Detail,feature3Header,
            feature3Picture,feature4Detail,feature4Header,feature4Picture,registrationText,contactUsEmail,
            contactUsTelephone,contactUsText,footerFacebook,footerInstagram,footerLinkedin,footerText,footerTwitter,
            lastUpdatedBy:localStorage.getItem('userId')
        }
        dispatch(updateLandingText({objEmailText}))
        .then((res)=>{
            const objError={status:res.payload.status,statusText:res.payload.request.statusText,url:res.payload.request.responseURL,message:res.payload.message,addedBy:localStorage.getItem('userId')}
            res.payload.status!=200 && dispatch(createErrorLog({objError}))
            if(res.payload.status==200){
                toast.success('Successfully saved')
            }else if(res.payload.status==202){
                toast.error('Error Occured: Please try again later!')
            }else if(res.payload.status==401){
                navigate('/unauthorize')
            }else if(res.payload.status==403){
                navigate('/forbidden')
            }else{
                navigate('/unexpected')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <>
            <div className='pt-4 pb-16'>
                <MetaTags
                    title={`${appInitialData.siteTitle} | Settings`}
                    image={process.env.APIURL+'/'+appInitialData.faviconPath}
                />
                <div className='px-2 py-1'>
                    <div className='flex items-center py-4 px-2 border border-gray-300 rounded-md shadow-md cursor-pointer' onClick={handleGeneralSettingsVisibility}>
                        <span className='text-md font-semibold'>General Settings</span>
                        {generalSettingsArrow==true && <i className="ri-arrow-right-s-line ml-auto"></i>}
                        {generalSettingsArrow==false && <i className="ri-arrow-down-s-line ml-auto"></i>}
                    </div>
                    <form onSubmit={handleGeneralSettingsSave} ref={generalSettingsRef} className='hidden flex-col space-y-4 p-2'>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Site Title</label>
                                <input type="text" autoComplete='off' value={siteTitle} name='siteTitle' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Welcome Message</label>
                                <input type="text" autoComplete='off' value={welComeMessage} name='welComeMessage' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Copyright Text</label>
                                <input type="text" autoComplete='off' value={copyRightText} name='copyRightText' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='text-sm font-medium'>App Version</label>
                                <input type="number" autoComplete='off' value={version} name='version' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Allow Welcome Email</label>
                                <input type='checkbox' name='allowWelcomeEmail' checked={allowWelcomeEmail} onChange={onInputChange} className='size-5'/>                                                                                         
                            </div>                   
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Allow Faq</label>
                                <input type='checkbox' name='allowFaq' checked={allowFaq} onChange={onInputChange} className='size-5'/>                      
                            </div>                                       
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Site Logo</label>
                                <input type='file' accept='image/*' onChange={onLogoImageChange} className=''/>
                            </div>
                            {logoImg!='' &&
                            <div className='w-full'>
                                <img src={logoImg} className='size-28 rounded-full' />
                            </div>
                            }                   
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Site Favicon</label>
                                <input type='file' accept='image/*' onChange={onFaviconImageChange} className=''/>
                            </div>
                            {faviconImg!='' &&
                            <div className='w-full'>
                                <img src={faviconImg} className='size-28 rounded-full' />
                            </div>
                            }                   
                        </div>
                        <div className='px-2 pt-4'>
                            <button type='submit' className='font-bold text-[16px] text-white px-3 py-1 bg-gray-900 rounded'>Save</button>
                        </div>
                    </form>
                </div>
                <div className='px-2 py-1'>
                    <div className='flex items-center py-4 px-2 border border-gray-300 rounded-md shadow-md cursor-pointer' onClick={handleEmailSettingsVisibility}>
                        <span className='text-md font-semibold'>Email Settings</span>
                        {emailSettingsArrow==true && <i className="ri-arrow-right-s-line ml-auto"></i>}
                        {emailSettingsArrow==false && <i className="ri-arrow-down-s-line ml-auto"></i>}
                    </div>
                    <form onSubmit={handleEmailSettingsSave} ref={emailSettingsRef} className='hidden flex-col space-y-4 p-2'>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input type="email" autoComplete='off' value={defaultEmail} name='defaultEmail' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Password</label>
                                <input type="password" autoComplete='off'  value={password} name='password' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Email Port</label>
                                <input type="text" autoComplete='off' value={port} name='port' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Host(SMTP)</label>
                                <input type="text" autoComplete='off' value={host} name='host' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                        </div>               
                        <div className='px-2 pt-4'>
                            <button type='submit' className='font-bold text-[16px] text-white px-3 py-1 bg-gray-900 rounded'>Save</button>
                        </div>
                    </form>
                </div>           
                <div className='px-2 py-1'>
                    <div className='flex items-center py-4 px-2 border border-gray-300 rounded-md shadow-md cursor-pointer' onClick={handleEmailTextVisibility}>
                        <span className='text-md font-semibold'>Email Text</span>
                        {emailTextArrow==true && <i className="ri-arrow-right-s-line ml-auto"></i>}
                        {emailTextArrow==false && <i className="ri-arrow-down-s-line ml-auto"></i>}
                    </div>
                    <form onSubmit={handleEmailTextSave} ref={emailTextRef} className='hidden flex-col space-y-4 p-2'>
                        <div className='font-bold px-2 py-4'>Welcome Email</div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <input type="text" autoComplete='off' value={welcomeEmailSubject} name='welcomeEmailSubject' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Header</label>
                                <input type="text" autoComplete='off' value={welcomeEmailHeader} name='welcomeEmailHeader' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Body</label>
                                <textarea value={welcomeEmailBody} name="welcomeEmailBody" onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>
                                
                            </div>      
                        </div> 
                        <div className='font-bold px-2 py-4'>Forget Password Email</div>              
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <input type="text" autoComplete='off' value={forgetPasswordEmailSubject} name='forgetPasswordEmailSubject' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Header</label>
                                <input type="text" autoComplete='off' value={forgetPasswordEmailHeader} name='forgetPasswordEmailHeader' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>      
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Body</label>
                                <textarea value={forgetPasswordEmailBody} name="forgetPasswordEmailBody" onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                        
                            </div>      
                        </div>               
                        <div className='px-2 pb-8'>
                            <button type='submit' className='font-bold text-[16px] text-white px-3 py-1 bg-gray-900 rounded'>Save</button>
                        </div>
                    </form>
                </div>
                <div className='px-2 py-1'>
                    <div className='flex items-center py-4 px-2 border border-gray-300 rounded-md shadow-md cursor-pointer' onClick={handleLandingTextVisibility}>
                        <span className='text-md font-semibold'>Landing Page</span>
                        {landingTextArrow==true && <i className="ri-arrow-right-s-line ml-auto"></i>}
                        {landingTextArrow==false && <i className="ri-arrow-down-s-line ml-auto"></i>}
                    </div>
                    <form onSubmit={handleLandingTextSave} ref={landingTextRef} className='hidden flex-col space-y-4 p-2'>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Home Header Top</label>
                                <input type="text" autoComplete='off' value={homeHeader1} name='homeHeader1' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Home Detail Top</label>
                                <textarea value={homeDetail1} name="homeDetail1" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Home Image</label>
                                <input type='file' accept='image/*' onChange={onLandingImageChange} className='homeImage'/>
                            </div>
                            {landingHomeImg!='' &&
                            <div className='w-full'>
                                <img src={landingHomeImg} className='size-28 rounded-full' />
                            </div>
                            }                                      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Home Header Bottom</label>
                                <input type="text" autoComplete='off' value={homeHeader2} name='homeHeader2' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Home Detail Bottom</label>
                                <textarea value={homeDetail2} name="homeDetail2" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Home Box1 Header</label>
                                <input type="text" autoComplete='off' value={homeBox1Header} name='homeBox1Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Home Box1 Detail</label>
                                <textarea value={homeBox1Detail} name="homeBox1Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Home Box2 Header</label>
                                <input type="text" autoComplete='off' value={homeBox2Header} name='homeBox2Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Home Box2 Detail</label>
                                <textarea value={homeBox2Detail} name="homeBox2Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Home Box3 Header</label>
                                <input type="text" autoComplete='off' value={homeBox3Header} name='homeBox3Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Home Box3 Detail</label>
                                <textarea value={homeBox3Detail} name="homeBox3Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Home Box4 Header</label>
                                <input type="text" autoComplete='off' value={homeBox4Header} name='homeBox4Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Home Box4 Detail</label>
                                <textarea value={homeBox4Detail} name="homeBox4Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Feature1 Header</label>
                                <input type="text" autoComplete='off' value={feature1Header} name='feature1Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Feature1 Detail</label>
                                <textarea value={feature1Detail} name="feature1Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Feature1 Image</label>
                                <input type='file' accept='image/*' onChange={onLandingImageChange} className='feature1Image'/>
                            </div>
                            {landingFeature1Img!='' &&
                            <div className='w-full'>
                                <img src={landingFeature1Img} className='size-28 rounded-full' />
                            </div>
                            }                                      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Feature2 Header</label>
                                <input type="text" autoComplete='off' value={feature2Header} name='feature2Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Feature2 Detail</label>
                                <textarea value={feature2Detail} name="feature2Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Feature2 Image</label>
                                <input type='file' accept='image/*' onChange={onLandingImageChange} className='feature2Image'/>
                            </div>
                            {landingFeature2Img!='' &&
                            <div className='w-full'>
                                <img src={landingFeature2Img} className='size-28 rounded-full' />
                            </div>
                            }                                      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Feature3 Header</label>
                                <input type="text" autoComplete='off' value={feature3Header} name='feature3Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Feature3 Detail</label>
                                <textarea value={feature3Detail} name="feature3Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Feature3 Image</label>
                                <input type='file' accept='image/*' onChange={onLandingImageChange} className='feature3Image'/>
                            </div>
                            {landingFeature3Img!='' &&
                            <div className='w-full'>
                                <img src={landingFeature3Img} className='size-28 rounded-full' />
                            </div>
                            }                                      
                        </div>         
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Feature4 Header</label>
                                <input type="text" autoComplete='off' value={feature4Header} name='feature4Header' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Feature4 Detail</label>
                                <textarea value={feature4Detail} name="feature4Detail" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='block text-sm font-medium'>Feature4 Image</label>
                                <input type='file' accept='image/*' onChange={onLandingImageChange} className='feature4Image'/>
                            </div>
                            {landingFeature4Img!='' &&
                            <div className='w-full'>
                                <img src={landingFeature4Img} className='size-28 rounded-full' />
                            </div>
                            }                                      
                        </div>  
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Registration Text</label>
                                <textarea value={registrationText} name="registrationText" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div> 
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Contact-us Text</label>
                                <textarea value={contactUsText} name="contactUsText" rows={4} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Contact-us Telephone</label>
                                <input type="text" autoComplete='off' value={contactUsTelephone} name='contactUsTelephone' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>                                         
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Contact-us Email</label>
                                <input type="text" autoComplete='off' value={contactUsEmail} name='contactUsEmail' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>                                         
                        </div> 
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>            
                            <div className='w-full'>
                                <label className='text-sm font-medium'>Footer Text</label>
                                <textarea value={footerText} name="footerText" rows={8} onChange={onInputChange} className='py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full'></textarea>                           
                            </div>      
                        </div>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full px-2'>
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Footer Facebook</label>
                                <input type="text" autoComplete='off' value={footerFacebook} name='footerFacebook' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>                                         
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Footer Twitter</label>
                                <input type="text" autoComplete='off' value={footerTwitter} name='footerTwitter' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>                                         
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Footer LinkedIn</label>
                                <input type="text" autoComplete='off' value={footerLinkedin} name='footerLinkedin' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>                                         
                            <div className='w-full'>
                                <label className="text-sm font-medium text-gray-700">Footer Instagram</label>
                                <input type="text" autoComplete='off' value={footerInstagram} name='footerInstagram' onChange={onInputChange} className="py-1 border-b outline-none border-gray-300 text-gray-600 text-md w-full"/>
                            </div>                                         
                        </div>     
                        <div className='px-2 pb-8'>
                            <button type='submit' className='font-bold text-[16px] text-white px-3 py-1 bg-gray-900 rounded'>Save</button>
                        </div>
                    </form>
                </div>           
            </div>
            {loading && <Spinner/>}
        </>
        
    )
}

export default AppSettings