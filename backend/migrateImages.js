const mongoose = require('mongoose');
const Book = require('./models/book');

const MONGO_URI = 'REMOVED_MONGO_URI';
const PUBLIC_URL = 'https://ocr-live-monvieuxgrimoire.onrender.com';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');

    const books = await Book.find({});

    for (const book of books) {
      if (book.imageUrl.includes('localhost:4000')) {
        const filename = book.imageUrl.split('/images/')[1];
        book.imageUrl = `${PUBLIC_URL}/images/${filename}`;
        await book.save();
        console.log(`Updated book ${book.title}`);
      }
    }

    console.log('Done updating images');
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));
