import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState({});
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const fetchAlbums = (userId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => {
        setAlbums((prevState) => ({
          ...prevState,
          [userId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("There was an error fetching the albums!", error);
      });
  };

  const fetchPhotos = (albumId) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => {
        setPhotos((prevState) => ({
          ...prevState,
          [albumId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("There was an error fetching the photos!", error);
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <button onClick={() => fetchAlbums(user.id)}>Albums</button>
            {albums[user.id] && (
              <ul>
                {albums[user.id].map((album) => (
                  <li key={album.id}>
                    <p>{album.title}</p>
                    <button onClick={() => fetchPhotos(album.id)}>
                      Photos
                    </button>
                    {photos[album.id] && (
                      <ul>
                        {photos[album.id].map((photo) => (
                          <li key={photo.id}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
