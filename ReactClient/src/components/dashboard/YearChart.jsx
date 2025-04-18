import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip,Legend,Bar, ResponsiveContainer } from 'recharts';
import { useDispatch } from 'react-redux';
import { getYearWiseLogIn } from '../../store/features/dashboardSlice';
import { useEffect, useState } from 'react';

const YearChart = () => {
	const dispatch=useDispatch()
	const [yearData,setYearData]=useState([])

	useEffect(()=>{
		fetchYearData()
	},[])

	const fetchYearData=()=>{
		let userId=localStorage.getItem('userId')
		dispatch(getYearWiseLogIn({userId}))
		.then((res)=>{
			//console.log(res)
			setYearData(res.payload.data)
		})
	}
	return (
		<div className='h-80'>
			<div className='flex justify-center font-semibold'>Year Wise Login</div>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart width={730} height={250} data={yearData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="year" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" stroke="#111827" fill="#111827"/>
				</BarChart>
			</ResponsiveContainer>       
		</div>
	)
}

export default YearChart