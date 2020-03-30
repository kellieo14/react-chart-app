import React, {useState, useEffect} from 'react';
import HorizontalChart from '../Graphs/HorizontalBar/HorizontalBar';
import {sort} from '../../Utils';

export const extractLanguages = (countries, languages) => {
    for (let country in countries) {
        countries[country].languages.forEach(element => {
            languages.push(element.name);
        })
        languages.sort()
    }
}

export const getLanguageCounts = (result, languages) => {
    for (let language in languages) {
        if (result[languages[language]] === undefined) {
            result[languages[language]] = 0;
        } 
        result[languages[language]]++;
    }
}

export const  sortLanguagesByPopularity = (result, languageCountArr, labels, countryCount) => {
    for (let language in result) {
        languageCountArr.push([language, result[language]]);
    }
    sort(languageCountArr, 'language', 8, labels, countryCount)
}

export const setTopLanguagesByCountry = (labels, setData, countryCount) => {
    if (labels.length > 0) {
        setData({
            title: 'Most Common Languages by Country Count',
            labels: labels,
            datasets: [
            {
                label: 'Countries',
                backgroundColor: 'rgba(255,99,132,0.1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: countryCount
            }
            ]
        });
    } 
}

const LanguageByCountry = (props) => {
    const countries = props.countries;
    const [data, setData] = useState({});

    useEffect(() => {
        let languages = [];
        let labels = [];
        let countryCount = [];
        let result={};
        let languageCountArr = [];

        extractLanguages(countries, languages);
        getLanguageCounts(result, languages);
        sortLanguagesByPopularity(result, languageCountArr, labels, countryCount);
        setTopLanguagesByCountry(labels, setData, countryCount);
    }, [countries]);

    return (
        <div>
            <HorizontalChart data={data}/>
        </div>
      );
}

export default LanguageByCountry;


