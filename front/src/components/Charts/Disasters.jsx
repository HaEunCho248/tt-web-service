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
      "year": "1950",
      "재난피해자수": "7978223.6"
    },
    {
     
      "year": "1960",
      "재난피해자수": "78856456.79999998"
    },
    {
       
      "year": "1970",
      "재난피해자수": "221031126.39999998"
    },
    {
      
      "year": "1980",
      "재난피해자수": "495442952.60000014"
    },
    {
     
      "year": "1990",
      "재난피해자수": "805157708.3999996"
    },
    {
     
      "year": "2000",
      "재난피해자수": "909660739.1999998"
    },
    {
      
      "year": "2010",
      "재난피해자수": "706247969.5999999"
    }
]

const Disasters = () => {
  return (
    <>                                              
    <ResponsiveContainer width="90%" aspect={3}>
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
        <YAxis dataKey="재난피해자수" fill="##FF6635" />
        <Tooltip />
        <Legend />
        <Bar dataKey="재난피해자수" fill="#FF6635" />
        
      </BarChart>
    </ResponsiveContainer>
    </>

    
    
  );
};
export default Disasters;
