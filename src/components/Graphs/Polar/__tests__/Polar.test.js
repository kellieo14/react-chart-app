import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Polar from '../Polar';
Enzyme.configure({adapter: new Adapter()});

describe('Polar', () => {
    let spyUseState;
    let spyUseEffect;
    let setMockData;

    beforeEach(() => {
        setMockData = jest.fn();
        spyUseState = jest.spyOn(reactHooks, 'useState')
            .mockImplementationOnce(() => [{}, setMockData]);
        spyUseEffect = jest.spyOn(reactHooks, 'useEffect');
    });

    it('should call useState and useEffect', () => {
        mount(<Polar />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
        expect(setMockData).toHaveBeenCalled();
    });
});
