import React, { useState, useEffect } from 'react';
import Polar from '../Graphs/Polar/Polar';
import {sort} from '../../Utils';

export const extractDensity = (countries, densityCount) => {
    for (let country in countries) {
        if (countries[country].area === 0 || countries[country].population === 0 || countries[country].area === null) {
            densityCount.push([countries[country].name, 0]);
        } else {
            let density = (countries[country].name, (countries[country].population) / (countries[country].area))
            densityCount.push([countries[country].name, Math.round(density)]);
        }
    }
}

export const sortCountriesByHighestDensity = (densityCount, labels, densityArr) => {
    sort(densityCount, 'con', 5, labels, densityArr);
}

export const setTopDensestCountries = (labels, setData, densityArr) => {
    if (labels.length > 0) {
        setData({
            title: 'Countries with Highest Density per Square Kilometer',
            position: 'right',
            labels: labels,
            datasets: [
                {
                    label: 'People per Square Kilometer',
                    backgroundColor: ['rgb(11,226,215, .8)','rgb(167,62,92, .8)', 'rgb(0,128,214, .8)','rgb(141,198,63, .8)', 'rgb(255,225,25, .8)'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['rgb(11,226,215)','rgb(167,62,92)', 'rgb(0,128,214)','rgb(141,198,63)', 'rgb(255,225,25)'],
                    data: densityArr,
                }
            ]
        })
    }
}

const Density = (props) => {
    const [data, setData] = useState({});
    
    useEffect(() => {
        let densityCount = [];
        let labels = [];
        let densityArr = [];

        extractDensity(props.countries, densityCount);
        sortCountriesByHighestDensity(densityCount, labels, densityArr);
        setTopDensestCountries(labels, setData, densityArr);
    }, [props.countries]);

    return (
        <div>
            <Polar data={data} />
        </div>
    );
}

export default Density;