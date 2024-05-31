const mainController = {

  renderHomePage(_, res) {
    return res.render('accueil', { 
      cssFile: 'accueil.css', 
      pageTitle: 'Accueil' 
    });
  },
  

  renderMentionsPage(_, res) {
    return res.render('mentions', { 
      cssFile: 'mentions.css', 
      pageTitle: 'Mentions légales' 
    });
  },

  renderTransportsPage(_, res) {
    return res.render('transports', { 
      cssFile: 'transports.css', 
      pageTitle: 'Transports' 
    });
  },

  renderVehiculesPage(_, res) {
    return res.render('vehicules', { 
      cssFile: 'vehicules.css', 
      pageTitle: 'Véhicules',
    });
  },

};

export default mainController;
