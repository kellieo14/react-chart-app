import React, { useState, useEffect }from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const HorizontalChart =(props) => {
    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data)
    }, [props.data]);

    return (
        <div className='horizontalBar'>
            {Object.entries(data).length > 0 && 
                <div>
                    <h4 className='chartTitle'>{data.title}</h4>
                    <HorizontalBar data={data} />
                </div>
            }
        </div>
    );
}

export default HorizontalChart;