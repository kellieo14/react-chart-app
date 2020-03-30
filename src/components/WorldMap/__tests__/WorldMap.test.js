import React from 'react';
import TestRenderer from 'react-test-renderer';
import WorldMap from '../WorldMap';


describe('WorldMap', () => {
    it('should match snapshot', () => {
        const testRenderer = TestRenderer.create(<WorldMap />);
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});