import { getAuth } from 'firebase/auth';
import { app } from './firebase';

export async function fetchWithToken(url, options = {}) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  const idToken = await user.getIdToken(true);
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${idToken}`,
  };

  const response = await fetch(url, options);
  return response.json();
}
export async function createSnippet(snippetData) {
  return await fetchWithToken('https://csoc-25-web-projects.onrender.com/api/snippets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(snippetData),
  });
}
