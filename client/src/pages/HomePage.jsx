import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const table = params.get('table');

  useEffect(() => {
    if (table) {
      localStorage.setItem('tableNumber', table);
    }
  }, [table]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Café!</h1>
      <p>You're at <strong>Table {table}</strong></p>
      <button onClick={() => navigate('/menu')}>Start Ordering</button>
    </div>
  );
};

export default HomePage;
