import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js'

const signupPageController = {

  renderSignupPage(_, res) {
    return res.render('signup', { 
      cssFile: 'signup.css', 
      pageTitle: 'Signup', 
      alertMessage: '',
      successMessage: '' 
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
        alertMessage: 'Sérieusement?!',
        successMessage: ''  
      });
    }
    
    if (!sanitizedFirstname || !sanitizedLastname || !sanitizedEmail || !sanitizedPassword || !sanitizedConfirmation) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: '' 
      });
    }

    if (!validator.isAlpha(sanitizedFirstname) || !validator.isAlpha(sanitizedLastname)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Les prénoms et noms ne doivent contenir que des lettres',
        successMessage: ''  
      });
    }

    if (!validator.isEmail(sanitizedEmail)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: "Le format de l'email n'est pas valide",
        successMessage: '' 
      });
    }

    if (!validator.isStrongPassword(sanitizedPassword)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
        successMessage: ''  
      });
    }

    if (sanitizedPassword !== sanitizedConfirmation) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Les mots de passes ne correspondent pas',
        successMessage: ''  
      });
    }

    try{

      const alreadyExistingUser = await dataMapper.findMemberByEmail(sanitizedEmail);
      
      if (alreadyExistingUser) {
        return res.render('signup', { 
          cssFile: 'signup.css', 
          pageTitle: 'Signup', 
          alertMessage: 'Membre déjà existant',
          successMessage: '' 
        });
      }
  
      const salt = await bcrypt.genSalt(10);
  
      const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);
  
      const user = await dataMapper.createMember(sanitizedFirstname, sanitizedLastname, sanitizedEmail, hashedPassword);
  
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
          alertMessage: 'Une erreur est survenue lors de la création',
          successMessage: '' 
        });
      }
    
    } catch (error) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Une erreur interne est survenue',
        successMessage: ''
      });
    }
  },

};

export default signupPageController;