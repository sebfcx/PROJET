const mainController = {

  renderHomePage(_req, res) {
    return res.render('accueil', { cssFile: 'accueil.css', pageTitle: 'Accueil' });
  },
  
  renderContactPage(_req, res) {
    return res.render('contact', { cssFile: 'contact.css', pageTitle: 'Contactez-nous' });
  },

  renderMentionsPage(_req, res) {
    return res.render('mentions', { cssFile: 'mentions.css', pageTitle: 'Mentions légales' });
  },

  renderTransportsPage(_req, res) {
    return res.render('transports', { cssFile: 'transports.css', pageTitle: 'Transports' });
  },

  renderVehiculesPage(_req, res) {
    return res.render('vehicules', {cssFile: 'vehicules.css', pageTitle: 'Véhicules',});
  },

};

export default mainController;
