import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import "./AuthButton.css";

function AuthButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.displayName}</p>
          <button className="auth-btn logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button className="auth-btn login" onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default AuthButton;
