import React, { useState } from 'react';
import Header from '../Header/Header';
import { Container } from 'react-bootstrap';
import { TextField, Button } from '@mui/material';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    Genre: '',
    pages: '',
    publishedDate: '',
  });

  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.Genre ||
      !bookData.pages ||
      !bookData.publishedDate
    ) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      console.log(response)

      if (response.ok) {
        alert('Book added successfully');
        // Reset form
        setBookData({
          title: '',
          author: '',
          Genre: '',
          pages: '',
          publishedDate: '',
        });
        setError(null);
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Add Book</h1>
        <div
          style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <form
            style={{ width: '100%', maxWidth: '400px' }}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              value={bookData.title}
              onChange={handleInputChange}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Author"
              name="author"
              variant="outlined"
              fullWidth
              value={bookData.author}
              onChange={handleInputChange}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Genre"
              name="Genre"
              variant="outlined"
              fullWidth
              value={bookData.Genre}
              onChange={handleInputChange}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Pages"
              name="pages"
              variant="outlined"
              fullWidth
              type="number"
              value={bookData.pages}
              onChange={handleInputChange}
              style={{ marginBottom: '10px' }}
            />
            <p>Published Date</p>
            <TextField
              
              name="publishedDate"
              variant="outlined"
              fullWidth
              type="date"
              value={bookData.publishedDate}
              onChange={handleInputChange}
              style={{ marginBottom: '20px' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="submit" variant="contained" color="primary">
              Add Book
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddBook;
