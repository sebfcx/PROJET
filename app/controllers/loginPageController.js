import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js'

const maxAttempts = process.env.MAX_ATTEMPTS;

const loginPageController = {

  renderLoginPage(_, res) {
    return res.render('index', { 
      cssFile: 'login.css',
      mainHtml: 'login.ejs', 
      pageTitle: 'Login',
      alertMessage: '', 
      successMessage: '',
      script: ''
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
      return res.render('index', { 
        cssFile: 'login.css',
        mainHtml: 'login.ejs', 
        pageTitle: 'Login', 
        alertMessage: 'Sérieusement?!',
        successMessage: '',
        script: '' 
      });
    }
    if (!sanitizedEmail || !sanitizedPassword) {
      return res.render('index', { 
        cssFile: 'login.css',
        mainHtml: 'login.ejs', 
        pageTitle: 'Login', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: '',
        script: '' 
      });
    }
    if (!validator.isEmail(sanitizedEmail)) {
      return res.render('index', { 
        cssFile: 'login.css',
        mainHtml: 'login.ejs', 
        pageTitle: 'Login', 
        alertMessage: 'Email non valide',
        successMessage: '',
        script: ''
      });
    }

    if (!req.session.attempts) {
      req.session.loginAttempts = 0;
    }
    if (req.session.attempts >= maxAttempts) {
      return res.render('index', {
        cssFile: 'login.css',
        mainHtml: 'login.ejs',
        pageTitle: 'Login',
        alertMessage: 'Trop de tentatives de connexion, veuillez réessayer ultérieurement.',
        successMessage: '',
        script: ''
      });
    }

    try {
      const member = await dataMapper.findMemberByEmail(sanitizedEmail);
      if (!member) {
        return res.render('index', { 
          cssFile: 'login.css',
          mainHtml: 'login.ejs', 
          pageTitle: 'Login', 
          alertMessage: 'Mauvais couple email/mot de passe',
          successMessage: '',
          script: '' 
        });
      }
      const isMatching = await bcrypt.compare(sanitizedPassword, member.password);
      if (!isMatching) {
        return res.render('index', { 
          cssFile: 'login.css',
          mainHtml: 'login.ejs', 
          pageTitle: 'Login', 
          alertMessage: 'Mauvais couple email/mot de passe',
          successMessage: '',
          script: ''
        });
      }
      
      return res.render('index', { 
        cssFile: 'account.css',
        mainHtml: 'account.ejs', 
        pageTitle: 'Account',
        alertMessage: '',
        successMessage: 'Connexion au compte réussi', 
        script: '',
        member: member
      },
    );

    } catch (error) {
      return res.render('index', { 
        cssFile: 'login.css',
        mainHtml: 'login.ejs', 
        pageTitle: 'Login', 
        alertMessage: 'Une erreur interne est survenue',
        successMessage: '',
        script: ''
      });
    }
  },

};

export default loginPageController;
