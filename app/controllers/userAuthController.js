import { Logger } from "../helpers/Logger/index.js"
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import dataMapper from '../models/dataMapper.js';

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
    const { firstname, lastname, email, password, confirmation, } = req.body
    
    console.log(req.body)
    
    if (!firstname || !lastname || !email || !password || !confirmation) {
      console.log(firstname)
      return res.render('signup', { errorMessage: 'Tous les messages sont obligatoires' });
    }

    if (!emailValidator.validate(email)) {
      return res.render('signup', { errorMessage: "Le format de l'email n'est pas valide" });
    }

    if (password !== confirmation) {
      return res.render('signup', { errorMessage: 'Les mots de passes ne correspondent pas' });
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
      
      console.log(user);
      
      res.redirect('login');
    }
  },

  async handleLoginForm(req, res) {
    const { email, password } = req.body;
    
    console.log(req.body)

    const member = await dataMapper.findMemberByEmail(email);

    if (!member) {
      return res.render('login', { errorMessage: 'Mauvais couple email/password' });
    }

    const isMatching = await bcrypt.compare(password, member.password);

    if (!bcrypt.compare(password, member.password)) {
      return res.render('signup', { errorMessage: "Mot de passe incorrect" });
    }

    if (!isMatching) {
      return res.render('login', { errorMessage: 'Mauvais couple email/password' });
    }
    return res.redirect('account');

  },

};

export default userAuthController;
