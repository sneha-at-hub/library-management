import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BookList from './components/BookList';
import BorrowingList from './components/BorrowingList';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/borrowings" element={<BorrowingList />} />
    </Routes>


  );
}

export default App;
