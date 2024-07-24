import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddBook from './AddBook';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [authorMap, setAuthorMap] = useState({});
    const [categoryMap, setCategoryMap] = useState({});
    const [publisherMap, setPublisherMap] = useState({});

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

        const fetchOptions = async () => {
            try {
                const [authorsRes, categoriesRes, publishersRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/authors/'),
                    axios.get('http://localhost:8000/api/category/'),
                    axios.get('http://localhost:8000/api/publisher/')
                ]);

                // Create maps for easy lookup
                setAuthorMap(authorsRes.data.reduce((map, author) => {
                    map[author.id] = `${author.first_name} ${author.last_name}`;
                    return map;
                }, {}));
                setCategoryMap(categoriesRes.data.reduce((map, category) => {
                    map[category.id] = category.name;
                    return map;
                }, {}));
                setPublisherMap(publishersRes.data.reduce((map, publisher) => {
                    map[publisher.id] = publisher.name;
                    return map;
                }, {}));
                
                // Set data
                setAuthors(authorsRes.data);
                setCategories(categoriesRes.data);
                setPublishers(publishersRes.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchBooks();
        fetchOptions();
    }, []);

    const refreshBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/books/');
            setBooks(response.data);
        } catch (err) {
            setError(err);
        }
    };

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
            <div className="container my-5" style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }}>
                <h2 className=" mb-4">Book List</h2>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Book
                </Button>
                <div className="table-responsive mt-4">
                    <table className="table">
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
                                    <td>{authorMap[book.author] || book.author}</td>
                                    <td>{categoryMap[book.category] || book.category}</td>
                                    <td>{publisherMap[book.publisher] || book.publisher}</td>
                                    <td>{book.publication_year}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.copies_available}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm" style={{ marginRight: '10px', backgroundColor:'#003a79', color:'white', borderColor:'lightgray' }}>Details</button>
                                        <button className="btn btn-warning btn-sm" style={{ marginRight: '10px', padding:'0 5px 5px 5px' }} onClick={() => handleEdit(book)}>
                                            <FaEdit /> 
                                        </button>
                                        <button className="btn btn-danger btn-sm" style={{ padding:'0 0px 5px 5px', backgroundColor:'white', borderColor:'lightgray'}} onClick={() => handleDelete(book.book_id)}>
                                            <FaTrash style={{ marginRight: '5px', color:'gray'}} /> 
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddBook show={showAddModal} handleClose={() => setShowAddModal(false)} refreshBooks={refreshBooks} />

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
                                    as="select"
                                    name="author"
                                    value={currentBook.author || ''}
                                    onChange={handleChange}
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
                                    value={currentBook.category || ''}
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
                                    value={currentBook.publisher || ''}
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
                            <Form.Group controlId="formBookPublicationYear">
                                <Form.Label>Publication Year</Form.Label>
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
