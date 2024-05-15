import { Logger } from "../helpers/Logger/index.js";

const mainController = {

  renderHomePage(_req, res) {
    Logger.silly('Now serving page Accueil');
    return res.render('accueil', { cssFile: 'accueil.css', pageTitle: 'Accueil' });
  },

  renderContactPage(_req, res) {
    Logger.silly('Now serving page Contact');
    return res.render('contact', { cssFile: 'contact.css', pageTitle: 'Contactez-nous' });
  },

  renderMentionsPage(_req, res) {
    Logger.silly('Now serving page Mentions légales');
    return res.render('mentions', { cssFile: 'mentions.css', pageTitle: 'Mentions légales' });
  },

  renderTransportsPage(_req, res) {
    Logger.silly('Now serving page Transports');
    return res.render('transports', { cssFile: 'transports.css', pageTitle: 'Transports' });
  },

  renderVehiculesPage(_req, res) {
    Logger.silly('Now serving page Véhicules');
    return res.render('vehicules', { cssFile: 'vehicules.css', pageTitle: 'Véhicules' });
  },

};

export default mainController;
