import React, { useEffect, useState } from "react";
import "./Home.css";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Modal,
  Box,
  Typography,
  
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const booksPerPage = 7; // Number of books per page

  const [refresh,setRefresh] = useState(false)

  // Modal state for editing
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/books");
        const data = await response.json();
        console.log(data);
        if (data && data.data) {
          setBooks(data.data);  // Setting books array
          setFilteredBooks(data.data);  // Setting filteredBooks to an array
        } else {
          setError("Invalid data format");
        }
        setIsLoaded(true);
      } catch (error) {
        setError(error.message);
        setIsLoaded(true);
      }
    };
    fetchBooks();
  }, [refresh]);

  // Filter books based on search input
  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.Genre.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [search, books]);

  // Pagination logic: get the books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Handlers for actions
  const handleViewDetails = (id) => {
    console.log("View details for book ID:", id);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book); // Set the selected book to edit
    setOpen(true); // Open the modal
    setRefresh(!refresh)
  };

  const handleDeleteBook = async (id) => {
    // Show a confirmation dialog to the user
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
  
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setBooks(books.filter((book) => book._id !== id)); // Update local state to remove deleted book
          setFilteredBooks(filteredBooks.filter((book) => book._id !== id)); // Update filtered books as well
          setRefresh(!refresh)
        } else {
          console.error('Failed to delete the book');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    } else {
      // User canceled the deletion, no action needed
      console.log("Deletion canceled.");
    }
  };
  

  // Handle update logic
  const handleUpdateBook = async () => {
    if (!selectedBook) return;

    try {
      const response = await fetch(`http://localhost:5000/books/${selectedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedBook),
      });
      if (response.ok) {
        // Refresh the book list after update
        const updatedBook = await response.json();
        setBooks(books.map(book => book._id === updatedBook._id ? updatedBook : book));
        setFilteredBooks(filteredBooks.map(book => book._id === updatedBook._id ? updatedBook : book));
        setOpen(false); // Close the modal after updating
        setRefresh(!refresh)
      } else {
        console.error('Failed to update the book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Modal close handler
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedBook(null); // Reset selected book
  };

  // Change page handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Header />
      <Container>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <h1>Books</h1>
          <div>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by Title, Author, or Genre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!isLoaded ? (
          <CircularProgress />
        ) : (
          <TableContainer style={{ marginTop: "20px" }} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="books table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBooks.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell component="th" scope="row">
                      {book.title}
                    </TableCell>
                    <TableCell align="right">{book.author}</TableCell>
                    <TableCell align="right">{book.Genre}</TableCell>
                    <TableCell align="right">
                      <Link to={`/books/${book._id}`}>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleViewDetails(book._id)}
                      >
                        View Details
                      </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="success"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Stack spacing={2} style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Pagination
            count={Math.ceil(filteredBooks.length / booksPerPage)} // Calculate total pages
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>

        {/* Modal for editing a book */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>Edit Book</Typography>
            <TextField
              label="Title"
              fullWidth
              value={selectedBook?.title || ''}
              onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Author"
              fullWidth
              value={selectedBook?.author || ''}
              onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Genre"
              fullWidth
              value={selectedBook?.Genre || ''}
              onChange={(e) => setSelectedBook({ ...selectedBook, Genre: e.target.value })}
              style={{ marginBottom: "20px" }}
            />
            <LocalizationProvider   dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Published Date"
                value={selectedBook?.publishedDate ? new Date(selectedBook.publishedDate) : null}
                onChange={(newValue) => setSelectedBook({ ...selectedBook, publishedDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
                style={{ marginBottom: "20px" }}
              />
            </LocalizationProvider>

            <div style={{ display: "flex", justifyContent: "space-between",marginTop:"20px" }}>
              <Button onClick={handleCloseModal} variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button onClick={handleUpdateBook} variant="outlined" color="primary">
                Update
              </Button>
            </div>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
