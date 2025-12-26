import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg"; // import local image properly

const API_URL = "http://localhost:8000/api/v1/comments/";

function App() {
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch all comments
  const fetchComments = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Add new comment
  const addComment = async () => {
    if (!newText) return;

    const newComment = {
      author: "Admin",
      text: newText,
      likes: 0,
      image: logo,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    const savedComment = await res.json(); // use backend response
    setComments([...comments, savedComment]);
    setNewText("");
  };

  // Edit comment (PATCH)
  const editComment = async (id) => {
    if (!editingText) return;

    const res = await fetch(`${API_URL}${id}/`, {
      method: "PATCH", // PATCH for partial update
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editingText }),
    });

    const updatedComment = await res.json();
    setComments(comments.map(c => c.id === id ? updatedComment : c));
    setEditingId(null);
    setEditingText("");
  };

  // Delete comment
  const deleteComment = async (id) => {
    await fetch(`${API_URL}${id}/`, { method: "DELETE" });
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div className="container">
      <h1>Comments</h1>

      <div className="new-comment">
        <input
          type="text"
          placeholder="New comment"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>

      <ul className="comments-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="comment-body">
              <p>
                <strong>{c.author}</strong> ({new Date(c.date || c.created_at).toLocaleString()})
              </p>

              {editingId === c.id ? (
                <div>
                  <textarea
                  className="CommentArea"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={() => editComment(c.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <p>{c.text}</p>
              )}
              <div>
                <img src={c.image} alt={c.author} className="avatar" />
              </div>
              <div className="comment-actions">
                <span>Likes: {c.likes}</span>
                <button onClick={() => { setEditingId(c.id); setEditingText(c.text); }}>Edit</button>
                <button onClick={() => deleteComment(c.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
