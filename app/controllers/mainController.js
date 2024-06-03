const mainController = {

  renderHomePage(_, res) {
    return res.render('index', { 
      cssFile: 'accueil.css', 
      pageTitle: 'Accueil',
      mainHtml: 'accueil.ejs',
      script: ''
    });
  },
  
  renderMentionsPage(_, res) {
    return res.render('index', { 
      cssFile: 'mentions.css', 
      pageTitle: 'Mentions légales',
      mainHtml: 'mentions.ejs',
      script: ''
    });
  },

  renderTransportsPage(_, res) {
    return res.render('index', { 
      cssFile: 'transports.css', 
      pageTitle: 'Transports',
      mainHtml: 'transports.ejs',
      script: ''
    });
  },

  
  renderVehiculesPage(_, res) {

    return res.render('index', { 
      cssFile: 'vehicules.css', 
      pageTitle: 'Véhicules',
      mainHtml: 'vehicules.ejs',
      script: 'slide.ejs',
     });
  },

};

export default mainController;
