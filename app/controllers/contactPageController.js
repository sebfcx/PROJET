import nodemailer from 'nodemailer';
import { Logger } from '../helpers/Logger/logger.js';
import validator from 'validator';

const contactPageController = {

  renderContactPage(_, res) {
    return res.render('contact', { 
      cssFile: 'contact.css', 
      pageTitle: 'Contact',
      alertMessage: '', 
      successMessage: '' 
    });
  },

  sendFormContact(req, res) {
    const { lastname, firstname, email, message } = req.body;

    const sanitizedFirstname = validator.escape(validator.trim(lastname));
    const sanitizedLastname = validator.escape(validator.trim(firstname));
    const sanitizedEmail = validator.escape(validator.trim(email));

    const forbiddenWords = /(insert|drop|update|select|delete|create|alter)/i

    if (
      forbiddenWords.test(sanitizedFirstname) 
      || forbiddenWords.test(sanitizedLastname)
      || forbiddenWords.test(sanitizedEmail) 
      || forbiddenWords.test(message)
    ) {
      return res.render('contact', { 
        cssFile: 'contact.css', 
        pageTitle: 'Contact', 
        alertMessage: 'Sérieusement?!',
        successMessage: '' 
      });
    }
    if (!sanitizedFirstname || !sanitizedLastname || !sanitizedEmail || !message) {
      return res.render('contact', { 
        cssFile: 'contact.css', 
        pageTitle: 'Contact', 
        alertMessage: 'Tous les champs sont obligatoires',
        successMessage: ''  
      });
    }
    if (!validator.isEmail(sanitizedEmail)) {
      return res.render('contact', { 
        cssFile: 'contact.css', 
        pageTitle: 'Contact', 
        alertMessage: "Le format de l'email n'est pas valide",
        successMessage: ''  
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: 'sebastienfaucheux@icloud.com',
      subject: 'Nouveau message depuis le formulaire de contact',
      text: `Nom: ${sanitizedLastname}\nPrénom: ${sanitizedFirstname}\nEmail: ${sanitizedEmail}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        Logger.error("Erreur lors de l'envoi du message:", error);
        return res.render('contact', { 
          cssFile: 'contact.css', 
          pageTitle: 'Contact',
          alertMessage: "Échec de l'envoi du message", 
          successMessage: ''
        });
      } else {
        Logger.log('E-mail envoyé:', info.response);
        return res.render('contact', { 
          cssFile: 'contact.css', 
          pageTitle: 'Contact',
          alertMessage: '', 
          successMessage: 'Message envoyé avec succès' 
        });
      }
    });
  },
};


export default contactPageController;