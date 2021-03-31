const express = require('express');
const { uuid } = require('uuidV4');
const app = express();
const projects = [];

app.use(express.json());

/**
 * parâmetros 
 * 
 * QUERY PARAMS: filtros e paginação
 * ROUTE PARAMS: identificar recursos ( para atualizar e deletar)
 * BODY PARAMS: Conteúdo na hora de criar ou editar um recurso
 */

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title 
        ?  projects.filter(project => project.title.includes(title)) 
        :  projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({error: 'não encontrado item para atualização'});
    }

    const project = {
        id,
        title, 
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0){
        return response.status(400).json({error: 'não encontrado item para deleção.'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('⚽ site no ar, bola em jogo')
});