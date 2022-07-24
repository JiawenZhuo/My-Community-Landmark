import React from 'react'

function AddNoteForm({ handleSubmit, noteInput, userInput, setUserInput, setNoteInput}) {
  return (
        <form onSubmit={handleSubmit}>
          <label>
            note:
            <input type="text" id="note" name="note" value={noteInput}onChange={(e)=>setNoteInput(e.target.value)} required/>
          </label>
          <label>
            username
            <input type="text" id="user" name="user" value={userInput} onChange={(e)=>setUserInput(e.target.value)}  required />
            </label>
          <input type="submit" value="Submit" />
        </form>
    )
}

export default AddNoteForm;