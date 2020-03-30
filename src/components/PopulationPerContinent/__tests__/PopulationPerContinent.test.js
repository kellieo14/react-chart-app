import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';
import { countries } from '../../../testData/testData';
import PopulationPerContinent, { extractRegions } from '../PopulationPerContinent';
Enzyme.configure({adapter: new Adapter()});

describe('PopulationPerContinent', () => {
    let spyUseState;
    let spyUseEffect;
    let setMockData; 

    beforeEach(() => {
        setMockData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, setMockData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    });

    const expectedRegions = {
        europe: 66710000, 
        americas: 323947000, 
        asia: 2672632166, 
        oceania: 24117360, 
        africa: 186988000, 
        polar: 11239004, 
        other: 100,
    }

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<PopulationPerContinent />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should call useState and useEffect', () => {
        mount(<PopulationPerContinent countries={countries} />);
        expect(spyUseEffect).toHaveBeenCalled();
        expect(spyUseState).toHaveBeenCalled();
        expect(setMockData).toHaveBeenCalled();
    });

    it('should calculate population per region', () => {
        let regions = ({
            europe: 0,  
            americas: 0,
            asia: 0, 
            oceania: 0, 
            africa: 0, 
            polar: 0,
            other: 0
        });
        extractRegions(regions, countries);
        expect(regions).toStrictEqual(expectedRegions);
    });

});