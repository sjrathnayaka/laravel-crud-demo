// AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [songs, setSongs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    album: '',
    genre: '',
    youtube_link: '',
  });
  const [editingSongId, setEditingSongId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchSongs();
    }
  }, [navigate]);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/songs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSongs(response.data);
    } catch (error) {
      setError('Failed to fetch songs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: formData.name,
      artist: formData.artist,
      album: formData.album,
      genre: formData.genre,
      youtube_link: formData.youtube_link,
    };

    try {
      if (editingSongId) {
        await axios.put(`http://localhost:8000/api/songs/${editingSongId}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:8000/api/songs', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      fetchSongs();
      setFormData({
        name: '',
        artist: '',
        album: '',
        genre: '',
        youtube_link: '',
      });
    } catch (error) {
      setError('Failed to save the song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (song) => {
    setEditingSongId(song.id);
    setFormData({
      name: song.name,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      youtube_link: song.youtube_link,
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/songs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchSongs();
    } catch (error) {
      setError('Failed to delete the song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel - Manage Trending Songs</h1>
      </div>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="song-form">
        <input
          type="text"
          name="name"
          placeholder="Song Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist Name"
          value={formData.artist}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="album"
          placeholder="Album Name"
          value={formData.album}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="youtube_link"
          placeholder="YouTube Link"
          value={formData.youtube_link}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          {editingSongId ? 'Update Song' : 'Add Song'}
        </button>
      </form>

      <div className="admin-list">
        <h2>Trending Songs</h2>
        {loading ? (
          <p>Loading songs...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                <th>YouTube Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.length > 0 ? (
                songs.map((song) => (
                  <tr key={song.id}>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                    <td>{song.album}</td>
                    <td>{song.genre}</td>
                    <td>
                      <a href={song.youtube_link} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(song)}>Edit</button>
                      <button onClick={() => handleDelete(song.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No songs available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <footer className="admin-footer">
        <div className="footer-content">
          <p>Admin Panel &copy; 2024</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
