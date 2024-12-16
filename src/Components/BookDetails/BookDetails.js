import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access URL params
import Header from '../Header/Header';
import { Container } from 'react-bootstrap';

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL params
  const [book, setBook] = useState(null); // State to hold the book details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the book details when the component mounts
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data.data); // Set the fetched book data
        setIsLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Handle errors
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]); // Dependency on id, will re-fetch when id changes

  return (
    <div>
      <Header />
      <Container>
        <h1>Book Details</h1>
            <div style={{
                height:"80vh",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent:"center"
            
            }}>

            {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {book && !isLoading && !error && (
          <div>
            <h3 className='text-success'>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.Genre}</p>
            <p><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
          </div>
        )}
            </div>
        
      </Container>
    </div>
  );
};

export default BookDetails;
