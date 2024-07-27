import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({
        user: '',
        phone_number: '',
        address: '',
        membership_date: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/students/');
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const refreshStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/students/');
            setStudents(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (library_id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:8000/api/students/${library_id}/delete/`);
                setStudents(students.filter(student => student.library_id !== library_id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (student) => {
        setCurrentStudent({ ...student });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentStudent.library_id) {
            console.error('Library ID is not defined');
            return;
        }
        try {
            await axios.patch(`http://localhost:8000/api/students/update/${currentStudent.library_id}/`, currentStudent);
            setStudents(students.map(student => student.library_id === currentStudent.library_id ? currentStudent : student));
            setShowEditModal(false);
        } catch (err) {
            setError(err);
        }
    };

    const handleAddStudent = async () => {
        try {
            const newStudent = {
                ...currentStudent,
                membership_date: new Date().toISOString().split('T')[0] // Setting current date
            };
            await axios.post('http://localhost:8000/api/students/create/', newStudent);
            refreshStudents();
            setShowAddModal(false);
            setCurrentStudent({ user: '', phone_number: '', address: '', membership_date: '' });
        } catch (err) {
            setError(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent(prevStudent => ({ ...prevStudent, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching students: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className=" mb-4">Student List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Student
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Library ID</th>
                                <th scope="col">Address</th>
                                <th scope="col">Membership Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.library_id}>
                                    <td>{student.user}</td>
                                    <td>{student.phone_number}</td>
                                    <td>{student.library_id}</td>
                                    <td>{student.address}</td>
                                    <td>{student.membership_date}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(student)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.library_id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudentUser">
                            <Form.Label>User</Form.Label>
                            <Form.Control
                                type="text"
                                name="user"
                                value={currentStudent.user}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={currentStudent.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="address"
                                value={currentStudent.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddStudent}>Save Student</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudentUser">
                            <Form.Label>User</Form.Label>
                            <Form.Control
                                type="text"
                                name="user"
                                value={currentStudent.user}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={currentStudent.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="address"
                                value={currentStudent.address}
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

export default StudentList;
