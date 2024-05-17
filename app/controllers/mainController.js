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
    return res.render('vehicules',
      {
        cssFile: 'vehicules.css',
        pageTitle: 'Véhicules',
        // To do: faire de sorte que les images soient stockées...
        images: [
          {
            src: 'vsl01-v2.jpeg',
            width: '100%',
            height: '100%',
            alt: 'VSL N°1'
          },
          {
            src: 'vsl02-v2.jpeg',
            width: '100%',
            height: '100%',
            alt: 'VSL N°2'
          },
          {
            src: 'amb01-v2.jpeg',
            width: '100%',
            height: '100%',
            alt: 'Ambulance N°1'
          },
          {
            src: 'amb02-v2.jpeg',
            width: '100%',
            height: '100%',
            alt: 'Ambulance N°2'
          }
        ]
      }
    );
  },

};

export default mainController;
