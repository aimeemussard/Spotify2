import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import Pagination from '../paginate';

//const paginationCount = [50, 100, 150];

export default function AlbumsListing() { 
  const [albums, setAlbums] = useState([]);
  const [count, setCount] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCount = () => {
    return fetch("http://localhost:8000/albums")
          .then((response) => response.json())
          .then((data) => setCount(data.length));
  }

  const fetchData = () => {
    return fetch("http://localhost:8000/albums?page=" + currentPage + "&limit=" + resultsPerPage)
          .then((response) => response.json())
          .then((data) => setAlbums(data));
  }

  useEffect(() => {
    fetchCount();
  }, [])

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <>
      <Navbar/>
      <main className="artists-main-container">
          <div className="select-pagination">
              <label>AFFICHER :</label>
              <select onChange={e => setResultsPerPage(e.target.value)}>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="150">150</option>
              </select>
          </div>
          {albums && albums.length > 0 && albums.map((albumsObj, index) => (
              <div key={"div-" + index} id={"div-" + index} className="artist-container">
                  <div className="artistHeading">
                      <img id={"album-cover-" + albumsObj.id} src={albumsObj.cover_small} alt={albumsObj.name} className="artistPicture"/>
                      <div>
                          <Link to={`/albums/` + albumsObj.id} id={"album-name-" + albumsObj.id} className="artistTitle" >{albumsObj.name}</Link>
                          <p id={"popularity-" + albumsObj.id} className="artistDesc"> Popularity : {albumsObj.popularity}</p>
                          <h5 id={"release_date-" + albumsObj.id} className="release-date">Release date: <span>{new Date(albumsObj.release_date * 1000).toDateString()}</span></h5>
                      </div>
                  </div>
                  <hr></hr>
                  <p id={"description-" + albumsObj.id} className="artistDesc">{albumsObj.description}</p>
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