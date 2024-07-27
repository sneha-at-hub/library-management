import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({
        id: '',
        name: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/category/');
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const refreshCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/category/');
            setCategories(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://localhost:8000/api/category/${id}/delete/`);
                setCategories(categories.filter(category => category.id !== id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (category) => {
        setCurrentCategory({ ...category });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentCategory.id) {
            console.error('Category ID is not defined');
            return;
        }
        try {
            const response = await axios.patch(`http://localhost:8000/api/category/update/${currentCategory.id}/`, currentCategory);
            setCategories(categories.map(category => category.id === currentCategory.id ? response.data : category));
            setShowEditModal(false);
        } catch (err) {
            console.error('Error updating category:', err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    const handleAddCategory = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/category/create/', { name: currentCategory.name });
            setCategories([...categories, response.data]);
            setShowAddModal(false);
            setCurrentCategory({
                name: ''
            });
        } catch (err) {
            console.error('Error adding category:', err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory(prevCategory => ({ ...prevCategory, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching categories: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className="mb-4">Category List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Category
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Category Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" style={{ marginRight: '10px' }} onClick={() => handleEdit(category)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>
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
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentCategory.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddCategory}>Save Category</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentCategory.name}
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

export default CategoryList;
