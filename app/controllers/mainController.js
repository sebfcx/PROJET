const mainController = {

  renderHomePage(_, res) {
    res.render('accueil');
  },

  renderContactPage(_, res) {
    res.render('contact');
  },

  renderMentionsPage(_, res) {
    res.render('mentions');
  },

  renderTransportsPage(_, res) {
    res.render('transports');
  },

  renderVehiculesPage(_, res) {
    res.render('vehicules');
  },

};

export default (mainController);
