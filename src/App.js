import React from 'react';
import './App.css';
import PostList from './PostList';

function App() {
  return (
    <div className="App">
      <h1 className="app-title">List of posts</h1>
      <PostList />
    </div>
  );
}

export default App;
