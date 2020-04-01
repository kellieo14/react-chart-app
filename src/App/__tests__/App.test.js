import React from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import App from '../App.js';


Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<Provider store={store}><App /></Provider>);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

});