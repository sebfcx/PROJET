import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import dataMapper from '../models/dataMapper.js';

const userAuthController = {

  renderAccountPage(_, res) {
    return res.render('account', { cssFile: 'account.css', pageTitle: 'Account' });
  },

  renderLoginPage(_, res) {
    return res.render('login', { cssFile: 'login.css', pageTitle: 'Login', errorMessage: '' });
  },

  renderSignupPage(_, res) {
    return res.render('signup', { cssFile: 'signup.css', pageTitle: 'Signup', errorMessage: '' });
  },

  async handleSignupForm(req, res) {
    const { firstname, lastname, email, password, confirmation, } = req.body
    
    if (!firstname || !lastname || !email || !password || !confirmation) {
      return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Tous les messages sont obligatoires' });
    }

    if (!emailValidator.validate(email)) {
      return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: "Le format de l'email n'est pas valide" });
    }

    if (password !== confirmation) {
      return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Les mots de passes ne correspondent pas' });
    }

    if (password.length < 8) {
      return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Le mot de passe doit contenir au moins 8 caractères' });
    }

    const forbiddenWords = /\b(insert|drop|update|select)\b/i;

    if (forbiddenWords.test(firstname) || forbiddenWords.test(lastname) || forbiddenWords.test(email)) {
      return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Sérieusement?!' });
    }

    try{

      const alreadyExistingUser = await dataMapper.findMemberByEmail(email);
      
      if (alreadyExistingUser) {
        return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Membre déjà existant' });
      }
  
      const salt = await bcrypt.genSalt(10);
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await dataMapper.createMember(firstname, lastname, email, hashedPassword);
  
      if (user) {
        return res.redirect('login');
      } else {
        return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Une erreur est survenue lors de la création' });
      }
    
    } catch (error) {
      return res.render('signup', { cssFile: 'signup.css', pageTitle: 'signup', errorMessage: 'Une erreur interne est survenue' });
    }
  },


  async handleLoginForm(req, res) {
    const { email, password } = req.body;

    try {
      const member = await dataMapper.findMemberByEmail(email);
  
      if (!member) {
        return res.render('login', { cssFile: 'login.css', pageTitle: 'Login', errorMessage: 'Mauvais couple email/password' });
      }
  
      const isMatching = await bcrypt.compare(password, member.password);
  
      if (!bcrypt.compare(password, member.password)) {
        return res.render('login', { cssFile: 'login.css', pageTitle: 'Login', errorMessage: "Mot de passe incorrect" });
      }
  
      if (!isMatching) {
        return res.render('login', { cssFile: 'login.css', pageTitle: 'Login', errorMessage: 'Mauvais couple email/password' });
      }
      return res.redirect('account');

    } catch (error) {
      return res.render('login', { cssFile: 'login.css', pageTitle: 'Login', errorMessage: 'Une erreur interne est survenue' });
    }

  },

};

export default userAuthController;
