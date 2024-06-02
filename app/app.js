import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import url from 'node:url';
import { join, dirname } from 'path';
import router from './routers/router.js';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "https://localhost"],
      "script-src-attr": ["'none'", "'unsafe-inline'", "https://localhost"]
    },
  },
})
);

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

const corsOptions = {
  origin: ['*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: process.env.KEY_SESSION || "secretKeySession",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 60000
  }
}));

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