import React from 'react';
import { Link } from "react-router-dom";

export const routes = {
    home: '/',
    search: 'search',
    artists: 'artists',
    albums: 'albums',
    genre: 'genre'
}

export default function Navbar (){
    return (
        <header>
            <nav className="navbar">
                <Link to={routes.home} className="navbar-button">Accueil</Link>
                <Link to={`/search`} className="navbar-button">Recherche</Link>
                <Link to={`/artists`} className="navbar-button">Artistes</Link>
                <Link to={`/albums`} className="navbar-button">Albums</Link>
                <Link to={`/genre`} className="navbar-button">Genre</Link>
            </nav>
        </header>
    );
};
