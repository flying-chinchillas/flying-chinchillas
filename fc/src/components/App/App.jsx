import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../DashboardComponents/Dashboard/Dashboard';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import CountryProfile from '../CPComponents/CountryProfile/CountryProfile';
import UserProfile from '../UserProfileComponents/UserProfile/UserProfile';

function App() {

  const [currentRoute, setCurrentRoute] = React.useState('/login');


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
              path="/countryprofile/:country"
              element={<CountryProfile />}
            />
            <Route
            path="/userprofile"
            element={<UserProfile />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
