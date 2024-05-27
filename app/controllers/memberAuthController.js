import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js';

const memberAuthController = {

  renderLoginPage(_, res) {
    return res.render('login', { 
      cssFile: 'login.css', 
      pageTitle: 'Login',
      alertMessage: '', 
      successMessage: ''
    });
  },

  renderSignupPage(_, res) {
    return res.render('signup', { 
      cssFile: 'signup.css', 
      pageTitle: 'Signup', 
      alertMessage: ''
    });
  },

  async handleSignupForm(req, res) {
    const { firstname, lastname, email, password, confirmation } = req.body;

    const sanitizedFirstname = validator.escape(validator.trim(firstname));
    const sanitizedLastname = validator.escape(validator.trim(lastname));
    const sanitizedEmail = validator.escape(validator.trim(email));
    const sanitizedPassword = validator.escape(validator.trim(password));
    const sanitizedConfirmation = validator.escape(validator.trim(confirmation));

    const forbiddenWords = /(insert|drop|update|select|delete|create|alter)/i

    if (
      forbiddenWords.test(sanitizedFirstname) 
      || forbiddenWords.test(sanitizedLastname)
      || forbiddenWords.test(sanitizedEmail) 
      || forbiddenWords.test(sanitizedPassword) 
      || forbiddenWords.test(sanitizedConfirmation)
    ) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Sérieusement?!' 
      });
    }
    
    if (!firstname || !lastname || !email || !password || !confirmation) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Tous les champs sont obligatoires' 
      });
    }

    if (!validator.isAlpha(firstname) || !validator.isAlpha(lastname)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Les prénoms et noms ne doivent contenir que des lettres' 
      });
    }

    if (!validator.isEmail(email)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: "Le format de l'email n'est pas valide" 
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial' 
      });
    }

    if (password !== confirmation) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Les mots de passes ne correspondent pas' 
      });
    }

    try{

      const alreadyExistingUser = await dataMapper.findMemberByEmail(email);
      
      if (alreadyExistingUser) {
        return res.render('signup', { 
          cssFile: 'signup.css', 
          pageTitle: 'Signup', 
          alertMessage: 'Membre déjà existant' 
        });
      }
  
      const salt = await bcrypt.genSalt(10);
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await dataMapper.createMember(firstname, lastname, email, hashedPassword);
  
      if (user) {
        return res.render('login', {
          cssFile: 'login.css',
          pageTitle: 'Login',
          alertMessage: '',
          successMessage: 'Inscription réalisée avec succès, vous pouvez vous connecter'
        });

      } else {
        return res.render('signup', { 
          cssFile: 'signup.css', 
          pageTitle: 'Signup', 
          alertMessage: 'Une erreur est survenue lors de la création' 
        });
      }
    
    } catch (error) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Une erreur interne est survenue' 
      });
    }
  },


  async handleLoginForm(req, res) {
    const { email, password } = req.body;

    const sanitizedEmail = validator.escape(validator.trim(email));
    const sanitizedPassword = validator.escape(validator.trim(password));

    const forbiddenWords = /(insert|drop|update|select|delete|create|alter)/i;

    if (forbiddenWords.test(sanitizedEmail) || forbiddenWords.test(sanitizedPassword)) {
      return res.render('login', { 
        cssFile: 'login.css', 
        pageTitle: 'Login', 
        alertMessage: 'Sérieusement?!',
        successMessage: '' 
      });
    }

    if (!email || !password) {
      return res.render('login', { 
        cssFile: 'login.css', 
        pageTitle: 'Login', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: '' 
      });
    }

    try {
      const member = await dataMapper.findMemberByEmail(email);
  
      if (!member) {
        return res.render('login', { 
          cssFile: 'login.css', 
          pageTitle: 'Login', 
          alertMessage: 'Mauvais couple email/password',
          successMessage: '' 
        });
      }
  
      const isMatching = await bcrypt.compare(password, member.password);
  
      if (!isMatching) {
        return res.render('login', { 
          cssFile: 'login.css', 
          pageTitle: 'Login', 
          alertMessage: 'Mauvais couple email/password',
          successMessage: ''
        });
      }
      return res.render('account', { 
          cssFile: 'account.css', 
          pageTitle: 'Account',
        });

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

export default memberAuthController;
