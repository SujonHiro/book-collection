const express=require('express')
const bodyPerser=require('body-parser')
const app=express()
app.use(bodyPerser.json())



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  let books=[]
  app.get('/books', (req, res) => {
    res.json(books);
  });

  app.post('/books', (req, res) => {
    const {title, author, publishedDate} = req.body;

    const id = Date.now().toString();
const newBook = {
    id,
    title: title,
    author: author,
    publishedDate: publishedDate
  };

  books.push(newBook);
  res.json(newBook);
});

// Route to delete a book from the collection
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
  
    // Find the index of the book with the specified ID
    const bookIndex = books.findIndex(book => book.id === id);
  
    if (bookIndex !== -1) {
      // Remove the book from the collection
      books.splice(bookIndex, 1);
      res.json({ message: 'Book deleted successfully!' });
    } else {
      res.json({ message: 'Book not found.' });
    }
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});