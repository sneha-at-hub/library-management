import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState({
        id: '',
        first_name: '',
        last_name: '',
        birth_date: ''
    });

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/authors/');
                setAuthors(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    const refreshAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/authors/');
            setAuthors(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this author?')) {
            try {
                await axios.delete(`http://localhost:8000/api/authors/delete/${id}/`);
                setAuthors(authors.filter(author => author.id !== id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (author) => {
        setCurrentAuthor({ ...author });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentAuthor.id) {
            console.error('Author ID is not defined');
            return;
        }
        try {
            const response = await axios.patch(`http://localhost:8000/api/authors/update/${currentAuthor.id}/`, currentAuthor);
            setAuthors(authors.map(author => author.id === currentAuthor.id ? response.data : author));
            setShowEditModal(false);
        } catch (err) {
            console.error('Error updating author:', err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    const handleAddAuthor = async () => {
        try {
            const newAuthor = {
                ...currentAuthor,
                birth_date: currentAuthor.birth_date || '' // Default to empty if not provided
            };
            const response = await axios.post('http://localhost:8000/api/authors/create/', newAuthor);
            setAuthors([...authors, response.data]);
            setShowAddModal(false);
            setCurrentAuthor({
                first_name: '',
                last_name: '',
                birth_date: ''
            });
        } catch (err) {
            console.error('Error adding author:', err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAuthor(prevAuthor => ({ ...prevAuthor, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching authors: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className="mb-4">Author List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Author
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Birth Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map((author) => (
                                <tr key={author.id}>
                                    <td>{author.first_name}</td>
                                    <td>{author.last_name}</td>
                                    <td>{author.birth_date || 'N/A'}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(author)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(author.id)}>
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
                    <Modal.Title>Add New Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={currentAuthor.first_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={currentAuthor.last_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth_date"
                                value={currentAuthor.birth_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddAuthor}>Save Author</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={currentAuthor.first_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={currentAuthor.last_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth_date"
                                value={currentAuthor.birth_date}
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

export default AuthorList;
