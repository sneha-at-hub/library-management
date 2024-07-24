// src/components/BorrowingList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BorrowingList = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentBorrowing, setCurrentBorrowing] = useState(null);
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);

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

        const fetchOptions = async () => {
            try {
                const [studentsRes, booksRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/students/'),
                    axios.get('http://localhost:8000/api/books/')
                ]);
                setStudents(studentsRes.data);
                setBooks(booksRes.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchBorrowings();
        fetchOptions();
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
        if (window.confirm('Are you sure you want to delete this borrowing?')) {
            try {
                await axios.delete(`http://localhost:8000/api/borrowing/${id}/delete/`);
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
            await axios.patch(`http://localhost:8000/api/borrowing/update/${currentBorrowing.id}`, currentBorrowing);
            setBorrowings(borrowings.map(borrowing => borrowing.id === currentBorrowing.id ? currentBorrowing : borrowing));
            setShowEditModal(false);
        } catch (err) {
            setError(err);
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
            <div className="container my-5">
                <h2 className="text-center mb-4">Borrowing List</h2>
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
                            {borrowings.map((borrowing) => (
                                <tr key={borrowing.id}>
                                    <td>{borrowing.student}</td>
                                    <td>{borrowing.book}</td>
                                    <td>{borrowing.borrowing_date}</td>
                                    <td>{borrowing.return_date}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(borrowing)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(borrowing.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Borrowing Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Borrowing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add form for creating a new borrowing */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Borrowing Modal */}
            {currentBorrowing && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Borrowing</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBorrowingStudent">
                                <Form.Label>Student</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="student"
                                    value={currentBorrowing.student || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Student</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.user}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBorrowingBook">
                                <Form.Label>Book</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="book"
                                    value={currentBorrowing.book || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Book</option>
                                    {books.map(book => (
                                        <option key={book.id} value={book.id}>
                                            {book.title}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBorrowingReturnDate">
                                <Form.Label>Return Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="return_date"
                                    value={currentBorrowing.return_date || ''}
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
            )}
        </>
    );
};

export default BorrowingList;
