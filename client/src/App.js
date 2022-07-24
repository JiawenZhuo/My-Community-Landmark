
import {React, useEffect} from "react";
import './App.css';
// import Login from './component/Login/Login';
// import LogoutButton from './component/LogoutButton/LogoutButton';
import Map from './component/Map/Map';

function App() {

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      // Show a map centered at latitude / longitude.
    })
  },[])


  return (
    <div className="App">
        <Map />

   
        {/* <Login /> */}
        {/* <LogoutButton /> */}
    </div>
  );
}

export default App;
