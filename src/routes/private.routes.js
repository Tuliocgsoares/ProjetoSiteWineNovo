const express = require('express');

const AuthController = require('../controllers/AuthController');

const router = express.Router();

// ==================
// Rotas Privadas
// (Usuários logados)
// ==================

// Renderiza a página restrita
router.get('/restrito', AuthController.renderAreaRestrita);

// Rota para fazer o logout do usuário
router.post('/logout', AuthController.logout);

// Renderiza a página de histórico de compras
router.get('/pedidos', AuthController.renderHistoricoPedidos);

// Rota para acessar o histórico de compras a partir da página de usuários
router.post('/pedidos', AuthController.pedidos);

// Rota para acessar a página de pagamento
router.get('/pagamento', AuthController.renderPagamento);

//Rota para acessar a página de checkout
router.get('/checkout', AuthController.renderCheckout);

module.exports = router;