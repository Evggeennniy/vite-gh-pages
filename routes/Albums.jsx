import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Albums = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the albums!", error);
      });
  }, [userId]);

  return (
    <div>
      <h1>Albums of User {userId}</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/album/${album.id}/photos`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
