import { BarChart2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis, BarChart as RechartsBarChart, ResponsiveContainer } from 'recharts';

const BarChart = ({ totalPresentData, getUniqueRec }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        format();
    }, [totalPresentData, getUniqueRec]);

    const format = () => {
        const total = getUniqueRec();
        const result = totalPresentData.map((item) => ({
            total: total,
            day: item.day,
            presentCount: item.presentCount,
            absentCount: total ? total.length - item.presentCount : 0
        }));
        setData(result);
        // console.log(result);
    };

    return (
        <div className='border p-5 rounded-lg shadow-md'>
            <h2 className=' flex my-2 font-bold text-lg'><BarChart2Icon/> Weekly Attendance</h2>
            <ResponsiveContainer width={'100%'} height={350}>
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presentCount" fill='#54f7f8' />
                    <Bar dataKey="absentCount" fill="#ffbf00" />
                </RechartsBarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default BarChart;
