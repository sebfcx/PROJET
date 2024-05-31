import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js'

const maxAttempts = process.env.MAX_ATTEMPTS;

const loginPageController = {

  renderLoginPage(_, res) {
    return res.render('login', { 
      cssFile: 'login.css', 
      pageTitle: 'Login',
      alertMessage: '', 
      successMessage: ''
    });
  },

  async handleLoginForm(req, res) {
    const { email, password } = req.body;

    const sanitizedEmail = validator.escape(validator.trim(email));
    const sanitizedPassword = validator.escape(validator.trim(password));

    const forbiddenWords = /(insert|drop|update|select|delete|create|alter)/i;

    if (
      forbiddenWords.test(sanitizedEmail) 
      || forbiddenWords.test(sanitizedPassword)
    ) {
      return res.render('login', { 
        cssFile: 'login.css', 
        pageTitle: 'Login', 
        alertMessage: 'Sérieusement?!',
        successMessage: '' 
      });
    }
    if (!sanitizedEmail || !sanitizedPassword) {
      return res.render('login', { 
        cssFile: 'login.css', 
        pageTitle: 'Login', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: '' 
      });
    }
    if (!validator.isEmail(sanitizedEmail)) {
      return res.render('login', { 
        cssFile: 'login.css', 
        pageTitle: 'Login', 
        alertMessage: "Le format de l'email n'est pas valide",
        successMessage: ''
      });
    }

    if (!req.session.attempts) {
      req.session.loginAttempts = 0;
    }
    if (req.session.attempts >= maxAttempts) {
      return res.render('login', {
        cssFile: 'login.css',
        pageTitle: 'Login',
        alertMessage: 'Trop de tentatives de connexion, veuillez réessayer ultérieurement.',
        successMessage: ''
      });
    }

    try {
      const member = await dataMapper.findMemberByEmail(sanitizedEmail);
      if (!member) {
        return res.render('login', { 
          cssFile: 'login.css', 
          pageTitle: 'Login', 
          alertMessage: 'Mauvais couple email/mot de passe',
          successMessage: '' 
        });
      }
      const isMatching = await bcrypt.compare(sanitizedPassword, member.password);
      if (!isMatching) {
        return res.render('login', { 
          cssFile: 'login.css', 
          pageTitle: 'Login', 
          alertMessage: 'Mauvais couple email/mot de passe',
          successMessage: ''
        });
      }
      
      return res.render('account', { 
        cssFile: 'account.css', 
        pageTitle: 'Account',
        alertMessage: '',
        successMessage: '', 
        member: member
      },
    );

    } catch (error) {
      return res.render('login', { 
        cssFile: 'login.css', 
        pageTitle: 'Login', 
        alertMessage: 'Une erreur interne est survenue',
        successMessage: ''
      });
    }
  },

};

export default loginPageController;
