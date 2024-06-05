const mainController = {
  renderContactPage(_, res) {
    return res.render('index', { 
      cssFile: 'contact.css',
      mainHtml: 'contact.ejs', 
      pageTitle: 'Contact',
      alertMessage: '', 
      successMessage: '',
      script: '' 
    });
  },
  renderHomePage(_, res) {
    return res.render('index', { 
      cssFile: 'accueil.css', 
      pageTitle: 'Accueil',
      mainHtml: 'accueil.ejs'
    });
  }, 
  renderLoginPage(_, res) {
    return res.render('index', { 
      cssFile: 'login.css',
      mainHtml: 'login.ejs', 
      pageTitle: 'Login',
      alertMessage: '', 
      successMessage: ''
    });
  },
  renderMentionsPage(_, res) {
    return res.render('index', { 
      cssFile: 'mentions.css', 
      pageTitle: 'Mentions légales',
      mainHtml: 'mentions.ejs'
    });
  },
  renderSignupPage(_, res) {
    return res.render('index', { 
      cssFile: 'signup.css',
      mainHtml: 'signup.ejs', 
      pageTitle: 'Signup',
      alertMessage: '',
      successMessage: ''
    });
  },
  renderTransportsPage(_, res) {
    return res.render('index', { 
      cssFile: 'transports.css', 
      pageTitle: 'Transports',
      mainHtml: 'transports.ejs'
    });
  }, 
  renderVehiculesPage(_, res) {
    return res.render('index', { 
      cssFile: 'vehicules.css', 
      pageTitle: 'Véhicules',
      mainHtml: 'vehicules.ejs'
     });
  },
};

export default mainController;
