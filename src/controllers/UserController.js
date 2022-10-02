// ========================================================
// Controller responsável por gerenciar os dados do usuário
// (Ex: cadastro, atualização, exclusão)
// ========================================================

const bcrypt = require('bcrypt');

const User = require('../models/User');

const saltRounds = 10;

const UserController = {
  create: (req, res) => {
    console.log(req.body);
    // Pega os dados do usuário do corpo da requisição
    const { email, senha, nome, sobrenome, endereco } = req.body;

    // Faz a criptografia da senha
    const hash = bcrypt.hashSync(senha, saltRounds);
    
    // Chama a model para criar um novo usuário
    // Passando o email, a senha criptografada, o nome, o sobrenome e o endereço
    User.create({ email, senha: hash, nome, sobrenome, endereco });
    
    // Redireciona para a página de login
    res.redirect('/login');
  },

  renderFormCadastro: (req, res) => {
    // Verifica se o usuário está logado
    // Ou seja, se existe uma sessão para o usuário
    if (req.session.user != undefined) {
      // Se estiver logado, redireciona para a página restrita
      return res.redirect('/restrito');
    }
    
    // Renderiza a página de cadastro de usuário
    return res.render('formCadastro');
  },

  NovaSenha: (req, res) => {
    // pega os dados de email do usuário no corpo da requisição
    const { email } = req.body;

    // Verifica se o email fornecido já existe no banco de dados
    const usuario = User.findByEmail(email);

    // Verifica se o email já está cadastrado
    if (!usuario) {
      // Se não existir, renderiza a página de recuperação de senha com erro
      return res.render('novaSenha', { error: 'Email não cadastrado' });
    } else {
      // Se existir, renderiza a página de recuperação de senha com sucesso
      return res.render('recuperacaoSenha', { error: 'Link para recuperação de senha enviado' });

    }
  },

  renderNovaSenha: (req, res) => {
    //renderiza a página de recuperação de senha
    return res.render('novaSenha');
  },

  renderRecuperacaoSenha: (req, res) => {
    // Renderiza a página que mostra que a recuperação de senha foi enviada
    return res.render('recuperacaoSenha');
  },

  renderSobre: (req, res) => {
    // Renderiza a página sobre nós
    return res.render('sobre');
  },

  renderTrabalheConosco: (req, res) => {
    // Renderiza a página trabalhe conosco
    return res.render('trabalhe');
  },

  renderIndex: (req, res) => {
    // Renderiza a página inicial (index)
    return res.render('index');
  }
}

module.exports = UserController;