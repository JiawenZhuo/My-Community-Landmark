import {React,useState, useEffect, useRef} from 'react'
import { GoogleMap, Marker , useLoadScript, InfoBox} from '@react-google-maps/api';
import InfoBoxComponent from '../InfoBoxComponent/InfoBoxCompoent';
import styled from 'styled-components';


const containerStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-around',
  zIndex: 0
}

function Map() {
  const [current, setCurrent] = useState(navigator.geolocation.getCurrentPosition.coords);
  const noteInput = useRef(null);
  const [activeMarker, setActiveMarker] = useState({});
  const [addNote, setAddNote] = useState(false);
  const [clickedLatLng, setclickedLatLng] = useState(false);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      setCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    })
  },[])

  const places = [
    { id: "1", pos: { lat: 39.09366509575983, lng: -94.58751660204751 },  },
    { id: "2", pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
    { id: "3", pos: { lat: 39.07602397235644, lng: -94.5184089401211 } }
  ];

  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyAeMFL1pYWS8f1aqpEGZaPNIZBtrPNDlvU"
  });

  const handleClickMarker = ({position})=> {
    // console.log(addNote);
    if(activeMarker === current){
      setActiveMarker(null);
      return;
    }
    setActiveMarker(current);
    setAddNote(true);
    console.log(addNote);
  }

  const handleSubmit=(e)=> {
    alert('A name was submitted: ' + noteInput.current);
    setAddNote(false);
    // setNote(null);
    console.log(noteInput.current)
    e.preventDefault();
  }

  const AddNoteInput = ()=>{
    return(
      <form onSubmit={handleSubmit}>
      <label>
        note:
        <input type="text" ref={noteInput}/>
      </label>
      <input type="submit" value="Submit" />
      </form>
    )
  }

  const renderMap = () =>{

    return(
      <>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={current}
        zoom={10}
        onClick={(e)=>setclickedLatLng(e.latLng.toJSON())}
        onResize = {() => setclickedLatLng(null)}
        >
        {(
          <>
            <Marker position={current} onClick={()=>handleClickMarker({current})}>
           
            {activeMarker && <InfoBoxComponent position={current}/> }
        
            </Marker>
            {clickedLatLng && <Marker position={clickedLatLng} onClick={()=>handleClickMarker()}/>}
          </>
        )}
        </GoogleMap>
        {
           clickedLatLng && <div
           style={{
             position: "absolute",
             zIndex: 0,
             width: "100%", // or you can use width: '100vw'
             height: "10%",
             bottom: 0,
             left: 0,
             backgroundColor: "white", // or you can use height: '100vh'
           }}
         >
          <button onClick={() => setclickedLatLng(null)}>close</button>
          <button onClick={()=> setAddNote(true)}>add Note</button>
          { addNote && <AddNoteInput />}
         </div>
        }
      </>
    )
  }

  return isLoaded ? renderMap() : null;
}

export default Map;