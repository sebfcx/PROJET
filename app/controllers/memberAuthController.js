import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js'

const memberAuthController = {

  renderAccountPage(_, res) {
    return res.render('account', { 
      cssFile: 'account.css', 
      pageTitle: 'Account',
      alertMessage: '', 
      successMessage: ''
    });
  },

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
    
    if (!sanitizedFirstname || !sanitizedLastname || !sanitizedEmail || !sanitizedPassword || !sanitizedConfirmation) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Tous les champs sont obligatoires' 
      });
    }

    if (!validator.isAlpha(sanitizedFirstname) || !validator.isAlpha(sanitizedLastname)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Les prénoms et noms ne doivent contenir que des lettres' 
      });
    }

    if (!validator.isEmail(sanitizedEmail)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: "Le format de l'email n'est pas valide" 
      });
    }

    if (!validator.isStrongPassword(sanitizedPassword)) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial' 
      });
    }

    if (sanitizedPassword !== sanitizedConfirmation) {
      return res.render('signup', { 
        cssFile: 'signup.css', 
        pageTitle: 'Signup', 
        alertMessage: 'Les mots de passes ne correspondent pas' 
      });
    }

    try{

      const alreadyExistingUser = await dataMapper.findMemberByEmail(sanitizedEmail);
      
      if (alreadyExistingUser) {
        return res.render('signup', { 
          cssFile: 'signup.css', 
          pageTitle: 'Signup', 
          alertMessage: 'Membre déjà existant' 
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

  async changeMemberPassword(req, res) {
    const { memberEmail, currentPassword, newPassword, confirmNewPassword } = req.body;

    const sanitizedNewPassword = validator.escape(validator.trim(newPassword));
    const sanitizedConfirmNewPassword = validator.escape(validator.trim(confirmNewPassword));

    const forbiddenWords = /(insert|drop|update|select|delete|create|alter)/i;

    if (forbiddenWords.test(memberEmail) 
      || forbiddenWords.test(currentPassword) 
      || forbiddenWords.test(sanitizedNewPassword) 
      || forbiddenWords.test(sanitizedConfirmNewPassword)
    )
      return res.render('account', { 
        cssFile: 'account.css', 
        pageTitle: 'Account', 
        alertMessage: 'Sérieusement?!',
        successMessage: '' 
      });

  
    if (!currentPassword || !sanitizedNewPassword || !sanitizedConfirmNewPassword)
      return res.render('account', { 
        cssFile: 'account.css', 
        pageTitle: 'Account', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: ''
      });
      
    if (sanitizedNewPassword !== sanitizedConfirmNewPassword) {
      return res.render('account', { 
        cssFile: 'account.css', 
        pageTitle: 'Account', 
        alertMessage: 'Les mots de passes ne correspondent pas',
        successMessage: '' 
      });
    }

    if (!validator.isStrongPassword(sanitizedNewPassword)) {
      return res.render('account', { 
        cssFile: 'account.css', 
        pageTitle: 'Account', 
        alertMessage: 'Le mot de passe doit contenir > 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
        successMessage: ''
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(sanitizedNewPassword, salt);

    try {
      const changeMemberPassword = await dataMapper.changePassword(hashedNewPassword, memberEmail);
      if (!changeMemberPassword) {
        return res.render('account', { 
          cssFile: 'account.css', 
          pageTitle: 'Account', 
          alertMessage: 'Echec du changement de mot de passe',
          successMessage: '' 
        }
      )}

      return res.render('account', {
        cssFile: 'account.css', 
        pageTitle: 'Account', 
        alertMessage: '',
        successMessage: 'Changement de mot de passe effectué',
        member: changeMemberPassword
      });

    } catch (error) {
      return res.render('account', { 
        cssFile: 'account.css', 
        pageTitle: 'Account', 
        alertMessage: 'Une erreur interne est survenue',
        successMessage: ''
      });
    }
  },
    


};

export default memberAuthController;
