import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip,Legend,Bar, ResponsiveContainer } from 'recharts';
import { useDispatch } from 'react-redux';
import { getMonthWiseLogIn } from '../../store/features/dashboardSlice';
import { useEffect, useState } from 'react';

const MonthChart = () => {
	const dispatch=useDispatch()
	const [monthData,setMonthData]=useState([])

	useEffect(()=>{
		fetchMonthData()
	},[])

	const fetchMonthData=()=>{
		let userId=localStorage.getItem('userId')
		dispatch(getMonthWiseLogIn({userId}))
		.then((res)=>{
			//console.log(res)
			setMonthData(res.payload.data)
		})
	}
	return (
		<div className='h-80'>
			<div className='flex justify-center font-semibold'>Month Wise Login</div>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart width={730} height={250} data={monthData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" stroke="#111827" fill="#111827"/>
				</BarChart>
			</ResponsiveContainer>       
		</div>
	)
}

export default MonthChart