import React from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App.js';
import apiData from '../../components/ApiData'

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../components/ApiData', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('App', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<App />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should call api', () => {
        shallow(<App />);
        expect(apiData).toHaveBeenCalledTimes(1);
    });
});