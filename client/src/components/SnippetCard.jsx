import React, { useState } from 'react';

const SnippetCard = ({ snippet, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editedSnippet, setEditedSnippet] = useState({
    title: snippet.title,
    code: snippet.code,
    language: snippet.language,
    description: snippet.description || '',
  });

  const handleSave = () => {
    onUpdate(snippet._id, editedSnippet);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          <input
            style={styles.input}
            value={editedSnippet.title}
            onChange={(e) => setEditedSnippet({ ...editedSnippet, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            style={styles.textarea}
            value={editedSnippet.code}
            onChange={(e) => setEditedSnippet({ ...editedSnippet, code: e.target.value })}
            placeholder="Code"
          />
          <input
            style={styles.input}
            value={editedSnippet.language}
            onChange={(e) => setEditedSnippet({ ...editedSnippet, language: e.target.value })}
            placeholder="Language"
          />
          <textarea
            style={styles.textarea}
            value={editedSnippet.description}
            onChange={(e) => setEditedSnippet({ ...editedSnippet, description: e.target.value })}
            placeholder="Description"
          />
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={handleSave}>Save</button>
            <button style={styles.button} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3 style={styles.title}>{snippet.title}</h3>
          <pre style={styles.code}>
            <code>{snippet.code}</code>
          </pre>
          <p style={styles.language}>Language: {snippet.language}</p>
          <p style={styles.description}>{snippet.description}</p>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button style={styles.button} onClick={() => setIsEditing(true)}>Edit</button>
            <button style={styles.button} onClick={() => onDelete(snippet._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #3a5152',
    borderRadius: '12px',
    padding: '1.5rem',
    margin: '1.5rem 0',
    backgroundColor: '#203031',
    color: '#f1f1f1',
    fontFamily: 'monospace',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    color: '#81b1b3',
  },
  code: {
    backgroundColor: '#2d3d3e',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    color: '#e4e4e4',
  },
  language: {
    marginTop: '0.5rem',
    fontStyle: 'italic',
    color: '#81b1b3',
  },
  description: {
    marginTop: '0.75rem',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #608385',
    backgroundColor: '#2d3d3e',
    color: '#ffffff',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '0.6rem',
    marginBottom: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #608385',
    backgroundColor: '#2d3d3e',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#608385',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1.2rem',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
  },
};

export default SnippetCard;
