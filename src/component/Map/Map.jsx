import {React,useState, useEffect} from 'react'
import { GoogleMap, Marker , useLoadScript} from '@react-google-maps/api';



function Map() {
  const [current, setCurrent] = useState(null);
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      setCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    });
    })
  },[])

  const markerClickHandler = () =>{

  }

  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyAeMFL1pYWS8f1aqpEGZaPNIZBtrPNDlvU"
  });

  const renderMap = () =>{
    return(
      <>
        <GoogleMap
        mapContainerStyle={{
        height: "400px",
        width: "400px"
        }}
        center={current}
        zoom={10}
        >
        <Marker position= {current} onClick={()=>markerClickHandler()}/>

        
      </GoogleMap>
      <button>Add note To current</button>
      </>
    )
  }

  return isLoaded ? renderMap : null;
}

export default Map;