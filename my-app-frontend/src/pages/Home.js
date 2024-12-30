import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Homecss.css';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setRedirect(true);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/songs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSongs(response.data);
      } catch (err) {
        setError('Failed to load songs');
      }
    };

    fetchSongs();
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
     <h2 className="top-songs-heading"> Top Songs </h2>
      {error && <div>{error}</div>}
      <ul>
        {songs.map((song) => {
          const videoId = new URL(song.youtube_link).searchParams.get('v'); // Extract the video ID from the URL
          const iframeSrc = `https://www.youtube.com/embed/${videoId}`; // YouTube iframe embed URL

          return (
            <li key={song.id}>
              <div>
                <iframe
                  width="560"
                  height="315"
                  src={iframeSrc}
                  title={song.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <span>
                  {song.name} - {song.artist}
                </span>
                <p>Album: {song.album}</p> {/* Add album name here */}
                <p>Genre: {song.genre}</p> {/* Optional: Display genre */}
              </div>
              
              <a href={song.youtube_link} target="_blank" rel="noopener noreferrer">
                Listen
              </a>
            </li>
          );
        })}
      </ul>

      <footer>
        <p>
          <a href="/login">Login</a> | <a href="/contact">Contact</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
