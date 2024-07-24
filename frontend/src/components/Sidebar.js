import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Custom styles for the sidebar

const Sidebar = () => {
    return (
        <nav id="sidebar" className="bg-light border-right">
            <div className="sidebar-header py-4 px-3">
                <h3 className="text-center">Library Management</h3>
            </div>
            <ul className="list-unstyled components">
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    <a href="#studentsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">Students</a>
                    <ul className="collapse list-unstyled" id="studentsSubmenu">
                        <li><Link to="/students" className="nav-link">List Students</Link></li>
                        <li><Link to="/students/add" className="nav-link">Add Student</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#booksSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">Books</a>
                    <ul className="collapse list-unstyled" id="booksSubmenu">
                        <li><Link to="/books" className="nav-link">List Books</Link></li>
                        <li><Link to="/books/add" className="nav-link">Add Book</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#borrowingsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">Borrowings</a>
                    <ul className="collapse list-unstyled" id="borrowingsSubmenu">
                        <li><Link to="/borrowings" className="nav-link">List Borrowings</Link></li>
                        <li><Link to="/borrowings/add" className="nav-link">Add Borrowing</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#reservationsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">Reservations</a>
                    <ul className="collapse list-unstyled" id="reservationsSubmenu">
                        <li><Link to="/reservations" className="nav-link">List Reservations</Link></li>
                        <li><Link to="/reservations/add" className="nav-link">Add Reservation</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/authors" className="nav-link">Authors</Link>
                </li>
                <li>
                    <Link to="/categories" className="nav-link">Categories</Link>
                </li>
                <li>
                    <Link to="/publishers" className="nav-link">Publishers</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
