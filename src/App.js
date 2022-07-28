
import {React, useEffect} from "react";
import './App.css';
import Map from './component/Map/Map';

function App() {
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      // Show a map centered at latitude / longitude.
    })
  },[])

  const appstyle={
    width: "70vw",
    height: "70vh",
    display: "inline-block",
  }

  return (
  
    <>
      <div style={appstyle}>
        <Map/>
     </div> 
    </>
  );
}

export default App;
