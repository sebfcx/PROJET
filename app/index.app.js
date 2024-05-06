import express from 'express';
import helmet from 'helmet';
import router from './routers/index.router.js';

const app = express();

app.use(helmet());

app.set('views', 'app/views');
app.set('view engine', 'ejs');

app.use(express.static('./app/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res) => {
  res.render('404');
});


export default app;
