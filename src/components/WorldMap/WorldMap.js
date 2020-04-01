import React from 'react';
import worldMapImg from '../../images/worldMap.png';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './WorldMap.css';

function WorldMap() {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <img alt='world map' className='map' src={worldMapImg}></img>
        </Col>
      </Row>
    </Container>
  );
}

export default WorldMap;