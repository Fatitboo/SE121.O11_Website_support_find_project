import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'



export default function UserChart({sk, cor}) {
	const data = [
		{ name: 'Seeker', value: sk??40 },
		{ name: 'Organizer', value: cor??30 },
		
	]
	
	const RADIAN = Math.PI / 180
	const COLORS = ['#00C49F', '#FFBB28']
	
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		)
	}
	return (
		<div className="w-full h-3/4 bg-white pt-3 px-3 rounded-sm flex flex-col">
			<strong className="text-gray-700 font-bold mb-5 pl-2 pt-3">User Profile</strong>
			<div className="mt-4 w-full  flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width='100%' height='100%'>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={105}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}