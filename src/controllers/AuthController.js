// ========================================================
// Controller responsável por gerenciar a sessão do usuário
// (Ex: login, logout)
// ========================================================

const bcrypt = require('bcrypt');

const User = require('../models/User');

const UserController = {
  login: (req, res) => {
    // Pega os dados do usuário do corpo da requisição
    const { email, senha } = req.body;

    // Chama a model para buscar um usuário pelo email
    const usuario = User.findByEmail(email);

    // Verifica se o usuário existe
    if (!usuario) {
      // Se não existir, renderiza a página de login com erro
      return res.render('login', { error: 'Email ou senha inválidos' });
    }

    // Verifica se a senha informada é a mesma que a senha criptografada no db
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    // Verifica se a senha é válida
    if (!senhaValida) {
      // Se a senha for inválida, renderiza a página de login com erro
      return res.render('login', { error: 'Email ou senha inválidos' });
    }

    // Se o email e a senha forem válidos, cria uma sessão para o usuário
    // Salvando o email, o id do usuário na sessão, o nome, o sobrenome e o endereco
    req.session.user = { email: usuario.email, id: usuario.id, nome: usuario.nome, sobrenome: usuario.sobrenome, endereco: usuario.endereco };

    // Redireciona para a página restrita
    return res.redirect('/restrito');
  },

  logout: (req, res) => {
    // Destroi a sessão do usuário
    req.session.destroy();

    // Redireciona para a página inicial
    return res.redirect('/login');
  },

  renderLogin: (req, res) => {
    // Verifica se o usuário está logado
    // Ou seja, se existe uma sessão para o usuário
    if (req.session.user != undefined) {
      // Se estiver logado, redireciona para a página restrita
      return res.redirect('/restrito');
    }

    // Renderiza a página de login
    return res.render('login',  { error: null });
  },

  renderAreaRestrita: (req, res) => {
    // Busca o usuário na sessão
    const user = req.session.user;
    // Renderiza a página restrita passando os dados do usuário logado
    return res.render('areaRestrita',  { user });
  },

  pedidos: (req, res) => {
  // redireciona para a página de pedidos quando o usuário está logado
  return res.redirect('/pedidos');
  },

  renderHistoricoPedidos: (req, res) => {
    // Renderiza a página de pedidos
    return res.render('historicoPedidos');
  },

renderPagamento: (req, res) => {
  // Renderiza a página de pagamento
  return res.render('pagamento');
  },

renderCheckout: (req, res) => {
  // Renderiza a página de checkout
  return res.render('checkout');
  }

}
module.exports = UserController;