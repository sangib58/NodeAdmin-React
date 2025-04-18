import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserStatus } from "../../store/features/dashboardSlice"
import Spinner from "../common/Spinner"
import { useDispatch,useSelector } from 'react-redux'

const UserStatus = () => {
    const dispatch=useDispatch()
	const navigate=useNavigate()
	const [userStatus,setUserStatus]=useState({})
	const {loading}=useSelector((state)=>state.dashboard)

	useEffect(()=>{
		fetchUserStatus()
	},[])

	const fetchUserStatus=()=>{
		dispatch(getUserStatus())
		.then((res)=>{	
			if(res.payload.status==200){
				setUserStatus(res.payload.data)
			}else if(res.payload.status==401){
				navigate('/unauthorize')
			}else if(res.payload.status==403){
				navigate('/forbidden')
			}else{
				navigate('/unexpected')
			}
		})
	}
    return (
		<>			
			<div className="px-4 py-4 grid grid-cols-1 md:grid-cols-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
				<div className="bg-gray-400 h-auto w-auto flex items-center rounded-md shadow-lg pl-2 py-6">
					<div className="flex flex-col">
						<div><i className="ri-shield-user-line text-3xl text-white"></i></div>
						<div className="text-md text-white font-semibold">User {userStatus.totalUser}</div>
					</div>
				</div>
				<div className="bg-gray-500 h-auto w-auto flex items-center rounded-md shadow-lg pl-2 py-6">
					<div className="flex flex-col">
						<div><i className="ri-user-follow-line text-3xl text-white"></i></div>
						<div className="text-md text-white font-semibold">Active {userStatus.activeUser}</div>
					</div>
				</div>
				<div className="bg-gray-600 h-auto w-auto flex items-center rounded-md shadow-lg pl-2 py-6">
					<div className="flex flex-col">
						<div><i className="ri-user-unfollow-line text-3xl text-white"></i></div>
						<div className="text-md text-white font-semibold">In Active {userStatus.inActiveUser}</div>
					</div>
				</div>
				<div className="bg-gray-700 h-auto w-auto flex items-center rounded-md shadow-lg pl-2 py-6">
					<div className="flex flex-col">
						<div><i className="ri-admin-line text-3xl text-white"></i></div>
						<div className="text-md text-white font-semibold">Admin {userStatus.adminUser}</div>
					</div>
				</div>
			</div>
			{loading && <Spinner/>}
		</>
        
    )
}

export default UserStatus