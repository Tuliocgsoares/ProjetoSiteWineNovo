const express = require('express');

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// ======================
// Rotas Públicas
// (Usuários não logados)
// ======================

// Renderiza a página inicial de login
// Utiliza o middleware redirectAuthenticatedUser para redirecionar o usuário logado
router.get('/login', AuthController.renderLogin);

// Renderiza a página de cadastro de usuário
// Utiliza o middleware redirectAuthenticatedUser para redirecionar o usuário logado
router.get('/formCadastro', UserController.renderFormCadastro);

// Rota para fazer o login do usuário
router.post('/login', AuthController.login);

// Rota para cadastrar um novo usuário
router.post('/cadastro', UserController.create);

// Rota para renderizar a página de recuperação de senha
router.get('/novaSenha', UserController.renderNovaSenha); 

// Rota para recuperação de senha
router.post('/novaSenha', UserController.NovaSenha); 

// Renderiza a página que mostra que a recuperação de senha foi enviada
router.get('/recuperacaoSenha', UserController.renderRecuperacaoSenha);

// Renderiza a página sobre nós
router.get('/sobre', UserController.renderSobre);

// Renderiza a página trabalhe conosco
router.get('/trabalhe', UserController.renderTrabalheConosco);

// Renderiza a página inicial (index)
router.get('/', UserController.renderIndex);



module.exports = router;