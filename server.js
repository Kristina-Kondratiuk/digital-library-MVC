require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error: ", error);
    });

app.get('/', (req, res) => {
    res.redirect('/books');
});
    
app.use((req, res) => {
    res.status(404).render('partials/404');
});

app.use((err, req, res, next) => {
    res.status(500).render('partials/error', { message: err.message || null });
});  