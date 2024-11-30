import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Book } from "../types/types";
import BookCover from "./BookCover";
import InfiniteScroll from "react-infinite-scroll-component";

const BooksGallery: React.FC<{ books: Book[], fetchMoreBooks: () => void }> = ({ books, fetchMoreBooks }) => {
    return (
        <InfiniteScroll
            dataLength={books.length}
            next={fetchMoreBooks}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
        >
            <Row>
                {books.map((book) => (
                    <Col key={book.isbn} md={4} className="d-flex align-items-stretch mb-4">
                        <Card className="w-100">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <BookCover title={book.title} author={book.author} imageUrl={book.imageUrl} />
                                <Card.Title className="mt-3">{book.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">by {book.author}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Publisher:</strong> {book.publisher}
                                    <br />
                                    <strong>Likes:</strong> {book.likes} 👍🏻
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </InfiniteScroll>
    );
};

export default BooksGallery;
