import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
//DETTA ÄR ETT EXEMPEL fIXA detta till live

const mockData = [
  { name: 'Mån', kurs: 10.42 },
  { name: 'Tis', kurs: 10.51 },
  { name: 'Ons', kurs: 10.38 },
  { name: 'Tors', kurs: 10.65 },
  { name: 'Fre', kurs: 10.72 },
  { name: 'Lör', kurs: 10.68 },
  { name: 'Sön', kurs: 10.55 },
];

function Graph() {
  return (
    <div className="bg-white border-gray-200 rounded-xl w-full max-w-5xl border shadow-lg p-6 mt-8 flex flex-col items-center overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 w-full text-left">Valutakurs Trend (Exempeldata)</h2>
      <div className="w-full min-w-[600px] flex justify-center">
        <LineChart
          width={800}
          height={300}
          data={mockData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis domain={['auto', 'auto']} stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }}/>
          <Line 
            type="monotone" 
            dataKey="kurs" 
            name="Växelkurs"
            stroke="#1e3a8a" 
            activeDot={{ r: 8 }} 
            strokeWidth={3} 
          />
        </LineChart>
      </div>
    </div>
  );
}

export default Graph;