import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { countries } from '../../../testData/testData';
import TestRenderer from 'react-test-renderer';
import PopulationPerCountry, { sortPopulation, getTopPopulations } from '../PopulationPerCountry';
Enzyme.configure({adapter: new Adapter()});

describe('PopulationPerCountry', () => {
    let spyUseState;
    let spyUseEffect;
    let setMockData;

    beforeEach(() => {
        setMockData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, setMockData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    });


    const expectedSortedCountries = 
            [ { name: 'China',
            region: 'Asia',
            languages: [
                { iso639_1: "zh", iso639_2: "zho", name: "Chinese", nativeName: "中文 (Zhōngwén)"}
            ], 
            population: 1377422166,
            area: 9640011 },
          { name: 'India',
            region: 'Asia',
            languages: [
                {iso639_1: "hi", iso639_2: "hin", name: "Hindi", nativeName: "हिन्दी"},
                {iso639_1: "en", iso639_2: "eng", name: "English", nativeName: "English"}
            ], 
            population: 1295210000,
            area: 3287590 },
          { name: 'United States of America',
            region: 'Americas',
            languages: [
                {iso639_1: "en", iso639_2: "eng", name: "English", nativeName: "English"}
            ], 
            population: 323947000,
            area: 9629091 },
          { name: 'Nigeria',
            region: 'Africa',
            languages: [
                {iso639_1: "en", iso639_2: "eng", name: "English", nativeName: "English"}
            ], 
            population: 186988000,
            area: 923768 },
          { name: 'France',
            region: 'Europe',
            languages: [
                {iso639_1: "fr", iso639_2: "fra", name: "French", nativeName: "français"}
            ], 
            population: 66710000,
            area: 640679 },
          { name: 'Australia',
            region: 'Oceania',
            languages: [
                {iso639_1: "en", iso639_2: "eng", name: "English", nativeName: "English"}
            ], 
            population: 24117360,
            area: 7692024 },
          { name: 'Polarland',
            region: 'Polar',
            languages: [
                {iso639_1: "es", iso639_2: "spa", name: "Spanish", nativeName: "Español"}
            ], 
            population: 11239004,
            area: 1284000 },
          { name: 'Otherland',
            region: 'Other',
            languages: [
                {iso639_1: "es", iso639_2: "spa", name: "Spanish", nativeName: "Español"}
            ], 
            population: 100,
            area: 619745 } ]

    it('should sort countries by population', () => {
        sortPopulation(countries);
        expect(countries).toStrictEqual(expectedSortedCountries);
    });

    it('should call useState and useEffect', () => {
        mount(<PopulationPerCountry countries={countries} />);
        expect(spyUseEffect).toHaveBeenCalled();
        expect(spyUseState).toHaveBeenCalled();
        expect(setMockData).toHaveBeenCalled();
    });

    it('should set top 5 populated countries', () => {
        let labels = [];
        let populations = [];
        getTopPopulations(expectedSortedCountries, labels, populations);
        expect(labels).toStrictEqual(['China', 'India', 'United States of America', 'Nigeria', 'France']);
        expect(populations).toStrictEqual([1377422166, 1295210000, 323947000, 186988000, 66710000]);
    });

    it('should match snapshot', () => {
           const testRenderer = TestRenderer.create(<PopulationPerCountry />);
           expect(testRenderer.toJSON()).toMatchSnapshot();
        });

});