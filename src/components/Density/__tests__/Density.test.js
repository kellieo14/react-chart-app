import React from 'react';
import * as reactHooks from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { countries } from '../../../testData/testData';
import Density, { extractDensity, sortCountriesByHighestDensity } from '../Density';

Enzyme.configure({adapter: new Adapter()});

describe('Density', () => {
    let spyUseState;
    let spyUseEffect;
    let mockSetData;

    beforeEach(() => {
        mockSetData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, mockSetData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
        
    })
    const expectedDensityCount = [
        ['China', 143],
        ['India', 394],
        ['United States of America', 34], 
        ['Nigeria', 202], 
        ['France', 104],
        ['Australia', 3],
        ['Polarland', 9],
        ['Otherland', 0],
    ]

    const expectedDensityArr = [394, 202, 143, 104, 34];
    const expectedLabels = ['India', 'Nigeria', 'China', 'France', 'United States of America'];

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<Density />)
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should call useState and useEffect', () => {
        mount(<Density countries={countries} />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
    })

    it('should get density count', () => {
        let densityCount = [];
        extractDensity(countries, densityCount);
        expect(densityCount).toEqual(expectedDensityCount);
    });

    it('should sort countries by highest density', () => {
        let labels = [];
        let densityArr =[];
        sortCountriesByHighestDensity(expectedDensityCount, labels, densityArr);
        expect(densityArr).toEqual(expectedDensityArr);
        expect(labels).toEqual(expectedLabels);
    });
});