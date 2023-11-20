import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../DashboardComponents/dashboard/dashboard';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import CountryProfile from '../CPComponents/CountryProfile/CountryProfile';

function App() {

  const [currentRoute, setCurrentRoute] = React.useState('/');


  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <header className="App-header">
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
              }
            />
            <Route
              path="/login"
              element={(
                <Login/>
              )}
            />
            <Route
              path="/signup"
              element={(
                <Signup/>
              )}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/cp"
              element={<CountryProfile />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;