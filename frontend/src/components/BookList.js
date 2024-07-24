import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css'; // Custom CSS for additional styling
import Sidebar from './Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/books/');
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleDelete = async (book_id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`http://localhost:8000/api/books/${book_id}/delete/`);
                setBooks(books.filter(book => book.book_id !== book_id));
            } catch (err) {
                setError(err);
            }
        }
    };

    const handleEdit = (book) => {
        setCurrentBook({ ...book });
        setShowEditModal(true);
    };

    const handleSaveChanges = async () => {
        if (!currentBook.book_id) {
            console.error('Book ID is not defined');
            return;
        }
        try {
            await axios.patch(`http://localhost:8000/api/books/update/${currentBook.book_id}`, currentBook);
            setBooks(books.map(book => book.book_id === currentBook.book_id ? currentBook : book));
            setShowEditModal(false);
        } catch (err) {
            setError(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching books: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <div className="container my-5" style={{ marginLeft: '300px', marginRight: 'auto', maxWidth: '1000px' }}>
                <h2 className="text-center mb-4">Book List</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Category</th>
                                <th scope="col">Publisher</th>
                                <th scope="col">Published Date</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Copies Available</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.book_id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.publisher}</td>
                                    <td>{book.publication_year}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.copies_available}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm mr-2">Details</button>
                                        <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(book)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.book_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {currentBook && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBookTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={currentBook.title || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBookAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="author"
                                    value={currentBook.author || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBookCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={currentBook.category || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBookPublisher">
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="publisher"
                                    value={currentBook.publisher || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBookPublishedDate">
                                <Form.Label>Published Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="publication_year"
                                    value={currentBook.publication_year || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBookISBN">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="isbn"
                                    value={currentBook.isbn || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBookCopiesAvailable">
                                <Form.Label>Copies Available</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="copies_available"
                                    value={currentBook.copies_available || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default BookList;
