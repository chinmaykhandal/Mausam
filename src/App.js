import React from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';
import Container from 'react-bootstrap/Container'
function App() {
  return (
    <div>
    <Container> 
    <div className="App">
      <WeatherApp />
    </div>
    </Container>
    </div>
  );
}

export default App;
