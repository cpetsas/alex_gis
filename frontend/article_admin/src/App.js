import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/authorisation/Login'
import Dashboard from './components/dashboard/Dashboard';


function App() {

  return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Routes>
                <Route exact path="/" element={<Navigate to="/login" />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/login" element={<Login/>}/>
              </Routes>
            </header>
          </div>
      </Router>    
  );
}

export default App;
