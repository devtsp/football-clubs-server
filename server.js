const {
	createClub,
	deleteClub,
	getAllClubs,
	getClub,
	editClub,
} = require('./club_controller.js');

const fs = require('fs');
const cors = require('cors');

const express = require('express');
const PORT = 8080;
const app = express();

const multer = require('multer');
const upload = multer({ dest: './public/uploads/img' });

app.use(cors());
app.use(express.static('./public'));

app.get('/', (req, res) => {
	const clubs = getAllClubs();
	res.status(200).json(clubs);
});

app.post('/', upload.single('crest'), (req, res) => {
	const posted = createClub(req);
	res.status(200).json(posted);
});

app.get('/:id', (req, res) => {
	const gotten = getClub(req);
	res.status(200).json(gotten);
});

app.delete('/:id', (req, res) => {
	const deleted = deleteClub(req);
	res.status(200).json(deleted);
});

app.patch('/:id', upload.single('crest'), (req, res) => {
	const edited = editClub(req);
	res.json(edited);
});

app.get('*', (req, res) => {
	res.status(404).json({ message: 'The resource does not exists.' });
});

app.listen(process.env.PORT || PORT);
console.log(`Listening on http://localhost:${PORT}`);
