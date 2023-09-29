import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'T 1',
        pv: 2400,
    },
    {
        name: 'T 2',
        pv: 1398,
    },
    {
        name: 'T 3',
        pv: 9800,
    },
    {
        name: 'T 4',
        pv: 3908,
    },
    {
        name: 'T 5',
        pv: 4800,
    },
    {
        name: 'T 6',
        pv: 3800,
    },
    {
        name: 'T 7',
        pv: 4300,
    },
    {
        name: 'T 8',
        pv: 9800,
    },
    {
        name: 'T 9',
        pv: 3908,
    },
    {
        name: 'T 10',
        pv: 4800,
    },
    {
        name: 'T 11',
        pv: 3800,
    },
    {
        name: 'T 12',
        pv: 4300,
    },
];



function ProjectChart() {

    return (
        <div className='h-[400px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"  />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                   
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProjectChart;