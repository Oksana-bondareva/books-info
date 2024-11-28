import { BookCoverProps } from "../types/types";

const BookCover: React.FC<BookCoverProps> = ({ title, author }) => {
    return (
        <div className="card" style={{ width: '200px', height: '300px', backgroundColor: '#9c80a6', marginBottom: '10px' }}>
            <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{backgroundColor: '#e3cae0'}}>
                <h5 className="card-title text-center">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-center">{author}</h6>
            </div>
        </div>
    );
};

export default BookCover;