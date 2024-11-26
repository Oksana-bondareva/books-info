import { useEffect, useState } from "react";
import { Container, Table, Dropdown } from "react-bootstrap";
import { Book } from "../types/types";
import { de, fr, Faker, en, faker } from '@faker-js/faker';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLanguage } from "../context/LanguageProvider";

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

const generateRandomBooks = ( page: number, language: string ): Book[] => {
    const faker = new Faker({
        locale: language === 'fr' ? [fr] : language === 'de' ? [de] : [en],
    });

    return Array.from({ length: 20 }, (_, index) => ({
        index: page * 20 + index + 1,
        isbn: generateISBN(),
        title: capitalizeTitle(faker.word.words()),
        author: faker.person.fullName(),
        publisher: `${faker.company.name()}, ${faker.date.past().getFullYear()}`,
    }));
};

const BooksTable = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(0);
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        setBooks(generateRandomBooks(0, language));
    }, [language]);

    const fetchMoreBooks = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            setBooks(prevBooks => [...prevBooks, ...generateRandomBooks( nextPage, language )]);
            return nextPage;
        });
    };

    return (
        <Container>
           <Dropdown className="mb-3" onSelect={(e) => setLanguage(e || 'en')}>
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