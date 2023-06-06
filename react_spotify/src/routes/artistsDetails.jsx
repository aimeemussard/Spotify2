import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navbar";

export default function ArtistsDetails() { 
    const [albums, setAlbums] = useState([]);
    const location = useLocation();

    const fetchData = () => {
      return fetch("http://localhost:8000" + location.pathname )
            .then((response) => response.json())
            .then((data) => setAlbums(data));
    }
  
    useEffect(() => {
      fetchData();
    }, [location.pathname])
  
    return (
        <>
            <Navbar/>
            <main className="artists-main-container">
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
            </main>
        </>
    ); 
  }