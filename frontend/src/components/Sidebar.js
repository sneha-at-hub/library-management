import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Custom styles for the sidebar
import { FaHome, FaUsers, FaBook, FaBookOpen, FaUserPlus, FaBookReader, FaListAlt, FaTags, FaIndustry } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <nav id="sidebar" className="border-right">
            <div className="sidebar-header py-4 px-3">
                <h3 className="text-center">Library Management</h3>
            </div>
            <ul className="list-unstyled components">
                <li>
                    <Link to="/" className="nav-link">
                        <FaHome style={{ marginRight: '8px' }} /> Home
                    </Link>
                </li>
                <li>
                    <a href="#studentsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                        <FaUsers style={{ marginRight: '8px' }} /> Students
                    </a>
                    <ul className="collapse list-unstyled" id="studentsSubmenu">
                        <li><Link to="/students" className="nav-link"><FaListAlt style={{ marginRight: '8px' }} /> List Students</Link></li>
                        <li><Link to="/students/add" className="nav-link"><FaUserPlus style={{ marginRight: '8px' }} /> Add Student</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#booksSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                        <FaBook style={{ marginRight: '8px' }} /> Books
                    </a>
                    <ul className="collapse list-unstyled" id="booksSubmenu">
                        <li><Link to="/books" className="nav-link"><FaBookReader style={{ marginRight: '8px' }} /> List Books</Link></li>
                        <li><Link to="/books/add" className="nav-link"><FaBookOpen style={{ marginRight: '8px' }} /> Add Book</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#borrowingsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                        <FaTags style={{ marginRight: '8px' }} /> Borrowings
                    </a>
                    <ul className="collapse list-unstyled" id="borrowingsSubmenu">
                        <li><Link to="/borrowings" className="nav-link"><FaListAlt style={{ marginRight: '8px' }} /> List Borrowings</Link></li>
                        <li><Link to="/borrowings/add" className="nav-link"><FaBookOpen style={{ marginRight: '8px' }} /> Add Borrowing</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#reservationsSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                        <FaTags style={{ marginRight: '8px' }} /> Reservations
                    </a>
                    <ul className="collapse list-unstyled" id="reservationsSubmenu">
                        <li><Link to="/reservations" className="nav-link"><FaListAlt style={{ marginRight: '8px' }} /> List Reservations</Link></li>
                        <li><Link to="/reservations/add" className="nav-link"><FaBookOpen style={{ marginRight: '8px' }} /> Add Reservation</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/authors" className="nav-link"><FaUserPlus style={{ marginRight: '8px' }} /> Authors</Link>
                </li>
                <li>
                    <Link to="/categories" className="nav-link"><FaTags style={{ marginRight: '8px' }} /> Categories</Link>
                </li>
                <li>
                    <Link to="/publishers" className="nav-link"><FaIndustry style={{ marginRight: '8px' }} /> Publishers</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
