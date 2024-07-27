import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BorrowingList = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentBorrowing, setCurrentBorrowing] = useState({
        id: '',
        student: '',
        book: '',
        borrowing_date: '',
        return_date: ''
    });

    useEffect(() => {
        const fetchBorrowings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/borrowing/');
                setBorrowings(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/students/');
                setStudents(response.data);
            } catch (err) {
                setError(err);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                setBooks(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchBorrowings();
        fetchStudents();
        fetchBooks();
    }, []);

    const refreshBorrowings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/borrowing/');
            setBorrowings(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this borrowing record?')) {
            try {
                await axios.delete(`http://localhost:8000/api/borrowing/delete/${id}/`);
                setBorrowings(borrowings.filter(borrowing => borrowing.id !== id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (borrowing) => {
        setCurrentBorrowing({ ...borrowing });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentBorrowing.id) {
            console.error('Borrowing ID is not defined');
            return;
        }
        try {
            const response = await axios.patch(`http://localhost:8000/api/borrowing/update/${currentBorrowing.id}/`, currentBorrowing);
            setBorrowings(borrowings.map(borrowing => borrowing.id === currentBorrowing.id ? response.data : borrowing));
            setShowEditModal(false);
        } catch (err) {
            console.error('Error updating borrowing:', err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    const handleAddBorrowing = async () => {
        try {
            const newBorrowing = {
                ...currentBorrowing,
                borrowing_date: currentBorrowing.borrowing_date || new Date().toISOString().split('T')[0] // Set current date
            };
            const response = await axios.post('http://localhost:8000/api/borrowing/create/', newBorrowing);
            setBorrowings([...borrowings, response.data]);
            setShowAddModal(false);
            setCurrentBorrowing({
                student: '',
                book: '',
                borrowing_date: '',
                return_date: ''
            });
        } catch (err) {
            console.error('Error adding borrowing:', err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBorrowing(prevBorrowing => ({ ...prevBorrowing, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching borrowings: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className="mb-4">Borrowing List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Borrowing
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Student</th>
                                <th scope="col">Book</th>
                                <th scope="col">Borrowing Date</th>
                                <th scope="col">Return Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowings.map((borrowing) => {
                                const student = students.find(s => s.library_id === borrowing.student) || {};
                                const book = books.find(b => b.book_id === borrowing.book) || {};
                                return (
                                    <tr key={borrowing.id}>
                                        <td>{student.user || 'Unknown Student'}</td>
                                        <td>{book.title || 'Unknown Book'}</td>
                                        <td>{borrowing.borrowing_date}</td>
                                        <td>{borrowing.return_date || 'Not Returned'}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(borrowing)}>
                                                <FaEdit />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(borrowing.id)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Borrowing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudent">
                            <Form.Label>Student</Form.Label>
                            <Form.Control
                                as="select"
                                name="student"
                                value={currentBorrowing.student}
                                onChange={handleChange}
                            >
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.library_id} value={student.library_id}>
                                        {student.user}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBook">
                            <Form.Label>Book</Form.Label>
                            <Form.Control
                                as="select"
                                name="book"
                                value={currentBorrowing.book}
                                onChange={handleChange}
                            >
                                <option value="">Select Book</option>
                                {books.map(book => (
                                    <option key={book.book_id} value={book.book_id}>
                                        {book.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBorrowingDate">
                            <Form.Label>Borrowing Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="borrowing_date"
                                value={currentBorrowing.borrowing_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReturnDate">
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="return_date"
                                value={currentBorrowing.return_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddBorrowing}>Save Borrowing</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Borrowing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudent">
                            <Form.Label>Student</Form.Label>
                            <Form.Control
                                as="select"
                                name="student"
                                value={currentBorrowing.student}
                                onChange={handleChange}
                            >
                                <option value="">Select Student</option>
                                {students.map(student => (
                                    <option key={student.library_id} value={student.library_id}>
                                        {student.user}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBook">
                            <Form.Label>Book</Form.Label>
                            <Form.Control
                                as="select"
                                name="book"
                                value={currentBorrowing.book}
                                onChange={handleChange}
                            >
                                <option value="">Select Book</option>
                                {books.map(book => (
                                    <option key={book.book_id} value={book.book_id}>
                                        {book.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBorrowingDate">
                            <Form.Label>Borrowing Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="borrowing_date"
                                value={currentBorrowing.borrowing_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReturnDate">
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="return_date"
                                value={currentBorrowing.return_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BorrowingList;
