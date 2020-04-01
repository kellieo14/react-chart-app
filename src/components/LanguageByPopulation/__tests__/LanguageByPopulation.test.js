import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import { countries } from '../../../testData/testData';
import LanguageByPopulation, { extractLanguages, sortLanguagesByName, getLanguageCounts, sortLanguagesByPopulation } from '../LanguageByPopulation';
Enzyme.configure({adapter: new Adapter()});

const utils = require('../../../Utils');
utils.sort = jest.fn();

describe('LanguageByPopulation', () => {
    let spyUseState;
    let spyUseEffect;
    let setMockData;

    beforeEach(() => {
        setMockData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, setMockData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    });

    const expectedLanguages = [
        ['Chinese', 1377], 
        ['Hindi', 1295], 
        ['English', 1295], 
        ['English', 324], 
        ['English', 187], 
        ['French', 67], 
        ['English', 24], 
        ['Spanish', 11], 
        ['Spanish', 0],
    ];

    const expectedSortedLanguages = [
        ['Chinese', 1377422166], 
        ['English', 24117360], 
        ['English', 186988000], 
        ['English', 323947000], 
        ['English', 1295210000], 
        ['French', 66710000], 
        ['Hindi', 1295210000], 
        ['Spanish', 100],
        ['Spanish', 11239004], 
    ];

    const expectedResult = {
        Chinese: 1377422166,
        English: 1830262360,
        French: 66710000,
        Hindi: 1295210000,
        Spanish: 11239104,
        
    }

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<LanguageByPopulation />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should call useState and useEffect', () => {
        mount(<LanguageByPopulation countries={countries} />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
    });

    it('should extract languages and population from countries', () => {
        let languages = [];
        extractLanguages(countries, languages);
        expect(languages).toEqual(expectedLanguages);
    });

    it('should sort languages alphabetically', () => {
        const languagesToSort = [
            ['Chinese', 1377422166], 
            ['Hindi', 1295210000], 
            ['English', 1295210000], 
            ['English', 323947000], 
            ['English', 186988000], 
            ['French', 66710000], 
            ['English', 24117360], 
            ['Spanish', 11239004], 
            ['Spanish', 100],
        ];
        sortLanguagesByName(languagesToSort);
        expect(languagesToSort).toEqual(expectedSortedLanguages);
    });

    it('should calculate total number of people that speak each language', () => {
        let result = {};
        getLanguageCounts(expectedSortedLanguages, result);
        expect(result).toEqual(expectedResult);
    });

    it('should call the child function', () => {
        let languageCountArr = [];
        let labels = [];
        let countryCount = [];
        sortLanguagesByPopulation(expectedResult, languageCountArr, labels, countryCount);
        expect(utils.sort).toHaveBeenCalledTimes(2);
    });

    it('should sort languages by highest population', () => {
        const expectedLanguageCountArr = [
            ['Chinese', 1377422166], 
            ['English', 1830262360], 
            ['French', 66710000], 
            ['Hindi', 1295210000], 
            ['Spanish', 11239104]
        ];
        let languageCountArr = [];
        let labels = [];
        let countryCount = [];
        sortLanguagesByPopulation(expectedResult, languageCountArr, labels, countryCount);
        expect(languageCountArr).toEqual(expectedLanguageCountArr);

    });
})