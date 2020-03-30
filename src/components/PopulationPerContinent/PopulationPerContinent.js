import React, {useState, useEffect} from 'react';
import Pie from "../Graphs/Pie/Pie";

export const extractRegions = (regions, countries) => {
    const popPerContinent = (region, population) => {
        let area = region.toLowerCase();
        for (region in regions) {
            if (area === region) {
                regions[region] += population
            }
        }
    }
    for (let country in countries) {
        let {population} = countries[country];
        let {region} = countries[country];
        switch (region) {
            case 'Europe':
                popPerContinent(region, population);
                break;
            case 'Americas':
                popPerContinent(region, population);
                break;
            case 'Oceania':
                popPerContinent(region, population);
                break;
            case 'Asia':
                popPerContinent(region, population);
                break;
            case 'Africa':
                popPerContinent(region, population);
                break;
            case 'Polar':
                popPerContinent(region, population);
                break;
            default:
                popPerContinent('other', population);
        }
    }
}

const PopulationPerContinent = (props) => {
    const countries = props.countries;
    const [data, setData] = useState({});

    useEffect(() => {
        const regions = ({
            europe: 0,  
            americas: 0,
            asia: 0, 
            oceania: 0, 
            africa: 0, 
            polar: 0,
            other: 0
        });
        
      extractRegions(regions, countries);

      setData({
        chartTitle: 'Population per Continent',
        titles: ['Europe', 'Americas', 'Asia', 'Oceania', 'Africa', 'Polar', 'Other'],
        values: regions, 
        colors: ['#0be2d7','#a73e5c', '#0080d6','#8dc63f', '#ffe119', '#ba59fa', '#fd7400'],
        position: 'right'
      })
    },[countries]);

    return (
        <div className="">
            <Pie data = {data} />
        </div>
    );
}

export default PopulationPerContinent;