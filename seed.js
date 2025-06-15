require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');
const authorsData = require('./data/authors.json');
const booksData = require('./data/books.json');

const MONGODB_URL = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URL);

    await Author.deleteMany({});
    await Book.deleteMany({});

    const authors = await Author.insertMany(authorsData);
    const authorsMap = {};
    authors.forEach(a => { authorsMap[a.name] = a._id; });

    for (const book of booksData) {
      const authorId = authorsMap[book.author];
      if (!authorId) continue;
      await Book.create({ ...book, author: authorId });
    }

    console.log('Database was successfully seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();