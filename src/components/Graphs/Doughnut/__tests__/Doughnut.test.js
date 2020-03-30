import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Doughnut from '../Doughnut';
Enzyme.configure({adapter: new Adapter()});

describe('Doughnut', () => {
    let spyUseState;
    let spyUseEffect;
    let mockSetData;
    let mockSetDoughnutData;

    beforeEach(() => {
        mockSetData = jest.fn();
        mockSetDoughnutData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, mockSetData])
            .mockImplementationOnce(() => [{}, mockSetDoughnutData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    });

    it('should call useState and useEffect', () => {
        mount(<Doughnut />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
        expect(mockSetData).toHaveBeenCalled();
        expect(mockSetDoughnutData).toHaveBeenCalled();
    });
});