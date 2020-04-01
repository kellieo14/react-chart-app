import React, {useState, useEffect} from 'react';
import VerticalBar from '../Graphs/VerticalBar/VerticalBar';
import {sort} from '../../Utils';

export  const extractLanguages = (countries, languages) => {
    for (let country in countries) {
        countries[country].languages.forEach(element => {
            languages.push([element.name, Math.round(countries[country].population / 1000000)]);
        })
    }
}

export const sortLanguagesByName = (languages) => {
    languages.sort((a, b) => {
        return a[0] > b[0] ? 1 : -1
    }) 
}

export const getLanguageCounts = (languages, result) => {
    for (let language in languages) {
        if (result[languages[language][0]] === undefined) {
            result[languages[language][0]] = languages[language][1];
        } else {
            result[languages[language][0]] += languages[language][1];
        }
    }
}

export const sortLanguagesByPopulation = (result, languageCountArr, labels, countryCount) => {
    for (let language in result) {
        languageCountArr.push([language, result[language]]);
    }
    sort(languageCountArr, 'lanugage', 8, labels, countryCount);

}

const setTopLanguagesByCountry = (labels, setData, countryCount) => {
    if (labels.length > 0) {
        setData({
            title: 'Most Common Languages by People Count',
            labels: labels,
            datasets: [
            {
                label: 'Number of People / Million',
                backgroundColor: 'rgb(141,198,63, .2)',
                borderColor: 'rgb(141,198,63, .6)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(141,198,63, .6)',
                data: countryCount
            }
            ]
        })
    } 
}

const LanguageByPopulation = (props) => {
    const countries = props.countries;
    const [data, setData] = useState({});
    
    useEffect(() => {
        let languages = [];
        let labels = [];
        let countryCount = [];
        let result=[];
        let languageCountArr = [];

        extractLanguages(countries, languages);
        sortLanguagesByName(languages);
        getLanguageCounts(languages, result);
        sortLanguagesByPopulation(result, languageCountArr, labels, countryCount);
        setTopLanguagesByCountry(labels, setData, countryCount);
    }, [countries]);

    return (
        <div>
            <VerticalBar data={data}/>
        </div>
      );
}

export default LanguageByPopulation;