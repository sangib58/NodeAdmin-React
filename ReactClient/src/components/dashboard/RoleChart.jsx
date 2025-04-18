import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch } from 'react-redux';
import { getRoleWiseUser } from '../../store/features/dashboardSlice';
import { useEffect, useState } from 'react';

const RoleChart = () => {
  const dispatch=useDispatch()
	const [roleData,setRoleData]=useState([])

	useEffect(()=>{
		fetchRoleData()
	},[])

	const fetchRoleData=()=>{
		dispatch(getRoleWiseUser())
		.then((res)=>{
			//console.log(res)
			setRoleData(res.payload.data)
		})
	}
  return (
    <div className='h-80'>
      <div className='flex justify-center font-semibold'>Role Wise Login</div>
      <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={600}>
              <Pie
                dataKey="count"
                nameKey="roleName"
                isAnimationActive={false}
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#111827"
                label
              />             
              <Tooltip />
          </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RoleChart