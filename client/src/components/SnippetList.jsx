import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SnippetCard from './SnippetCard';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const fetchSnippets = async (currentUser) => {
    setLoading(true);
    setError('');

    if (!currentUser) {
      setSnippets([]);
      setLoading(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken(true);
      const res = await fetch('https://csoc-25-web-projects.onrender.com/api/snippets', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch snippets');
      }

      const data = await res.json();

      const normalizedSnippets = data.map((snippet) => ({
        ...snippet,
        _id: snippet._id?.$oid || snippet._id,
      }));

      setSnippets(normalizedSnippets);
    } catch (err) {
      setError(err.message);
      setSnippets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!user) return;
    const token = await user.getIdToken(true);
    try {
      const res = await fetch(`https://csoc-25-web-projects.onrender.com/api/snippets/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete snippet');

      setSnippets((prev) => prev.filter(snippet => snippet._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    if (!user) return;
    const token = await user.getIdToken(true);
    try {
      const res = await fetch(`https://csoc-25-web-projects.onrender.com/api/snippets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Failed to update snippet');
      const updated = await res.json();

      setSnippets((prev) =>
        prev.map((snippet) => (snippet._id === id ? updated : snippet))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      fetchSnippets(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading snippets...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {snippets.length === 0 ? (
        <p>No snippets found. Create some!</p>
      ) : (
        snippets.map(snippet => (
          <SnippetCard
            key={snippet._id}
            snippet={snippet}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default SnippetList;
