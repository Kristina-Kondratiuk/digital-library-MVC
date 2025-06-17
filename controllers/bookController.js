const Book = require("../models/Book");
const Author = require("../models/Author");

exports.listBooks = async (req, res) => {
  try {
    const query = req.query.q || "";
    const sort = req.query.sort || "";
    let filter = {};

    let authorIds = [];

    if (query) {
      const matchingAuthors = await Author.find({
        name: { $regex: query, $options: "i" }
      });
      authorIds = matchingAuthors.map(a => a._id);

      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { genre: { $regex: query, $options: "i" } },
          { author: { $in: authorIds } }
        ],
      };
    }

    const perPage = 10;
    const page = parseInt(req.query.page) || 1;

    let books = await Book.find(filter).populate("author");

    if (sort === "title_asc")
      books.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "title_desc")
      books.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "year_asc") books.sort((a, b) => a.year - b.year);
    if (sort === "year_desc") books.sort((a, b) => b.year - a.year);
    if (sort === "author_asc")
      books.sort((a, b) => {
        if (!a.author || !b.author) return 0;
        return a.author.name.localeCompare(b.author.name);
      });
    if (sort === "author_desc")
      books.sort((a, b) => {
        if (!a.author || !b.author) return 0;
        return b.author.name.localeCompare(a.author.name);
      });
    const totalBooks = books.length;
    const totalPages = Math.ceil(totalBooks / perPage);

    const paginatedBooks = books.slice((page - 1) * perPage, page * perPage);

    res.render("books/list", {
      books: paginatedBooks,
      query,
      sort,
      page,
      totalPages,
      activePage: "books",
    });
  } catch (err) {
    res.status(500).send("Error loading books");
  }
};

exports.showAddForm = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    const genresArr = await Book.distinct("genre");
    const genres = genresArr.filter((g) => g && g.trim() !== "");
    res.render("books/add", { authors, genres, activePage: "books" });
  } catch (err) {
    res.status(500).send("Error loading form");
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, authorOrNew, year, genre, description } = req.body;
    let authorId = null;

    let existingAuthor = await Author.findOne({
      name: { $regex: new RegExp("^" + authorOrNew.trim() + "$", "i") },
    });

    if (existingAuthor) {
      authorId = existingAuthor._id;
    } else {
      const createdAuthor = new Author({ name: authorOrNew.trim() });
      await createdAuthor.save();
      authorId = createdAuthor._id;
    }

    const newBook = new Book({
      title,
      author: authorId,
      year,
      genre,
      description,
    });
    await newBook.save();
    res.redirect("/books");
  } catch (err) {
    res.status(400).send("Error adding book");
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const authors = await Author.find().sort({ name: 1 });
    if (!book) return res.status(404).send("Book not found");
    res.render("books/edit", { book, authors, activePage: "books" });
  } catch (err) {
    res.status(500).send("Error loading book for edit");
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, year, genre, description } = req.body;
    await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      year,
      genre,
      description,
    });
    res.redirect("/books");
  } catch (err) {
    res.status(400).send("Error updating book");
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    res.status(500).send("Error deleting book");
  }
};

exports.showDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) return res.status(404).render("partials/404");
    const fromAuthor = req.query.fromAuthor || null;
    res.render("books/details", { book, fromAuthor, activePage: "books" });
  } catch (err) {
    res.status(500).send("Error loading book details");
  }
};
