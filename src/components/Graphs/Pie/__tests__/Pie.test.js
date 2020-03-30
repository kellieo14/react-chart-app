import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pie from '../Pie';
Enzyme.configure({adapter: new Adapter()});

describe('Pie', () => {
    let spyUseState;
    let spyUseEffect;
    let setMockData;
    let setMockDoughnutData;

    beforeEach(() => {
        setMockData = jest.fn();
        setMockDoughnutData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, setMockData])
            .mockImplementationOnce(() => [{}, setMockDoughnutData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    });

    it('should call useState and useEffect', () => {
        mount(<Pie />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
        expect(setMockData).toHaveBeenCalled();
        expect(setMockDoughnutData).toHaveBeenCalled();
    });
});