import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import { countries } from '../../../testData/testData';
import LanguageByCountry, { extractLanguages, getLanguageCounts, sortLanguagesByPopularity } from '../LanguageByCountry';
Enzyme.configure({adapter: new Adapter()});

describe('LanguageByCountry', () => {

    let spyUseState;
    let spyUseEffect;
    let mockSetData;

    beforeEach(() => {
        mockSetData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, mockSetData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    })
    const expectedLanguages = [
        'Chinese', 
        'English', 
        'English', 
        'English',
        'English', 
        'French', 
        'Hindi',
        'Spanish',
        'Spanish',
    ];

    const expectedLanguageCounts = {
        Chinese: 1, 
        English: 4, 
        French: 1, 
        Hindi: 1, 
        Spanish: 2,
    }

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<LanguageByCountry />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should call useSatate and useEffect', () => {
        mount(<LanguageByCountry countries={countries} />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
        expect(mockSetData).toHaveBeenCalled();
    });

    it('should extract languages from countries', () => {
        let languages = [];
        extractLanguages(countries, languages);
        expect(languages).toEqual(expectedLanguages);
    });

    it('should count the occurence of each language', () => {
        let result = {};
        getLanguageCounts(result, expectedLanguages);
        expect(result).toEqual(expectedLanguageCounts);
    });

    it('should sort language by popularity', () => {
        let languageCountArr = [];
        let labels = [];
        let countryCount = [];

        const expectedLanguageCountArr = [
            ['English', 4], 
            ['Spanish', 2], 
            ['Chinese', 1], 
            ['French', 1], 
            ['Hindi', 1]
        ];

        const expectedLabels = ['English', 'Spanish', 'Chinese', 'French', 'Hindi'];

        const expectedCountryCount = [4, 2, 1, 1, 1];

        sortLanguagesByPopularity(expectedLanguageCounts, languageCountArr, labels, countryCount);
        expect(languageCountArr).toEqual(expectedLanguageCountArr);
        expect(labels).toEqual(expectedLabels);
        expect(countryCount).toEqual(expectedCountryCount);
    });
})