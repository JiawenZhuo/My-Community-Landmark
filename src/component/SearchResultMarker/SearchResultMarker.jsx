import React from "react";
import { Marker } from "@react-google-maps/api";
import axios from "axios";

function SearchResultMarker({
  landmark,
  setclickedLatLng,
  setActiveMarkerId,
  setActiveComments,
}) {
  const handleClickMarker = (e, id) => {
    setclickedLatLng(e);
    setActiveMarkerId(id);
    axios.get(base_url + `/getComments/${id}`).then((res) => {
      setActiveComments(res.data.message);
    });
  };
  const base_url = "https://my-community-landmark-backend.herokuapp.com/api/";
  return (
    <Marker
      icon={{
        path: "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
        fillColor: "#0000ff",
        fillOpacity: 1.0,
        strokeWeight: 0,
        scale: 1.25,
      }}
      key={landmark._id}
      position={{ lat: landmark.lat, lng: landmark.lng }}
      onClick={(e) => handleClickMarker(e.latLng.toJSON(), landmark._id)}
    ></Marker>
  );
}

export default SearchResultMarker;
