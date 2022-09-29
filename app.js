const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const checkoutRouter = require('./routes/checkout');
const cadastroRouter = require('./routes/cadastro');
const novaSenhaRouter = require('./routes/novaSenha');
const pagamentoRouter = require('./routes/pagamento');
const perfilUsuarioRouter = require('./routes/perfilUsuario');
const historicoPedidosRouter = require('./routes/historicoPedidos');
const produtosRouter = require('./routes/produtos');
const sobreRouter = require('./routes/sobre');
const itemRouter = require('./routes/item');
const trabalheRouter = require('./routes/trabalhe');



const methodOverride = require('method-override');
const initialRoutes = require('./routes/initial.routes');
const usersRoutes = require('./routes/users.routes');






const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/checkout', checkoutRouter);
app.use('/cadastro', cadastroRouter);
app.use('/novaSenha', novaSenhaRouter);
app.use('/pagamento', pagamentoRouter);
app.use('/perfilUsuario', perfilUsuarioRouter);
app.use('/historicoPedidos', historicoPedidosRouter);
app.use('/produtos', produtosRouter);
app.use('/sobre', sobreRouter);
app.use('/item', itemRouter);
app.use('/trabalhe', trabalheRouter);








// permitir que o servidor use o método PUT e DELETE
app.use(methodOverride('_method'));


// rotas
app.use('/', initialRoutes);
app.use('/users', usersRoutes);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
   res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
