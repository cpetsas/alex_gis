import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/authorisation/Login'
import Dashboard from './components/dashboard/Dashboard';
import CategoryForm from './components/management/CategoryForm';
import AuthorForm from './components/management/AuthorForm';
import ArticleForm from './components/management/ArticleForm';

function App() {

  return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Routes>
                <Route exact path="/" element={<Navigate to="/login" />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/create/category" element={<CategoryForm/>} />
                <Route path="/create/author" element={<AuthorForm/>} />
                <Route path="/create/article" element={<ArticleForm/>} />
              </Routes>
            </header>
          </div>
      </Router>    
  );
}

export default App;
