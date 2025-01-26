import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import db from "./firebase/firebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import "./styles/App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const booksCollection = collection(db, "books");

  // Fetch books from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooks(booksData);
      setFilteredBooks(booksData);
    });
    return () => unsubscribe();
  }, []);

  // Filter books based on search term
  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.Heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Paragraph.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  // Add a new book
  const addBook = async (newBook) => {
    await addDoc(booksCollection, newBook);
  };

  // Update a book
  const updateBook = async (updatedBook) => {
    const bookDoc = doc(db, "books", updatedBook.id);
    await updateDoc(bookDoc, updatedBook);
  };

  // Delete a book
  const deleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Table
          data={filteredBooks}
          setSearchTerm={setSearchTerm}
          addItem={addBook}
          updateItem={updateBook}
          deleteItem={deleteBook}
          columns={[
            { header: "Heading", accessor: "Heading" }, // Direct field mapping
            { header: "Paragraph", accessor: "Paragraph" }, // Direct field mapping
            {
              header: "Optional Paragraph",
              accessor: (item) =>
                item.optionalParagraph ? item.optionalParagraph : "No optional paragraph",
            }, // Optional field
            {
              header: "Image",
              accessor: (item) => (
                <img
                  src={item.imageURL}
                  alt={`${item.Heading} thumbnail`}
                  style={{ width: "100px", height: "auto", borderRadius: "8px" }}
                />
              ),
            }, // Image URL
          ]}
        />
      </div>
    </div>
  );
}

export default App;
