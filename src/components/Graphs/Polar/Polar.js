import React, { useState, useEffect } from 'react';
import { Polar} from 'react-chartjs-2';

function PolarChart(props) {
  const [data, setData] = useState(props.data);
  
  useEffect(() => {
    setData(props.data);
  }, [props.data])

  return (
    <div className='polar'>
    {(JSON.stringify(data) !== '{}') && (
        <div>
          <h4 className='chartTitle'>{data.title}</h4>
          <Polar
          options={{
              legend: {
                  position: data.position,
              }
              }}
              data={data}
              />
            </ div>
    )}
    </div>
  );
}

export default PolarChart;
