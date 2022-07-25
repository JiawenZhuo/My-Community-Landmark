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
  const [activeMarker, setActiveMarker] = useState();
  const [addNote, setAddNote] = useState(false);
  const [clickedLatLng, setclickedLatLng] = useState();
  const [landmarks, setLandmarks] = useState([]);
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

  const handleClickCurrentMarker = () => {
    // console.log(addNote);
    if (activeMarker === current) {
      setActiveMarker(null);
      return;
    }
    setActiveMarker(current);
    setAddNote(true);
    console.log(addNote);
  };
  const handleClickMarker = ( e, id ) => {
    console.log(e);
    setclickedLatLng(e);
    axios.get(base_url + `/getComments/${id}`).then((res) => {
      setActiveComments(res.data.message); //This line of code will redirect you once the submission is succeed
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted: " + noteInput);
    const comments = [
      {
        user: userInput,
        comment: noteInput,
      },
    ];
    // setAddNote(false);
    axios
      .post(base_url + "/landmark", {
        lng: clickedLatLng.lng,
        lat: clickedLatLng.lat,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data.id);
        console.log(res.data); 
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(base_url + `/searchByText/${searchInput}`).then((res) => {
      console.log("res" + JSON.stringify(res.data.landmark));
      setSearchResults(JSON.stringify(res.data.landmark));
    });
  };
  const searchOnChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const onClickMap=(e)=>{
    setclickedLatLng(e);
    setActiveComments(null);
  }
  const renderMap = () => {
    console.log(searchResults);
    return (
      <>
        <SearchForm
          handleSearch={(e) => handleSearch(e)}
          searchOnChange={searchOnChange}
          searchInput={searchInput}
          style={{ zIndex: 100 }}
          setSearchResults ={setSearchResults}
        />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={current}
          zoom={10}
          onClick={(e) => onClickMap(e.latLng.toJSON())}
          onMouseMove={() => setActiveComments(null)}
        >
          {
            <>
              <Marker
                position={current}
                onClick={() => handleClickCurrentMarker({ current })}
              >
                {activeMarker && <InfoBoxComponent position={current} />}
              </Marker>
              {clickedLatLng && (
                <Marker  position={clickedLatLng}
                />
              )}
              {landmarks.map((landmark) => (
                <Marker
                  key={landmark._id}
                  position={{ lat: landmark.lat, lng: landmark.lng }}
                  onClick={(e) => handleClickMarker(e.latLng.toJSON(), landmark._id)}
                ></Marker>
              ))}
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
            {clickedLatLng && (
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
              {
                searchResults && searchResults.map((searchResult)=>{
                    return (
                      <div>searchResult._id</div>
                    )
                })
              }
          </div>
        )}
      </>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default Map;
