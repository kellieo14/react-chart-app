import React from 'react';
import * as reactHooks from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { countries } from '../../../testData/testData';
import CountriesPerContinent, { extractRegions } from '../CountriesPerContinent';
Enzyme.configure({adapter: new Adapter()});

describe('CountriesPerContinent', () => {
    let spyUseState;
    let spyUseEffect;
    let mockSetData;
    beforeEach(() => {
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, mockSetData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
        mockSetData = jest.fn();
    });

    const regions = ({
        europe: 0,  
        americas: 0,
        asia: 0, 
        oceania: 0, 
        africa: 0, 
        polar: 0,
        other: 0
    });

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<CountriesPerContinent countries={countries}/>)
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should call useState and useEffect', () => {
        mount(<CountriesPerContinent countries={countries}/>)
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
        expect(mockSetData).toHaveBeenCalled();
    });

    it('should count countries per continent', () => {
        extractRegions(regions, countries);
        const expectedRegions = ({
            europe: 1,  
            americas: 1,
            asia: 2, 
            oceania: 1, 
            africa: 1, 
            polar: 1,
            other: 1
        });
        expect(regions).toEqual(expectedRegions);
    });
});
