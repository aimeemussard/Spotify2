import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./routes/home";
import Search from './routes/search';
import ArtistsListing from './routes/artists';
import AlbumsListing from './routes/albums';
import GenresListing from './routes/genre';
import AlbumsDetails from './routes/albumsDetails';
import ArtistsDetails from './routes/artistsDetails';
import GenresDetails from './routes/genreDetails';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "artists",
    element: <ArtistsListing />,
  },
  {
    path: "albums",
    element: <AlbumsListing />,
  },
  {
    path: "genre",
    element: <GenresListing />,
  },
  {
    path: "albums/:albumId",
    element: <AlbumsDetails />,
  },
  {
    path: "genres/:genreId",
    element: <GenresDetails />,
  },
  {
    path: "albums/artist/:artistId",
    element: <ArtistsDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);