import React, {useState, useEffect} from 'react';
import VerticalBar from '../Graphs/VerticalBar/VerticalBar';

export const sortPopulation = (countries) => {
    countries.sort((a, b) => (a.population < b.population) ? 1 : -1);
}

export const getTopPopulations = (countries, labels, populations) => {
    if (countries.length > 0) {
        for (let i = 0; i < 5; i++) {
            labels.push(countries[i].name);
            populations.push(Math.round(countries[i].population / 1000000));
        }
    }
}

export const setPopulationData = (countries, labels, populations, setData) => {
    if (countries.length > 0) {
        getTopPopulations(countries, labels, populations);
        setData({
            title: 'Highest Populated Countries',
            labels: labels,
            datasets: [
            {
                label: 'Population / Million',
                backgroundColor: 'rgb(94,120,254, .1)',
                borderColor: 'rgb(0,128,214)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(94,120,254, .6)',
                data: populations
            }
            ]
        })
    } 
}

function PopulationPerCountry(props) {
    const countries = props.countries;
    let [data, setData] = useState({});

    useEffect(() => { 
        const labels = [];
        const populations = [];
        sortPopulation(countries);
        setPopulationData(countries, labels, populations, setData)
    }, [countries]);

    return (
        <div>
            <VerticalBar data = {data}/>
        </div>
      );
}

export default PopulationPerCountry;