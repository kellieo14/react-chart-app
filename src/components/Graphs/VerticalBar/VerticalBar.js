import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function VerticalBar(props) {
    const [data, setData] = useState(props.data);
    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div className='verticalBar'>
            <h4 className='chartTitle'>{data.title}</h4>
            {Object.entries(data).length > 0 &&
                <Bar data={data} />
            }
        </div>
    );
}

export default VerticalBar;
