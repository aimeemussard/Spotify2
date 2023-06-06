import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navbar";

export default function AlbumsDetails() { 
    const [data, setData] = useState([]);
    const location = useLocation();

    const fetchData = () => {
      return fetch("http://localhost:8000" + location.pathname )
            .then((response) => response.json())
            .then((data) => setData(data));
    }
  
    useEffect(() => {
      fetchData();
    }, [location.pathname])
  
    return (
        <>
            <Navbar/>
            {data ? (
                <>
                    <Album album={data.album} />
                    {data.tracks && data.tracks.map((track) => (
                        <Track track={track} />
                    ))}
                </>
            ): null}
        </>
      
    ); 
  }

function Album({ album }) {
    if (!album) return null;

    return (
        <>
            <div className="artistHeading">
                <img id={"album-cover-" + album.id} src={album.cover_small} alt={album.name} className="artistPicture"/>
                <div>
                    <Link to={`/albums/` + album.id} id={"album-name-" + album.id} className="artistTitle" >{album.name}</Link>
                    <p id={"popularity-" + album.id} className="artistDesc"> Popularity : {album.popularity}</p>
                    <h5 id={"release_date-" + album.id} className="release-date">Release date: <span>{new Date(album.release_date * 1000).toDateString()}</span></h5>
                </div>
            </div>
            <hr></hr>
            <p id={"description-" + album.id} className="artistDesc">{album.description}</p>
        </>
    )
}

function Track({ track }) {
    return (
        <>
            {track.id}
            {track.name}
        </>
    );
}