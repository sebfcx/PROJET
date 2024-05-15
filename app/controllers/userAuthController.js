import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import dataMapper from '../models/dataMapper.js';
import { Logger } from '../helpers/Logger/index.js';

const userAuthController = {

  renderAccountPage(_, res) {
    Logger.silly('Now serving page Account')
    return res.render('account', { cssFile: 'account.css', pageTitle: 'Account' });
  },

  renderLoginPage(_, res) {
    Logger.silly('Now serving page Login')
    return res.render('login', { cssFile: 'login.css', pageTitle: 'Login' });
  },

  renderSignupPage(_, res) {
    Logger.silly('Now serving page Signup')
    return res.render('signup', { cssFile: 'signup.css', pageTitle: 'Signup' });
  },

  async handleSignupForm(req, res) {
    const { firstname, lastname, email, password, confirmation } = req.body

    if (!firstname || !lastname || !email || !password || !confirmation) {
      res.render('signup', { errorMessage: 'Tous les messages sont obligatoires' });
      return;
    }

    if (password !== confirmation) {
      res.render('signup', { errorMessage: 'Les mots de passes ne correspondent pas' });
      return;
    }
    if (!emailValidator.validate(email)) {
      res.render('signup', { errorMessage: "Le format de l'email n'est pas valide" });
      return;
    }
    if (password.length < 8) {
      res.render('signup', { errorMessage: 'Le mot de passe doit contenir au moins 8 caractères' });
      return;
    }

    const alreadyExistingUser = await dataMapper.findUserByEmail(email);
    if (alreadyExistingUser) {
      res.render('signup', { errorMessage: 'Cet email est invalide' });
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await dataMapper.createUser(firstname, lastname, email, hashedPassword);
    if (user) {
      res.redirect('login');
    }
  },

  async handleLoginForm(req, res) {
    const { email, password } = req.body;

    const user = await dataMapper.findUserByEmail(email);

    if (!user) {
      return res.render('login', { errorMessage: 'Mauvais couple email/password' });
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
      return res.render('login', { errorMessage: 'Mauvais couple email/password' });
    }
    return res.redirect('account');
  },
  
};

export default userAuthController;
