import logo from './logo.svg';
import prevIcon from './assets/arrow-left.svg';
import prevRight from './assets/arrow-left.svg';
import './App.css';
import Carousel from './components/Carousel';
import React, { useEffect } from 'react';
function App() {
  const [list, setList] = React.useState([]);
  useEffect(() => {
    fetch("https://frontend-assessment-service.vcomm.io?data")
    .then(response => response.json())
    .then(data => setList(data.data))
  }, [])
  return (
    <div className="App">
      <Carousel data = {list}/>
    </div>
  );
}

export default App;
