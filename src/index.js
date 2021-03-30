const express = require('express');
const uuid = require('uuid');

const app = express();

const projects = [];

app.get('/projects', (request, response) => {
    const {title, owner} = request.query;

    console.log();

    return response.send({});
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.query;body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});



app.listen(3333, () => {
    console.log('⚽ site no ar, bola em jogo')
});