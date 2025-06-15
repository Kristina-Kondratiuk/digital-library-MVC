const Author = require("../models/Author");
const Book = require("../models/Book");

exports.listAuthors = async (req, res) => {
  try {
    const query = req.query.q || "";
    let filter = {};

    if (query) {
      filter = { name: { $regex: query, $options: "i" } };
    }

    const authors = await Author.find(filter).sort({ name: 1 });
    res.render("authors/list", { authors, query, activePage: "authors" });
  } catch (err) {
    res.status(500).send("Error loading authors");
  }
};

exports.showAddForm = (req, res) => {
  res.render("authors/add", { activePage: "authors" });
};

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const newAuthor = new Author({ name });
    await newAuthor.save();
    res.redirect("/authors");
  } catch (err) {
    res.status(400).send("Error adding author");
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.render("authors/edit", { author, activePage: "authors" });
  } catch (err) {
    res.status(500).send("Error loading author for edit");
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    await Author.findByIdAndUpdate(req.params.id, { name });
    res.redirect("/authors");
  } catch (err) {
    res.status(400).send("Error updating author");
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.redirect("/authors");
  } catch (err) {
    res.status(500).send("Error deleting author");
  }
};

exports.showAuthorBooks = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).render("partials/404");

    const books = await Book.find({ author: author._id }).sort({ year: 1 });

    res.render("authors/authorBooks", { author, books, activePage: "authors" });
  } catch (err) {
    res
      .status(500)
      .render("partials/error", { message: "Error loading author's books" });
  }
};
