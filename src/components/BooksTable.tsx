import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Book } from "../types/types";
import { faker } from '@faker-js/faker';
import InfiniteScroll from "react-infinite-scroll-component";

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

const generateRandomBooks = ( page: number ): Book[] => {
    return Array.from({ length: 20 }, (_, index) => ({
        index: page * 20 + index + 1,
        isbn: generateISBN(),
        title: capitalizeTitle(faker.lorem.words()),
        author: faker.person.fullName(),
        publisher: `${faker.company.name()}, ${faker.date.past().getFullYear()}`,
    }));
};

const BooksTable = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setBooks(generateRandomBooks(0));
    }, []);

    const fetchMoreBooks = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            setBooks(prevBooks => [...prevBooks, ...generateRandomBooks( nextPage )]);
            return nextPage;
        });
    };

    return (
        <Container>
            <InfiniteScroll
                dataLength={books.length}
                next={fetchMoreBooks}
                hasMore={true}
                loader={<h4>Loading...</h4>} >
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>Index</th>
                            <th>ISBN</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book: Book) => (
                            <tr key={book.isbn}>
                                <td>{book.index}</td>
                                <td>{book.isbn}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </InfiniteScroll>
        </Container>
    )
}

export default BooksTable;