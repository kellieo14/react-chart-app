import React from 'react';
import CountriesPerContinent from "../components/CountriesPerContinent/CountriesPerContinent";
import ApiData from '../components/ApiData';
import PopulationPerContinent from '../components/PopulationPerContinent/PopulationPerContinent';
import PopulationPerCountry from '../components/PopulationPerCountry/PopulationPerCountry';
import LanguageByCountry from '../components/LanguageByCountry/LanguageByCountry';
import LanguageByPopulation from '../components/LanguageByPopulation/LanguageByPopulation';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WorldMap from '../components/WorldMap/WorldMap';
import Density from '../components/Density/Density';

import './App.css';

const App = () => {
  const countries = ApiData(`https://restcountries.eu/rest/v2/all`);
  return (
    <div className="App">
      {(JSON.stringify(countries) !== '{}') && 
      <Container>
        <Row>
          <WorldMap />
        </Row>
        <Row className='pieRow'>
          <Col lg={6}>
            <CountriesPerContinent countries={countries} />
          </Col>
          <Col lg={6}>
            <PopulationPerContinent countries={countries} />
          </Col>
        </Row>
        <Row className='chartRows'>
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
      </Container>
      }
    </div>
  );
}

export default App;
