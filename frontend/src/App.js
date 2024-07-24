import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BookList from './components/BookList';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/books" element={<BookList />} />
    </Routes>


  );
}

export default App;
