const express = require('express');
const router = express.Router();
const AgendaController = require('../controllers/AgendaController');
const AuthMiddleware = require('../middleware/authMiddleware');


router.get('/register', AgendaController.renderNovoContato);
router.post('/register', AgendaController.novoContato);


router.get('/listar', AgendaController.renderListarContatos)
//router.get('/listar', AgendaController.listarContatos);

router.get('/editar', AgendaController.renderEditarContato)
router.put('/editar', AgendaController.editarContato)

module.exports = router;