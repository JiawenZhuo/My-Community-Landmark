import { React, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoBox,
} from "@react-google-maps/api";
import InfoBoxComponent from "../InfoBoxComponent/InfoBoxCompoent";
import axios from "axios";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import SearchForm from "../SearchForm/SearchForm";

const containerStyle = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "space-around",
  zIndex: 0,
};


function Map() {
  const [current, setCurrent] = useState(
    navigator.geolocation.getCurrentPosition.coords
  );
  // const noteInput = useRef(null);
  // const userInput = useRef(null);
  const [activeMarkerId, setActiveMarkerId] = useState();
  const [addNote, setAddNote] = useState(false);
  const [clickedLatLng, setclickedLatLng] = useState();
  const [landmarks, setLandmarks] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeComments, setActiveComments] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const base_url = "https://my-community-landmarks.herokuapp.com/api";

  useEffect(() => {
    axios.get(base_url + "/get").then((res) => {
      console.log(res.data.data);
      setLandmarks(res.data.data);
    });
  }, []);

  useEffect(()=>{
    console.log(searchResults);
  },[searchResults]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyAeMFL1pYWS8f1aqpEGZaPNIZBtrPNDlvU",
  });

  const handleClickCurrentMarker = (e) => {
    // console.log(addNote);
    setclickedLatLng(e);

  };
  const handleClickMarker = ( e, id ) => {
    setclickedLatLng(e);
    setActiveMarkerId(id);
    console.log(activeMarkerId);
    axios.get(base_url + `/getComments/${id}`).then((res) => {
      setActiveComments(res.data.message); //This line of code will redirect you once the submission is succeed
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comments = [
      {
        user: userInput,
        comment: noteInput,
      },
    ];
    if(activeComments){
      axios
      .put(base_url + `/update/${activeMarkerId}`, {
        comments: comments,
      })
      .then((res) => {
        console.log(res.data.id);
        console.log(res.data); 
      });
    }else{
    axios
      .post(base_url + "/landmark", {
        lng: clickedLatLng.lng,
        lat: clickedLatLng.lat,
        comments: comments,
      })
      .then((res) => {
        setLandmarks([...landmarks, res.data.landmark])
      });
    }
    setActiveComments(null);
    setAddNote(false);
    setNoteInput(null);
    setUserInput(null);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(base_url + `/searchByText/${searchInput}`).then((res) => {
      console.log("isarray"+Array.isArray(res.data.landmark));
      setSearchResults(res.data.landmark);
    });
  };
  const searchOnChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

  };
  const onClickMap=(e)=>{
    setclickedLatLng(e);
    setActiveComments(null);
    setAddNote(false)
  }
  const testIfBelongResult=(landmark)=>{
    if(searchResults === null) return false;
    for(const result of searchResults){
      if(result._id === landmark._id){
        return true;
      }
    }
    return false;
  }
  const SearchResultMarker=({landmark})=>{
    return(
    <Marker
    icon={{
    path:
      "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
    fillColor: "#0000ff",
    fillOpacity: 1.0,
    strokeWeight: 0,
    scale: 1.25
    }}
    key={landmark._id}
    position={{ lat: landmark.lat, lng: landmark.lng }}
    onClick={(e) => handleClickMarker(e.latLng.toJSON(), landmark._id)}
  ></Marker>
  )}

  const SavedMarker=({landmark})=>{
    return(
    <Marker
    key={landmark._id}
    position={{ lat: landmark.lat, lng: landmark.lng }}
    onClick={(e) => handleClickMarker(e.latLng.toJSON(), landmark._id)}
  ></Marker> 
  )}

  const renderMap = () => {

    return (
      <>
        <SearchForm
          handleSearch={(e) => handleSearch(e)}
          searchOnChange={searchOnChange}
          searchInput={searchInput}
          setSearchResults ={setSearchResults}
          style={{
            position: "absolute",
            zIndex: 100,
            width: "100%", // or you can use width: '100vw'
            height: "20%",
            top: 10,
            left: 0,
            backgroundColor: "white", // or you can use height: '100vh'
          }}
        />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={current}
          zoom={10}
          onClick={(e) => onClickMap(e.latLng.toJSON())}
        >
          {
            <>
              <Marker
                key={current}
                position={current}
                onClick={(e) => handleClickCurrentMarker(e.latLng.toJSON())}
                >
                <InfoBoxComponent position={current}/>
              </Marker>
              {clickedLatLng && (
                <Marker position={clickedLatLng}/>
              )}
              {landmarks && landmarks.map((landmark) => {
                return(
                  testIfBelongResult(landmark) ? <SearchResultMarker landmark={landmark}/> : <SavedMarker landmark={landmark}/>
                )}
              )}
            </>
          }
        </GoogleMap>
        {clickedLatLng && (
          <div
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
            <div>
              {"lat " + clickedLatLng.lat}
              {"lng " + clickedLatLng.lng}
            </div>
            <button onClick={() => setclickedLatLng(null)} >close</button>
            <button onClick={() => setAddNote(true)}>add Note</button>
            {addNote && (
              <AddNoteForm
                handleSubmit={(e)=>handleSubmit(e)}
                noteInput={noteInput}
                userInput={userInput}
                setUserInput={setUserInput}
                setNoteInput={setNoteInput}
              />
            )}

            {
            activeComments &&
              activeComments.map((comment) => {
                return (
                  <>
                    <div style={{ width: "100%" }} key={comment._id}>
                      <span>{`${comment.comment} by ${comment.user}`}</span>
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default Map;
