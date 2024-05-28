import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import url from 'node:url';
import { join, dirname } from 'path';
import router from './routers/router.js';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'"]
  }
}));

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

const corsOptions = {
  origin: ['*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use(router);

app.use((req, res) => {
  return res.render('404',
    {
      cssFile: '404.css',
      pageTitle: 'Page introuvable'
    }
  );
});

export default app;