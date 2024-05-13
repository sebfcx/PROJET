// COMMENTAIRE : inutile d'utiliser un routeur pour les routes standards. Le routeur est comme une mini application au sein de l'application ;
// On l'utilise principalement pour créer un routage spécifique, comme par exemple pour un administrateur, sur une route spécifique. Exemple : /admin, /admin/dashboard, /admin/account, etc.

// import { Router } from 'express';
// import mainController from '../controllers/mainController.js';
// import userAuthController from '../controllers/userAuthController.js';

// const router = Router();

// router.get('/', mainController.renderHomePage);
// router.get('/contact', mainController.renderContactPage);
// router.get('/mentions', mainController.renderMentionsPage);
// router.get('/transports', mainController.renderTransportsPage);
// router.get('/vehicules', mainController.renderVehiculesPage);

// router.route('/signup')
//   .get(userAuthController.renderSignupPage)
//   .post(userAuthController.handleSignupForm);

// router.route('/login')
//   .get(userAuthController.renderLoginPage)
//   .post(userAuthController.handleLoginForm);

// router.route('/account')
//   .get(userAuthController.renderAccountPage)
//   .post(userAuthController.renderAccountPage);

// export default router;
