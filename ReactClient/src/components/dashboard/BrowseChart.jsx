import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip,Legend,Bar, ResponsiveContainer } from 'recharts';
import { useDispatch } from 'react-redux';
import { getBrowserCount } from '../../store/features/dashboardSlice';
import { useEffect, useState } from 'react';

const BrowseChart = () => {
	const dispatch=useDispatch()
	const [browserData,setBrowserData]=useState([])

	useEffect(()=>{
		fetchBrowserData()
	},[])

	const fetchBrowserData=()=>{
		let userId=localStorage.getItem('userId')
		dispatch(getBrowserCount({userId}))
		.then((res)=>{
			//console.log(res)
			setBrowserData(res.payload.data)
		})
	}
	return (
		<div className='h-80'>
			<div className='flex justify-center font-semibold'>Browser Wise Login</div>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart width={730} height={250} data={browserData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="browser" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" stroke="#111827" fill="#111827"/>
				</BarChart>
			</ResponsiveContainer>       
		</div>
	)
}

export default BrowseChart