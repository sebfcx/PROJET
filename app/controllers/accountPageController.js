import bcrypt from 'bcrypt';
import validator from 'validator';
import dataMapper from '../models/dataMapper.js'

const accountPageController = {
  async changeMemberPassword(req, res) {
    const { email, currentPassword, newPassword, confirmNewPassword } = req.body;
    console.log(req.body)
    const member = await dataMapper.findMemberByEmail(email);
    console.log(member)
    const sanitizedNewPassword = validator.escape(validator.trim(newPassword));
    const sanitizedConfirmNewPassword = validator.escape(validator.trim(confirmNewPassword));

    const forbiddenWords = /(insert|drop|update|select|delete|create|alter)/i;

    if (forbiddenWords.test(sanitizedNewPassword) 
      || forbiddenWords.test(sanitizedConfirmNewPassword)
    )
    return res.render('index', { 
      cssFile: 'account.css',
      mainHtml: 'account.ejs', 
      pageTitle: 'Account',
      alertMessage: 'Sérieusement?!', 
      successMessage: '',
      member: member
      });  
    if (!currentPassword || !sanitizedNewPassword || !sanitizedConfirmNewPassword)
      return res.render('index', { 
        cssFile: 'account.css',
        mainHtml: 'account.ejs', 
        pageTitle: 'Account', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: '',
        script: '',
        member: member
      });    
    if (sanitizedNewPassword !== sanitizedConfirmNewPassword) {
      return res.render('index', { 
        cssFile: 'account.css',
        mainHtml: 'account.ejs', 
        pageTitle: 'Account', 
        alertMessage: 'Les mots de passes ne correspondent pas',
        successMessage: '',
        script: '',
        member: member
      });
    }
    if (!validator.isStrongPassword(sanitizedNewPassword)) {
      return res.render('index', { 
        cssFile: 'account.css',
        mainHtml: 'account.ejs', 
        pageTitle: 'Account', 
        alertMessage: 'Le mot de passe doit contenir > 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
        successMessage: '',
        script: '',
        member: member
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(sanitizedNewPassword, salt);
    try {      
      const isMatching = await bcrypt.compare(currentPassword, member.password);      
      if (!isMatching) {
        return res.render('index', { 
          cssFile: 'account.css',
          mainHtml: 'account.ejs', 
          pageTitle: 'Account', 
          alertMessage: 'Mot de passe actuell erroné',
          successMessage: '',
          script: '',
          member: member
        });
      }
      const modifyPassword = await dataMapper.changePassword(hashedNewPassword, email);
      if (!modifyPassword) {
        return res.render('index', { 
          cssFile: 'account.css',
          mainHtml: 'account.ejs', 
          pageTitle: 'Account', 
          alertMessage: 'Echec du changement de mot de passe',
          successMessage: '',
          script: '',
          member: member
        }
      )}
      return res.render('index', {
        cssFile: 'account.css',
        mainHtml: 'account.ejs', 
        pageTitle: 'Account', 
        alertMessage: '',
        successMessage: 'Changement de mot de passe effectué',
        script: '',
        member: member
      });

    } catch (error) {
      return res.render('index', { 
        cssFile: 'account.css',
        mainHtml: 'account.ejs', 
        pageTitle: 'Account', 
        alertMessage: 'Une erreur interne est survenue',
        successMessage: '',
        script: member
      });
    }
  },
};

export default accountPageController;
