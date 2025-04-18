import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch } from 'react-redux';
import { getDateWiseLogin } from '../../store/features/dashboardSlice';
import { useEffect, useState } from 'react';

const LoginChart = () => { 
	const dispatch=useDispatch()
	const [loginChartData,setLoginChartData]=useState([])

	useEffect(()=>{
		fetchLoginChartData()
	},[])

	const fetchLoginChartData=()=>{
		let userId=localStorage.getItem('userId')
		dispatch(getDateWiseLogin({userId}))
		.then((res)=>{
			//console.log(res)
			const formatedData=res.payload.data.map((item)=>{
				return {...item,date:item.date.substring(0,10)}
			})
			setLoginChartData(formatedData)
		})
	}


	return (   
		<div className="h-80">
			<div className='flex justify-center font-semibold'>Login(Date Wise)</div>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					width={500}
					height={400}
					data={loginChartData}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Area type="monotone" dataKey="count" stroke="#111827" fill="#111827" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default LoginChart