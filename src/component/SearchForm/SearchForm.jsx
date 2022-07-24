import React from 'react'

function SearchForm({handleSearch,searchOnChange,searchInput}) {
  return (
    <form onSubmit={handleSearch}>
    <label>
      search:
      <input type="text" id="note" name="note" value={searchInput} onChange={(e)=>searchOnChange(e)} required/>
    </label>
    <input type="submit" value="Search" />
    </form>
  )
}

export default SearchForm;