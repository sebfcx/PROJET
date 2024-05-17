import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import url from 'node:url';
import { join, dirname } from 'path';
import './app/helpers/env.loader.helper.js';
import mainController from './app/controllers/mainController.js';
import { logMoment, Logger } from './app/helpers/Logger/index.js';
import userAuthController from './app/controllers/userAuthController.js';

const port = process.env.PORT || 5000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.set('views', 'app/views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'app', 'public')));

app.get('/', mainController.renderHomePage);
app.get('/contact', mainController.renderContactPage);
app.get('/mentions', mainController.renderMentionsPage);
app.get('/vehicules', mainController.renderVehiculesPage);
app.get('/transports', mainController.renderTransportsPage);

app.route('/signup')
  .get(userAuthController.renderSignupPage)
  .post(userAuthController.handleSignupForm);

app.route('/login')
  .get(userAuthController.renderLoginPage)
  .post(userAuthController.handleLoginForm);

app.route('/account')
  .get(userAuthController.renderAccountPage)
  .post(userAuthController.renderAccountPage);

app.use((_req, res) => {
  return res.render('404',
    {
      cssFile: '404.css',
      pageTitle: 'Page introuvable'
    }
  );
});

app.listen(port, () => {
  Logger.info(`${logMoment.dateAndTime}: Listening on http://localhost:${port}`);
});


export default app;
