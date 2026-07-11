import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
import './SnippetForm.css';

const SnippetForm = ({ onSnippetCreated }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (!user) {
        setStatus('You must be signed in to create a snippet.');
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch('https://csoc-25-web-projects.onrender.com/api/snippets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          title,
          language,
          code,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          description,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setStatus(' Snippet created successfully!');
      setTitle('');
      setLanguage('');
      setCode('');
      setTags('');
      setDescription('');

      if (onSnippetCreated) {
        onSnippetCreated();
      }

    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="snippet-form">
      <h2>Create Snippet</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      />

      <textarea
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Create Snippet</button>

      {status && <p>{status}</p>}
    </form>
  );
};

export default SnippetForm;
