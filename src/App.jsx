import React, { useState } from 'react';
import './App.css';
import CountryData from './resources/countryData.json';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [dataVisible, setDataVisible] = useState(false);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setDataVisible(term.length > 0);
  }

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      console.log("Escape key was pressed");
      setDataVisible(false);
    } else {
      setDataVisible(searchTerm.length > 0);
    }
  }

  const performSearch = (term) => {
    setSearchTerm(term);
    setDataVisible(false);
  }

  const filteredItems = CountryData.filter((item) => {
    const term = searchTerm.toLowerCase();
    const name = item.name.toLowerCase();
    return name.startsWith(term);
  });

  const handleSearchButtonClick = () => {
    performSearch(searchTerm);
    console.log("Escape");
  }

  return (
    <>
      <div className='autocomplete-container'>
         <div className='search-container'>
           <h1>Auto Complete Text Box</h1>
           <input type="text" value={searchTerm} onChange={handleInputChange} onKeyDown={handleEscKey} />
           <button onClick={handleSearchButtonClick}>Search</button>
         </div>
         <div id='autocomplete-results' className='results-display' style={{ display: dataVisible ? 'block' : 'none' }}>
           {filteredItems.length > 0 ? (
             <ul>
               {filteredItems.map((item) => (
                 <li key={item.name} onClick={() => performSearch(item.name)}>
                   {item.name}
                 </li>
               ))}
             </ul>
             ) : ( <p>No matching results</p> )}
         </div>
      </div>
    </>
  )
}


export default App