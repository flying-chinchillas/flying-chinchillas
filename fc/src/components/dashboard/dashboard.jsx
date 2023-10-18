import './Dashboard.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Logs out user
export default function Dashboard() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = React.useState('hidden');

  function popUp() {
    if (visibility === 'hidden') {
      setVisibility('visible');
    } else {
      setVisibility('hidden');
    }
  }

  return (
    <div>
      <button>
        Halo
      </button>
    </div>
  );
}