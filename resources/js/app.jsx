import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <div>
      <h1>Mi aplicación React en Laravel</h1>
      <Login />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
