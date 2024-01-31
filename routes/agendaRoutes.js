const express = require('express');
const router = express.Router();
const AgendaController = require('../controllers/agendaController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.get('/register', AgendaController.renderNovoContato);
router.post('/register', AgendaController.novoContato);

router.get('/listar', AgendaController.renderListarContatos)

router.post('/excluir/:id', AgendaController.excluirContato);

router.get('/editar/:id', AgendaController.renderEditarContato);
router.put('/editar/:id', AgendaController.editarContato);

module.exports = router;