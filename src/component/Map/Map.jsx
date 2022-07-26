import { React, useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import InfoBoxComponent from "../InfoBoxComponent/InfoBoxCompoent";
import axios from "axios";
import SearchForm from "../SearchForm/SearchForm";
import SearchResultMarker from "../SearchResultMarker/SearchResultMarker";
import InfoSectionAtBottom from "../InfoSectionAtBottom/InfoSectionAtBottom";
const wrapper = {
  // maxHeight: "100vh",
  textAlign: "center",
};

const googleMapStyle = {
  position: "absolute",
  top: "30px",
  right: "0px",
  bottom: "0px",
  left: "0px",
  zIndex: 0,
  margin: "0 80px",
  overflow: "hidden",
};

const InfoSectionAtBottomStyle = {
  position: "absolute",
  zIndex: 100,
  width: "100%",
  height: "50px",
  left: "0px",
  bottom: "0px",
};

const searchForm = {
  position: "absolute",
  left: "0px",
  top: "0px",
  width: "70vm",
  height: "10px",
  zIndex: 100,
};

function Map() {
  const [current, setCurrent] = useState(
    navigator.geolocation.getCurrentPosition.coords
  );
  const [activeMarkerId, setActiveMarkerId] = useState();
  const [addNote, setAddNote] = useState(false);
  const [clickedLatLng, setclickedLatLng] = useState();
  const [landmarks, setLandmarks] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeComments, setActiveComments] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const base_url = "https://my-community-landmark-backend.herokuapp.com/api/";

  useEffect(() => {
    axios.get(base_url + "/get").then((res) => {
      setLandmarks(res.data.data);
    });
  }, []);

  useEffect(() => {}, [searchResults, activeComments]);

  useEffect(() => {
    let currenttLocation = navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrent({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAeMFL1pYWS8f1aqpEGZaPNIZBtrPNDlvU",
  });

  const handleClickCurrentMarker = (e) => {
    setclickedLatLng(e);
  };

  const onClickMap = (e) => {
    setclickedLatLng(e);
    setActiveComments(null);
    setAddNote(false);
  };
  const testIfBelongResult = (landmark) => {
    if (searchResults === null) return false;
    for (const result of searchResults) {
      if (result._id === landmark._id) {
        return true;
      }
    }
    return false;
  };

  const SavedMarker = ({ landmark }) => {
    return (
      <Marker
        key={landmark._id}
        position={{ lat: landmark.lat, lng: landmark.lng }}
        onClick={(e) => handleClickMarker(e.latLng.toJSON(), landmark._id)}
      ></Marker>
    );
  };

  const handleClickMarker = (e, id) => {
    setclickedLatLng(e);
    setActiveMarkerId(id);
    axios.get(base_url + `/getComments/${id}`).then((res) => {
      setActiveComments(res.data.message);
    });
  };

  const renderMap = () => {
    const handleSearch = (e) => {
      e.preventDefault();
      axios.get(base_url + `/searchByText/${searchInput}`).then((res) => {
        setSearchResults(res.data.landmark);
      });
    };
    const searchOnChange = (e) => {
      setSearchInput(e.target.value);
      e.preventDefault();
    };
    const handleSubmit = (e) => {
      e.preventDefault();

      const comments = [
        {
          user: userInput,
          comment: noteInput,
        },
      ];

      if (activeComments) {
        axios
          .put(base_url + `/update/${activeMarkerId}`, {
            comments: comments,
          })
          .then((res) => {
            setActiveComments(comments);
            console.log(res.data);
          });
      } else {
        axios
          .post(base_url + "/landmark", {
            lng: clickedLatLng.lng,
            lat: clickedLatLng.lat,
            comments: comments,
          })
          .then((res) => {
            setLandmarks([...landmarks, res.data.landmark]);
            setActiveComments(comments);
          });
      }

      setAddNote(false);
      setNoteInput(null);
      setUserInput(null);
    };

    return (
      <>
        <div style={wrapper}>
          <SearchForm
            handleSearch={(e) => handleSearch(e)}
            searchOnChange={searchOnChange}
            searchInput={searchInput}
            setSearchResults={setSearchResults}
            style={searchForm}
          />
          <div style={{ padding: "70px" }}>
            <GoogleMap
              mapContainerStyle={googleMapStyle}
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
                    <InfoBoxComponent position={current} />
                  </Marker>
                  {clickedLatLng && <Marker position={clickedLatLng} />}
                  {landmarks &&
                    landmarks.map((landmark) => {
                      return testIfBelongResult(landmark) ? (
                        <SearchResultMarker
                          landmark={landmark}
                          setclickedLatLng={setclickedLatLng}
                          setActiveMarkerId={setActiveMarkerId}
                          setActiveComments={setActiveComments}
                        />
                      ) : (
                        <SavedMarker landmark={landmark} />
                      );
                    })}
                </>
              }
            </GoogleMap>
          </div>
          <InfoSectionAtBottom
            style={InfoSectionAtBottomStyle}
            clickedLatLng={clickedLatLng}
            setclickedLatLng={setclickedLatLng}
            setAddNote={setAddNote}
            handleSubmit={handleSubmit}
            noteInput={noteInput}
            userInput={userInput}
            setUserInput={setUserInput}
            setNoteInput={setNoteInput}
            activeComments={activeComments}
            addNote={addNote}
          />
        </div>
      </>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default Map;
