import React, { useState, useEffect } from 'react';
import Doughnut from "../Graphs/Doughnut/Doughnut";

export const extractRegions = (regions, countries) => {

    const countriesPerRegion = (region) => {
        let area = region.toLowerCase();
        for (region in regions) {
            if (area === region) {
                regions[region]++
            }
        }
    }

    for (let country in countries) {
        let { region } = countries[country];
        switch (region) {
            case 'Europe':
                countriesPerRegion(region);
                break;
            case 'Americas':
                countriesPerRegion(region);
                break;
            case 'Oceania':
                countriesPerRegion(region);
                break;
            case 'Asia':
                countriesPerRegion(region);
                break;
            case 'Africa':
                countriesPerRegion(region);
                break;
            case 'Polar':
                countriesPerRegion(region);
                break;
            default:
                countriesPerRegion('other');
        }
    }
}

const CountriesPerContinent = (props) => {
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
            chartTitle: 'Countries per Continent',
            titles: ['Europe', 'Americas', 'Asia', 'Oceania', 'Africa', 'Polar', 'Other'],
            values: regions,
            colors: ['#0be2d7', '#a73e5c', '#0080d6', '#8dc63f', '#ffe119', '#ba59fa', '#fd7400'],
            position: 'left',
        })
    }, [countries]);

    return (
        <div className="">
            <div>
                <Doughnut data={data} />
            </div>
        </div>
    );
}

export default CountriesPerContinent;