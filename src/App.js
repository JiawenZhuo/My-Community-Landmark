
import {React, useEffect} from "react";
import './App.css';
// import Login from './component/Login/Login';
// import LogoutButton from './component/LogoutButton/LogoutButton';
import Map from './component/Map/Map';
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive";

function App() {


  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      // Show a map centered at latitude / longitude.
    })
  },[])


  return (
    
    <>
    {isMobile? 
      <div className="App">
        <Map />
     </div> : <div className="App">
        <Map />
     </div>
        }
    </>
  
  );
}

export default App;
