import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    year: "2012",
    gasSum: "583656",
    energySum: "11995",
  },
  {
    year: "2013",
    gasSum: "631432",
    energySum: "12982",
  },
  {
    year: "2014",
    gasSum: "624649",
    energySum: "12843",
  },
  {
    year: "2015",
    gasSum: "646593",
    energySum: "13292",
  },
  {
    year: "2016",
    gasSum: "651719",
    energySum: "13399",
  },
  {
    year: "2017",
    gasSum: "720725",
    energySum: "14819",
  },
  {
    year: "2018",
    gasSum: "739313",
    energySum: "15203",
  },
  {
    year: "2019",
    gasSum: "727485",
    energySum: "14961",
  },
  {
    year: "2020",
    gasSum: "732799",
    energySum: "15069",
  },
];

const Gas = () => {
  return (
    <>
    <ResponsiveContainer width="100%" aspect={2}>
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
        <XAxis dataKey="year" />
        <YAxis dataKey="gasSum" fill="#30F06E" ticks={[500000, 550000, 600000, 650000, 700000, 750000,800000]} domain={[500000, 800000]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="gasSum" fill="#30F06E" ticks={[500000, 550000, 600000, 650000, 700000, 750000,800000]} domain={[500000, 800000]} />
        
      </BarChart>
    </ResponsiveContainer>
    <ResponsiveContainer width="100%" aspect={2}>
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
        <XAxis dataKey="year" />
        <YAxis dataKey="energySum" fill="#FFC724" ticks={[11000, 12000, 13000, 14000, 15000, 16000]} domain={[11000, 16000]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="energySum" fill="#FFC724" ticks={[11000, 12000, 13000, 14000, 15000, 16000]} domain={[11000, 16000]} />
        
      </BarChart>
    </ResponsiveContainer>
    </>

    
    
  );
};
export default Gas;
