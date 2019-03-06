const express = require('express');
const bodyParser = require('body-parser');
const giveMeAJoke = require('give-me-a-joke');
const randomName = require('random-name')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let jokeCount = 0;

app.get('/', (req, res, next) => {
    res.sendFile('index.html');
})

app.post('/api/random-joke', (req, res, next) => {
    jokeCount += 1;
    if (req.body.firstName && req.body.lastName) {
        const fn = req.body.firstName;
        const ln = req.body.lastName;
        giveMeAJoke.getCustomJoke(fn, ln, (joke) => {
            res.send({ joke: joke });
        });
    } else {
        // malformed POST request parameters
        next(new Error('Malformed POST request'));
    }
});

app.get('/api/random-name', (req, res) => {
    res.send({ first: randomName.first(), last: randomName.last() });
})

app.get('/api/joke-count', (req, res) => {
    res.send({ jokeCount: jokeCount });
})

// 404, no matching route found
app.use((req, res) => {
    res.status(404).send("Invalid API route");
})

// route for handling errors
app.use((err, req, res) => {
    res.status(400).send(err);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});