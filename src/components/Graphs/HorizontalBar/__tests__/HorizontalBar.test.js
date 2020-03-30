import React from 'react';
import * as reactHooks from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HorizontalBar from '../HorizontalBar';
Enzyme.configure({adapter: new Adapter()});

describe('HorizontalBar', () => {
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
        mount(<HorizontalBar />);
        expect(spyUseState).toHaveBeenCalled();
        expect(spyUseEffect).toHaveBeenCalled();
        expect(setMockData).toHaveBeenCalled();
    });

});