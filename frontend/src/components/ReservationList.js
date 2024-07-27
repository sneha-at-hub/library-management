import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentReservation, setCurrentReservation] = useState({
        id: '',
        student: '',
        book: '',
        reservation_date: '',
        status: 'Pending'
    });

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/reservation/');
                setReservations(response.data);
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

        fetchReservations();
        fetchStudents();
        fetchBooks();
    }, []);

    const refreshReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/reservation/');
            setReservations(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            try {
                await axios.delete(`http://localhost:8000/api/reservation/${id}/delete/`);
                setReservations(reservations.filter(reservation => reservation.id !== id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (reservation) => {
        setCurrentReservation({ ...reservation });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentReservation.id) {
            console.error('Reservation ID is not defined');
            return;
        }
        try {
            await axios.patch(`http://localhost:8000/api/reservation/update/${currentReservation.id}/`, currentReservation);
            setReservations(reservations.map(reservation => reservation.id === currentReservation.id ? currentReservation : reservation));
            setShowEditModal(false);
        } catch (err) {
            setError(err);
        }
    };

    const handleAddReservation = async () => {
        try {
            const newReservation = {
                ...currentReservation,
                reservation_date: new Date().toISOString().split('T')[0] // Set current date
            };
            const response = await axios.post('http://localhost:8000/api/reservation/create/', newReservation);
            setReservations([...reservations, response.data]);
            setShowAddModal(false);
            setCurrentReservation({
                student: '',
                book: '',
                reservation_date: '',
                status: 'Pending'
            });
        } catch (err) {
            setError(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentReservation(prevReservation => ({ ...prevReservation, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching reservations: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className="mb-4">Reservation List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Reservation
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Student</th>
                                <th scope="col">Book</th>
                                <th scope="col">Reservation Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => {
                                const student = students.find(s => s.library_id === reservation.student) || {};
                                const book = books.find(b => b.book_id === reservation.book) || {};
                                return (
                                    <tr key={reservation.id}>
                                        <td>{student.user || 'Unknown Student'}</td>
                                        <td>{book.title || 'Unknown Book'}</td>
                                        <td>{reservation.reservation_date}</td>
                                        <td>{reservation.status}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(reservation)}>
                                                <FaEdit />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(reservation.id)}>
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
                    <Modal.Title>Add New Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudent">
                            <Form.Label>Student</Form.Label>
                            <Form.Control
                                as="select"
                                name="student"
                                value={currentReservation.student}
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
                                value={currentReservation.book}
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
                        <Form.Group controlId="formReservationDate">
                            <Form.Label>Reservation Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="reservation_date"
                                value={currentReservation.reservation_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={currentReservation.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddReservation}>Save Reservation</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudent">
                            <Form.Label>Student</Form.Label>
                            <Form.Control
                                as="select"
                                name="student"
                                value={currentReservation.student}
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
                                value={currentReservation.book}
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
                        <Form.Group controlId="formReservationDate">
                            <Form.Label>Reservation Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="reservation_date"
                                value={currentReservation.reservation_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={currentReservation.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Form.Control>
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

export default ReservationList;
