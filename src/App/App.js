import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountriesPerContinent from "../components/CountriesPerContinent/CountriesPerContinent";
import PopulationPerContinent from '../components/PopulationPerContinent/PopulationPerContinent';
import PopulationPerCountry from '../components/PopulationPerCountry/PopulationPerCountry';
import LanguageByCountry from '../components/LanguageByCountry/LanguageByCountry';
import LanguageByPopulation from '../components/LanguageByPopulation/LanguageByPopulation';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WorldMap from '../components/WorldMap/WorldMap';
import Density from '../components/Density/Density';
import { getCountries } from '../redux/actions/actions';

import './App.css';

const App = () => {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Row className='title-container'>
          <h1>World Data</h1>
          <WorldMap />
        </Row>
        <div className='charts'>
          <Row className='pie-row'>
            <Col lg={6}>
              <CountriesPerContinent countries={countries} />
            </Col>
            <Col lg={6}>
              <PopulationPerContinent countries={countries} />
            </Col>
          </Row>
          <Row className='chart-rows'>
            <Col lg={6}>
              <LanguageByPopulation countries={countries} />
            </Col>
            <Col lg={6}>
              <LanguageByCountry countries={countries} />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <PopulationPerCountry countries={countries} />
            </Col>
            <Col className='densityRow' lg={6}>
              <Density countries={countries} />
            </Col>
          </Row>
        </div>

      </Container>
    </div>
  );
}

export default App;
