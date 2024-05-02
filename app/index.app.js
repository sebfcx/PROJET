import express from 'express';
import helmet from 'helmet';
import router from './routers/index.router.js';

const app = express();

app.use(helmet());

app.set('views', 'app/views');
app.set('view engine', 'ejs');

app.use(express.static('./app/public'));

app.use(router);

app.use((req, res) => {
  res.render('404');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error");
});

export default app;
