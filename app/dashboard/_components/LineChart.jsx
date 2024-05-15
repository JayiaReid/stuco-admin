import { LineChartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LineChartComponent = ({ monthData, getUniqueRec }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        format();
    }, [monthData, getUniqueRec]);

    const format = () => {
        const total = getUniqueRec();
        const result = monthData.map((item) => ({
            total: total,
            day: item.day,
            presentCount: item.presentCount,
            absentCount: total ? total.length - item.presentCount : 0
        }));
        setData(result);
        console.log(result);
    };
    
    return (
        <div className=' p-5 border rounded-lg shadow-md'>
            <h2 className='flex my-2 font-bold text-lg'>
            <LineChartIcon/> Montly Attendance</h2>
            <ResponsiveContainer width={'100%'} height={350}>
                <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="presentCount" stroke="#54f7f8" />
                <Line type="monotone" dataKey="absentCount" stroke="#ffbf00" />
            </LineChart>
            </ResponsiveContainer>
                
            
        </div>
    )
}

export default LineChartComponent;
