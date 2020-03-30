import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const setValues = (data, extractedValues) => {
    if (Object.entries(data).length > 0) {
        for (let value of Object.values(data.values)) {
            extractedValues.push(value)
        }
    }
}

const PieChart = (props) => {
    const [data, setData] = useState(props.data);
    const [doughnutData, setDoughnutData] = useState({});


    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    useEffect(() => {
        let extractedValues = [];
        setValues(data, extractedValues);
        setDoughnutData({
            labels: data.titles,
                datasets: [   
                    {
                        data: extractedValues,
                        backgroundColor: data.colors
                    }
                ]
        })
    }, [data]);

  return (
    <div className='pie'>
        <h4 className='chartTitle'>{data.chartTitle}</h4>
        {Object.entries(data).length > 0 && 
            <Pie 
                options={{
                responsive: true, 
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'whiteSmoke',
                    }, 
                    position: data.position,
                }
                }}
                data={doughnutData}
            />
        }
    </div>
  );
}

export default PieChart;


