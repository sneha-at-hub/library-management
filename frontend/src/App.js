import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BookList from './components/BookList';
import StudentList from './components/StudentList';
import BorrowingList from './components/BorrowingList';
import AuthorList from './components/AuthorList';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/borrowings" element={<BorrowingList />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/categories" element={<CategoryList />} />
    </Routes>


  );
}

export default App;
