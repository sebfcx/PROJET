import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js'

const accountPageContoller = {

  renderAccountPage(_, res) {
    return res.render('account', { 
      cssFile: 'account.css', 
      pageTitle: 'Account',
      alertMessage: '', 
      successMessage: ''
    });
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

export default accountPageContoller;