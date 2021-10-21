import React from 'react';
import AppState from './context/AppState';
import Listing from './pages/Listing/index';

function App() {
  return (
    <AppState>
      <Listing />
    </AppState>
  );
}

export default App;
