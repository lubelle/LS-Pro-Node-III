const express = require('express');
const users = require('./users');
const books = require('./books');
// install middleware
const bodyParser = require('body-parser');

const app = express();
// all app data will run thru bodyParser.json() first
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello Express!');
});

app.get('/books', (req, res) => {
	res.send(books);
});

app.get('/books/:id', (req, res) => {
	let matchedBook;
	books.forEach((book) => {
		if (parseInt(req.params.id) === book.id ) res.send(book);
	});
});

app.post('/newbook', (req, res) => {
	const newBook = req.body;
	newBook.id = books.length + 1;
	books.push(newBook);
});

app.get('/users', (req, res)=> {
	res.send(users);
});

app.get('/user/:id', (req, res)=> {
	let matchedUser;
	users.forEach((user) => {
		if (parseInt(req.params.id) === user.id) matchedUser = user;
	});
	res.send(matchedUser);
});

app.post('/new', (req, res) => {
	const newUser = req.body;  // need to install body-parser first
	newUser.id = users.length + 1;
	users.push(newUser);
	//console.log('>>>req', req.body);
});

app.listen(3000, () => {
	console.log('app listening on port 3000');
});