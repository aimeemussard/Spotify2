import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

export default function Search() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    Promise.all([
      fetch(`http://localhost:8000/artists?search=${searchTerm}`).then(response => response.json()),
      fetch(`http://localhost:8000/albums?search=${searchTerm}`).then(response => response.json())
    ]).then(([artistsData, albumsData]) => {
      setArtists(artistsData);
      setAlbums(albumsData);
    });
  };

  // Debounce
  const handleChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <main className="search-main-container">
        <div>
          <input type="text" placeholder="Rechercher..." onChange={handleChange} />
        </div>

        <h2>Artistes</h2>
        <div className="artists-container">
          {artists &&
            artists
              .filter((artistObj) => {if (searchTerm === "") {return null;} else if (artistObj.name.toLowerCase().includes(searchTerm.toLowerCase())) {return artistObj;}return null;}).sort((a, b) => a.name.localeCompare(b.name)).map((artistObj, index) => (
                <div key={"div-" + index} id={"div-" + index} className="artist-container">
                    <div className="artistHeading">
                        <img id={"picture-" + artistObj.id} src={artistObj.photo} alt={artistObj.name} className="artistPicture" />
                        <div>
                            <Link to={`/albums/artist/${artistObj.id}`} id={"artist-" + artistObj.id} className="artistTitle">{artistObj.name}</Link>
                            <h3 id={"description-" + artistObj.id} className="artistDesc">{artistObj.description}</h3>
                        </div>
                    </div>
                    <hr></hr>
                    <p id={"bio-" + artistObj.id} className="artistBio">
                        {artistObj.bio}
                    </p>
                </div>
              ))}
        </div>

        <h2>Albums</h2>
        <div className="artists-container">
            {albums && albums.filter((albumObj) => {if (searchTerm === "") {return null;} else if (albumObj.name.toLowerCase().includes(searchTerm.toLowerCase())) {return albumObj;}return null;}).sort((a, b) => a.name.localeCompare(b.name)).map((albumObj, index) => (
                <div key={"div-" + index} id={"div-" + index} className="artist-container">
                <div className="artistHeading">
                    <img id={"album-cover-" + albumObj.id} src={albumObj.cover_small} alt={albumObj.name} className="artistPicture"/>
                    <div>
                        <Link to={`/albums/` + albumObj.id} id={"album-name-" + albumObj.id} className="artistTitle" >{albumObj.name}</Link>
                        <p id={"popularity-" + albumObj.id} className="artistDesc"> Popularity : {albumObj.popularity}</p>
                        <h5 id={"release_date-" + albumObj.id} className="release-date">Release date: <span>{new Date(albumObj.release_date * 1000).toDateString()}</span></h5>
                    </div>
                </div>
                <hr></hr>
                <p id={"description-" + albumObj.id} className="artistDesc">{albumObj.description}</p>
            </div>
            ))}
        </div>
      </main>
    </>
  );
}
