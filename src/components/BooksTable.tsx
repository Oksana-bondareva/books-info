import { useEffect, useState } from "react";
import { Container, Table, Dropdown, Row, Form, Col } from "react-bootstrap";
import { Book } from "../types/types";
import { de, fr, Faker, en, faker } from '@faker-js/faker';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLanguage } from "../context/LanguageProvider";
import React from "react";
import BookCover from "./BookCover";

const capitalizeTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
};

const generateISBN = () => {
    const parts = [
        '978',
        faker.string.numeric(1),
        faker.string.numeric(4),
        faker.string.numeric(4),
        faker.string.numeric(1)
    ];
    return parts.join('-');
};

const languages: { [key: string]: string } = {
    en: 'English',
    fr: 'French',
    de: 'German',
};

const generateReview = () => {
    return {
        name: faker.person.fullName(),
        review: capitalizeTitle(faker.word.words({ count: { min: 6, max: 15 }}))
    };
};

const generateRandomBooks = ( page: number, language: string, reviews: number, likes: number ): Book[] => {
    const faker = new Faker({
        locale: language === 'fr' ? [fr] : language === 'de' ? [de] : [en],
    });
    const reviewArray = Array.from({ length: Math.ceil(reviews) }, generateReview);

    return Array.from({ length: 20 }, (_, index) => ({
        index: page * 20 + index + 1,
        isbn: generateISBN(),
        title: capitalizeTitle(faker.word.words()),
        author: faker.person.fullName(),
        publisher: `${faker.company.name()}, ${faker.date.past().getFullYear()}`,
        reviews: reviews >= 1 ? reviewArray : (Math.random() < reviews ? [generateReview()] : []),
        likes: Math.round((Math.random() * 2 + (likes - 1)))
    }));
};

const BooksTable = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(0);
    const { language, setLanguage } = useLanguage();
    const [expanded, setExpanded] = useState<{ [isbn: string]: boolean }>({});
    const [likes, setLikes] = useState<number>(5);
    const [reviews, setReviews] = useState<number>(5);

    useEffect(() => {
        setBooks(generateRandomBooks(0, language, reviews, likes));
    }, [language, reviews, likes]);

    const fetchMoreBooks = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            setBooks(prevBooks => [...prevBooks, ...generateRandomBooks(nextPage, language, reviews, likes)]);
            return nextPage;
        });
    };

    const toggleExpanded = (isbn: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded, [isbn]: !prevExpanded[isbn],
        }));
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Dropdown onSelect={(e) => setLanguage(e || 'en')}>
                                    <Dropdown.Toggle variant="success">
                                        Change language: {languages[language] || 'English'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {Object.entries(languages).map(([key, value]) => (
                                            <Dropdown.Item key={key} eventKey={key}>
                                                {value}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Form.Group controlId="formLikes">
                                    <Form.Label>Likes</Form.Label>
                                    <Form.Control type="range" min="0" max="10" step="0.1" value={likes} onChange={(e) => setLikes(Number(e.target.value))} />
                                    <Form.Control type="number" value={likes} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formReviews">
                                    <Form.Label>Reviews</Form.Label>
                                    <Form.Control type="number" step="0.1" value={reviews} onChange={(e) => setReviews(Number(e.target.value))} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <InfiniteScroll
                dataLength={books.length}
                next={fetchMoreBooks}
                hasMore={true}
                loader={<h4>Loading...</h4>} >
                <Table striped bordered hover style={{ tableLayout: 'fixed', width: '100%' }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '10%' }}>Index</th>
                            <th style={{ width: '15%' }}>ISBN</th>
                            <th style={{ width: '25%' }}>Title</th>
                            <th style={{ width: '25%' }}>Author</th>
                            <th style={{ width: '25%' }}>Publisher</th>
                        </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                    <React.Fragment key={book.isbn}>
                        <tr onClick={() => toggleExpanded(book.isbn)} style={{ cursor: 'pointer' }}>
                            <td>{book.index}</td>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                        </tr>
                        {expanded[book.isbn] && (
                            <tr>
                                <td colSpan={5} style={{ padding: 20 }}>
                                    <div className="p-3 d-flex" >
                                        <div style={{ marginRight: '20px' }}>
                                            <BookCover title={book.title} author={book.author} />
                                            <span style={{ textAlign: 'center', backgroundColor: '#2A4480', borderRadius: '16px', padding: '5px 10px', color: 'white' }}>
                                                {book.likes} 👍🏻
                                            </span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{color: '#06266F'}}>{book.title}</h3>
                                            <span>by {book.author}</span>
                                            <p style={{color: 'grey'}}>{book.publisher}</p>
                                            <h4>Review:</h4>
                                            {book.reviews.map((review, index) => (
                                                <div key={index} className="mb-2">
                                                    <strong>{review.name}:</strong>
                                                    <p>{review.review}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                    </tbody>
                </Table>
            </InfiniteScroll>
        </Container>
    )
}

export default BooksTable;
