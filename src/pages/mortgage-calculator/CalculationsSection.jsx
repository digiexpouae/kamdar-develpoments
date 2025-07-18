import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up calculations and event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const CalculationsSection = ({ monthlyPayment, totalInterest, totalPayment, data, COLORS }) => {
  const { width } = useWindowSize();
  const outerRadius = width >= 768 ? 120 : 80;
  return (
    <div className="flex md:flex-row flex-col w-full bg-white min-h-[500px] p-10 items-center justify-center">
    <div className="result-details w-full md:w-auto">
    <div className='result-detail-content space-y-4'>
  <div className="pb-2">
    <p className="flex items-center">
      <span>Monthly Payment:</span>
      <span className="h-px bg-gray-700 lg:flex-1 mx-2"></span>
      <span className="font-medium">
        AED {monthlyPayment ? monthlyPayment.toFixed(2) : '0.00'}
      </span>
    </p>
  </div>

  <div className="pb-2">
    <p className="flex items-center">
      <span>Interest:</span>
      <span className="h-px bg-gray-700 lg:flex-1 mx-2"></span>
      <span className="font-medium">
        AED {typeof totalInterest === 'number' ? totalInterest.toFixed(2) : '0.00'}
      </span>
    </p>
  </div>

  <div className="pb-2">
    <p className="flex items-center">
      <span>Annual Payment:</span>
      <span className="h-px bg-gray-700 lg:flex-1 mx-2"></span>
      <span className="font-medium">
        AED {monthlyPayment ? (monthlyPayment * 12).toFixed(2) : '0.00'}
      </span>
    </p>
  </div>

  <div className="pb-2">
    <p className="flex items-center">
      <span>Total Interest:</span>
      <span className="h-px bg-gray-700 lg:flex-1 mx-2"></span>
      <span className="font-medium">
        AED {typeof totalInterest === 'number' ? totalInterest.toFixed(2) : '0.00'}
      </span>
    </p>
  </div>

  <div className="pt-1">
    <p className="flex items-center font-semibold">
      <span>Total Payment:</span>
      <span className="h-px bg-gray-700 lg:flex-1 mx-2"></span>
      <span>
        AED {typeof totalPayment === 'number' ? totalPayment.toFixed(2) : '0.00'}
      </span>
    </p>
  </div>
</div>

      </div>
      <div className="calculator-results">
        <div className="chart-container" style={{ width: '100%', height: 290 }}>
          <ResponsiveContainer>
            <PieChart>
              <Legend verticalAlign="top" align="right" iconType="square" height={36} wrapperStyle={{ color: '#FFFFFF' }}/>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={outerRadius}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length].trim()}
                    stroke={COLORS[index % COLORS.length].trim()}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CalculationsSection;
