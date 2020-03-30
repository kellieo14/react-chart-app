import { useState, useEffect } from 'react';

const ApiData = (address) => {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(
            address
        )
        .then(res => res.json())
        .then(responses => {
               setData(responses)
        })
        .catch(error => console.log(error));
    }, [address]);
    return data;
}

export default ApiData;