import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const setValues = (data, extractedValues) => {
    if (Object.entries(data).length > 0) {
        for (let value of Object.values(data.values)) {
            extractedValues.push(value)
        }
    }
}

const DoughnutChart = (props) => {
    const [data, setData] = useState(props.data);
    const [doughnutData, setDoughnutData] = useState({});

    useEffect(() => {
        setData(props.data);
    }, [props.data])

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
    <div className="doughnut">

        {Object.entries(data).length > 0 && 
        <div>
            <h4 className='chartTitle'>{data.chartTitle}</h4>
            <Doughnut 
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
            </div> 
        }
    </div>
  );
}

export default DoughnutChart;


