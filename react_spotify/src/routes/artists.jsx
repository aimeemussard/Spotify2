import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import Pagination from '../paginate';

export default function ArtistsListing() { 
  const [artists, setArtists] = useState([]);
  const [count, setCount] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = () => {
    return fetch("http://localhost:8000/artists?page=" + currentPage + "&limit=" + resultsPerPage)
          .then((response) => response.json())
          .then((data) => setArtists(data));
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, resultsPerPage])

  const previous = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if(currentPage !== Math.ceil(count / resultsPerPage)){
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  return (
    <>
        <Navbar/>
        <main className="artists-main-container">
        <div className="select-pagination">
            <label>AFFICHER : </label>
            <select onChange={e => setResultsPerPage(e.target.value)}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            </select>
        </div>
        {artists && artists.length > 0 && artists.map((artistObj, index) => (
            <div key={"div-" + index} id={"div-" + index} className="artist-container">
            <div className="artistHeading">
                <img id={"picture-" + artistObj.id} src={artistObj.photo} alt={artistObj.name} className="artistPicture"/>
                <div>
                <Link to={`/albums/artist/` + artistObj.id} id={"artist-" + artistObj.id} className="artistTitle">{artistObj.name}</Link>
                <h3 id={"description-" + artistObj.id} className="artistDesc">{artistObj.description}</h3>
                </div>
            </div>
            <hr></hr>
            <p id={"bio-" + artistObj.id} className="artistBio">{artistObj.bio}</p>
            </div>
        ))}
        <Pagination
            resultsPerPage={resultsPerPage}
            totalResults={count}
            paginate={paginate}
            previous={previous}
            next={next}
        />
        </main>
    </>
    
  ); 
}