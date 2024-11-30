import { BookCoverProps } from "../types/types";

const BookCover: React.FC<BookCoverProps> = ({ title, author, imageUrl }) => {

    return (
        <div className="card" style={{ width: '200px', height: '300px', marginBottom: '10px', backgroundImage: `url(${imageUrl})`, objectFit: 'cover'}}>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#e3cae0' }}>
                    <span className="card-title text-center">{title}</span>
                    <span className="card-subtitle mb-2 text-muted text-center">{author}</span>
                </div>
        </div>
    );
};

export default BookCover;