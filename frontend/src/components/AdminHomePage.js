import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBook, FaUserFriends, FaTag, FaBuilding, FaCalendarCheck } from 'react-icons/fa';
import Sidebar from './Sidebar';
import axios from 'axios';
import './admin.css';

const AdminHomePage = () => {
    const [stats, setStats] = useState({
        books: 0,
        authors: 0,
        categories: 0,
        publishers: 0,
        reservations: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksResponse, authorsResponse, categoriesResponse, publishersResponse, reservationsResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/books/count/'),
                    axios.get('http://localhost:8000/api/authors/count/'),
                    axios.get('http://localhost:8000/api/categories/count/'),
                    axios.get('http://localhost:8000/api/publishers/count/'),
                    axios.get('http://localhost:8000/api/reservations/count/')
                ]);

                setStats({
                    books: booksResponse.data.count,
                    authors: authorsResponse.data.count,
                    categories: categoriesResponse.data.count,
                    publishers: publishersResponse.data.count,
                    reservations: reservationsResponse.data.count
                });
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error fetching data: {error.message}</p>;

    return (
        <>
            <Sidebar />
            <Container style={{ marginLeft: '250px', marginRight: 'auto', maxWidth: '1190px' }} className="my-5">
                <h1 className="mb-4">Admin Dashboard</h1>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><FaBook /> Books</Card.Title>
                                <Card.Text>
                                    <h2>{stats.books}</h2>
                                    Total number of books in the library.
                                </Card.Text>
                                <Button variant="primary" href="/books">View Books</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><FaUserFriends /> Authors</Card.Title>
                                <Card.Text>
                                    <h2>{stats.authors}</h2>
                                    Total number of authors.
                                </Card.Text>
                                <Button variant="primary" href="/authors">View Authors</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><FaTag /> Categories</Card.Title>
                                <Card.Text>
                                    <h2>{stats.categories}</h2>
                                    Total number of categories.
                                </Card.Text>
                                <Button variant="primary" href="/categories">View Categories</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><FaBuilding /> Publishers</Card.Title>
                                <Card.Text>
                                    <h2>{stats.publishers}</h2>
                                    Total number of publishers.
                                </Card.Text>
                                <Button variant="primary" href="/publishers">View Publishers</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title><FaCalendarCheck /> Reservations</Card.Title>
                                <Card.Text>
                                    <h2>{stats.reservations}</h2>
                                    Total number of reservations.
                                </Card.Text>
                                <Button variant="primary" href="/reservations">View Reservations</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminHomePage;
