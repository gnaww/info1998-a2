const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());




// 404, no matching route found
app.use(function (req, res, next) {
    res.status(404).send("Invalid API route")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});