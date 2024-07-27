import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PublisherList = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentPublisher, setCurrentPublisher] = useState({
        id: '',
        name: '',
        address: '',
        phone_number: '',
        email: ''
    });

    useEffect(() => {
        const fetchPublishers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/publisher/');
                setPublishers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPublishers();
    }, []);

    const refreshPublishers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/publisher/');
            setPublishers(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this publisher?')) {
            try {
                await axios.delete(`http://localhost:8000/api/publisher/${id}/delete/`);
                setPublishers(publishers.filter(publisher => publisher.id !== id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (publisher) => {
        setCurrentPublisher({ ...publisher });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentPublisher.id) {
            console.error('Publisher ID is not defined');
            return;
        }
        try {
            await axios.patch(`http://localhost:8000/api/publisher/update/${currentPublisher.id}/`, currentPublisher);
            setPublishers(publishers.map(publisher => publisher.id === currentPublisher.id ? currentPublisher : publisher));
            setShowEditModal(false);
        } catch (err) {
            setError(err);
        }
    };

    const handleAddPublisher = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/publisher/create/', currentPublisher);
            setPublishers([...publishers, response.data]);
            setShowAddModal(false);
            setCurrentPublisher({
                name: '',
                address: '',
                phone_number: '',
                email: ''
            });
        } catch (err) {
            setError(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentPublisher(prevPublisher => ({ ...prevPublisher, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching publishers: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className="mb-4">Publisher List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Publisher
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publishers.map((publisher) => (
                                <tr key={publisher.id}>
                                    <td>{publisher.name}</td>
                                    <td>{publisher.address || 'N/A'}</td>
                                    <td>{publisher.phone_number || 'N/A'}</td>
                                    <td>{publisher.email || 'N/A'}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(publisher)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(publisher.id)}>
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
                    <Modal.Title>Add New Publisher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentPublisher.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="address"
                                value={currentPublisher.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={currentPublisher.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={currentPublisher.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddPublisher}>Save Publisher</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Publisher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentPublisher.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="address"
                                value={currentPublisher.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={currentPublisher.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={currentPublisher.email}
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

export default PublisherList;
