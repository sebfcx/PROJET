import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import dataMapper from '../models/dataMapper.js';

const userAuthController = {

  renderLoginPage(_, res) {
    return res.render('login');
  },
  renderSignupPage(_, res) {
    return res.render('signup');
  },
  renderAccountPage(_, res) {
    return res.render('account');
  },

  async handleSignupForm(req, res) {
    const { firstname, lastname, email, password, confirmation } = req.body

    if (!firstname || !lastname || !email || !password || !confirmation) {
      return res.render('signup', { errorMessage: 'Tous les messages sont obligatoires' });
    }

    if (password !== confirmation) {
      return res.render('signup', { errorMessage: 'Les mots de passes ne correspondent pas' });
    }
    if (!emailValidator.validate(email)) {
      return res.render('signup', { errorMessage: "Le format de l'email n'est pas valide" });
    }
    if (password.length < 8) {
      return res.render('signup', { errorMessage: 'Le mot de passe doit contenir au moins 8 caractères' });
    }

    const alreadyExistingUser = await dataMapper.findUserByEmail(email);
    if (alreadyExistingUser) {
      return res.render('signup', { errorMessage: 'Cet email est invalide' });
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

export default (userAuthController);
