import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBook = ({ show, handleClose, refreshBooks }) => {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        publisher: '',
        publication_year: '',
        isbn: '',
        copies_available: '',
    });
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [authorsRes, categoriesRes, publishersRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/authors/'),
                    axios.get('http://localhost:8000/api/category/'),
                    axios.get('http://localhost:8000/api/publisher/')
                ]);
                setAuthors(authorsRes.data);
                setCategories(categoriesRes.data);
                setPublishers(publishersRes.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:8000/api/books/create', newBook);
            handleClose(); // Close the modal
            refreshBooks(); // Refresh the book list
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error.message}</p>}
                <Form>
                    <Form.Group controlId="formBookTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={newBook.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBookAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            as="select"
                            name="author"
                            value={newBook.author}
                            onChange={handleChange}
                            style={{
                                backgroundColor: 'white', // Ensures the background is not transparent
                                opacity: 1, // Ensures full opacity
                                color: 'black', // Sets the text color
                                borderColor: '#ced4da', // Sets the border color
                                borderRadius: '.25rem', // Optional: rounds the corners
                                padding: '.375rem .75rem', // Optional: adjusts padding
                                fontSize: '1rem', // Optional: adjusts font size
                            }}
                        >
                            <option value="">Select Author</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.first_name} {author.last_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId="formBookCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={newBook.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBookPublisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control
                            as="select"
                            name="publisher"
                            value={newBook.publisher}
                            onChange={handleChange}
                        >
                            <option value="">Select Publisher</option>
                            {publishers.map(publisher => (
                                <option key={publisher.id} value={publisher.id}>
                                    {publisher.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBookPublishedDate">
                        <Form.Label>Published Date</Form.Label>
                        <Form.Control
                            type="text"
                            name="publication_year"
                            value={newBook.publication_year}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBookISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            name="isbn"
                            value={newBook.isbn}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBookCopiesAvailable">
                        <Form.Label>Copies Available</Form.Label>
                        <Form.Control
                            type="number"
                            name="copies_available"
                            value={newBook.copies_available}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    Add Book
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddBook;
