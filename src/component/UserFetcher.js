import React, { useState, useEffect } from 'react';
import './css/UserFetcher.css';

const UserFetcher = () => {
  const [counter, setCounter] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${counter}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [counter]);

  const incrementCounter = () => {
    if (counter < 10) setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter > 1) setCounter(counter - 1);
  };

  return (
    <div className="container">
      <h1 className="title">User Info</h1>
      <div className="controls">
        <button onClick={decrementCounter} disabled={counter === 1}>
          Previous
        </button>
        <span>User ID: {counter}</span>
        <button onClick={incrementCounter} disabled={counter === 10}>
          Next
        </button>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : userData ? (
        <div className="user-data">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Website:</strong> {userData.website}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserFetcher;
