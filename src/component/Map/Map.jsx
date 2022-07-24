import {React,useState, useEffect, useRef} from 'react';
import { GoogleMap, Marker , useLoadScript, InfoBox} from '@react-google-maps/api';
import InfoBoxComponent from '../InfoBoxComponent/InfoBoxCompoent';
import axios from 'axios';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
import SearchForm from '../SearchForm/SearchForm';

const containerStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'space-around',
  zIndex: 0
}



function Map() {
  const [current, setCurrent] = useState(navigator.geolocation.getCurrentPosition.coords);
  // const noteInput = useRef(null);
  // const userInput = useRef(null);
  const [activeMarker, setActiveMarker] = useState();
  const [addNote, setAddNote] = useState(false);
  const [clickedLatLng, setclickedLatLng] = useState();
  const [landmarks, setLandmarks] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeComments, setActiveComments] = useState([]);
  const [searchResult, setSearchResult] = useState();

  useEffect(()=>{
    axios.get('http://localhost:8000/api/get').then(res => {
      console.log(res.data.data);
      setLandmarks(res.data.data);
   })
  },[]);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position => {
      setCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    })
  },[])

  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyAeMFL1pYWS8f1aqpEGZaPNIZBtrPNDlvU"
  });

  const handleClickCurrentMarker = ()=> {
    // console.log(addNote);
    if(activeMarker === current){
      setActiveMarker(null);
      return;
    }
    setActiveMarker(current);
    setAddNote(true);
    console.log(addNote);
  }
  const handleClickMarker=(id)=>{
    axios.get(`http://localhost:8000/api/getComments/${id}`)
    .then(res=>{
      console.log(res);
      console.log(`http://localhost:8000/api/getComments/${id}`);
      setActiveComments(res.data.message);//This line of code will redirect you once the submission is succeed
    })
  }

  const handleSubmit=()=> {
    // e.preventDefault();
    alert('submitted: ' + noteInput);
    const comments = [{
        user: userInput,
        comment: noteInput
    }]
    setAddNote(false);
    axios.post('http://localhost:8000/api/landmark', {lng:clickedLatLng.lng, lat: clickedLatLng.lat, comments: comments})
    .then(res=>{
      console.log(res.data.id);
      console.log(res.data);//This line of code will redirect you once the submission is succeed
    })
  }
  const handleSearch=(e)=>{
    e.preventDefault()
    axios.get(`http://localhost:8000/api/searchByText/${searchInput}`)
    .then(res=>{
      console.log("res"+res.data.landmark);
      setSearchResult(res.data.message)//This line of code will redirect you once the submission is succeed
    })
  }
  const searchOnChange=(e)=>{
    e.preventDefault()
    setSearchInput(e.target.value);
  }

  const renderMap = () =>{
    console.log(searchResult);
    return(
      <>
        <SearchForm handleSearch={(e)=>handleSearch(e)} searchOnChange={searchOnChange} searchInput={searchInput} style={{zIndex:100}}/>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={current}
        zoom={10}
        onClick={(e)=>setclickedLatLng(e.latLng.toJSON())}
        onResize = {() => setclickedLatLng(null)}
        >
        {
          <>
            <Marker position={current} onClick={()=>handleClickCurrentMarker({current})}>
           
            {activeMarker && <InfoBoxComponent position={current}/> }
        
            </Marker>
            {clickedLatLng && <Marker position={clickedLatLng} onClick={()=>setActiveComments(null)} />}
            { 
            landmarks.map(landmark => <Marker key={landmark.id} position={{lat:landmark.lat,lng: landmark.lng}} onClick={(e)=>handleClickMarker(landmark._id)}></Marker>)
            }
          </>
        }
        </GoogleMap>
        {
           clickedLatLng && <div
           style={{
             position: "absolute",
             zIndex: 0,
             width: "100%", // or you can use width: '100vw'
             height: "20%",
             bottom: 0,
             left: 0,
             backgroundColor: "white", // or you can use height: '100vh'
           }}
         >
           <div>{"lat "+clickedLatLng.lat}{"lng "+clickedLatLng.lng}</div>
          <button onClick={() => setclickedLatLng(null)}>close</button>
          <button onClick={()=> setAddNote(true)}>add Note</button>
          { addNote && <AddNoteForm  handleSubmit = {handleSubmit}noteInput={noteInput} userInput={userInput} setUserInput={setUserInput} setNoteInput={setNoteInput}/>}
          { 
            activeComments && activeComments.map((comment) => {
              return (
                    <>
                      <div style={{width: "100%"}} key={comment._id}>
                      <span>{comment.comment}</span>
                      By 
                      <span>{comment.user}</span>
                      </div>
                    </>
              )
            })
          }
         </div>
        }
      </>
    )
  }

  return isLoaded ? renderMap() : null;
}

export default Map;