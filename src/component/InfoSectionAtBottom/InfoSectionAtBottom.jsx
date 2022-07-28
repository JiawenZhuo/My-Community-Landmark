import React from "react";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import ActiveComments from "../ActiveComments/ActiveComments";
function InfoSectionAtBottom({
  clickedLatLng,
  setclickedLatLng,
  setAddNote,
  handleSubmit,
  noteInput,
  userInput,
  setUserInput,
  setNoteInput,
  activeComments,
  addNote,
}) {
  return (
    <>
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
          <button onClick={() => setclickedLatLng(null)}>close</button>
          {addNote ? null : (
            <button onClick={() => setAddNote(true)}>add Note</button>
          )}
          {addNote && (
            <AddNoteForm
              handleSubmit={(e) => handleSubmit(e)}
              noteInput={noteInput}
              userInput={userInput}
              setUserInput={setUserInput}
              setNoteInput={setNoteInput}
            />
          )}
          <div style={{ justifyItems: "center" }}>
            <ActiveComments activeComments={activeComments} />
          </div>
        </div>
      )}
    </>
  );
}

export default InfoSectionAtBottom;
