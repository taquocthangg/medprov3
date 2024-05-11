import React, { useState } from 'react';
import {
    PieChart, Pie, Sector, ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, BarChart, Bar, CartesianGrid, Tooltip, Legend
} from 'recharts';
// TinyLineChart (Admin Thống kê số lượng người dùng mới )
// CustomContentOfTooltip (Top bác sĩ có  đánh giá tốt )


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

// Biểu đồ tròn kèm miêu tả 
//data {
//     name: 'Page A',
//     value:'300
//   },
const Round_shape = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart >
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

// Biểu đồ dòng kẻ 
//data {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
const Line_Chart = ({ data }) => {
    const formatTooltipLabel = (value) => {
        return `Tháng ${value}`;
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 50,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    tickFormatter={(month) => `Tháng ${month}`}
                    angle={0} // Góc quay -45 độ
                    textAnchor="end" // Đảm bảo căn chỉnh theo phía cuối của vùng được quay
                    interval={0} 
                />
                <YAxis />
                <Tooltip
                    labelFormatter={formatTooltipLabel}
                    // formatter={formatTooltipValue}
                />
                <Legend />
                <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                <ReferenceLine y={9800} label="Max" stroke="red" />
                <Line type="monotone" dataKey="available" stroke="#8884d8" />
                <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
                <Line type="monotone" dataKey="canceled" stroke="red" />

            </LineChart>
        </ResponsiveContainer>
    );
}
//Tiny line 
//data {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },

const TinyLine = ({ data }) => {
    return (
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}


//Biểu đồ cột  
//data {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const Bar_Chart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="pv" barSize={20} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );

}




const ChartAdmin = ({ name, data }) => {
    
    switch (name) {
        case 'circle':
            return <Round_shape data={data} />
        case 'line':
            return <Line_Chart data={data} />
        case 'TinyLine':
            return <TinyLine data={data} />
        case 'Bar':
            return <Bar_Chart data={data} />
        default:
            return (
                <p>Chưa nhận được data</p>
            )
    }
};

export default ChartAdmin;
