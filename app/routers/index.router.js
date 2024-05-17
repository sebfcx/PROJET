import { Router } from 'express';
import mainController from '../controllers/mainController.js';
import userAuthController from '../controllers/userAuthController.js';

const router = Router();

router.get('/', mainController.renderHomePage);
router.get('/contact', mainController.renderContactPage);
router.get('/mentions', mainController.renderMentionsPage);
router.get('/transports', mainController.renderTransportsPage);
router.get('/vehicules', mainController.renderVehiculesPage);

router.route('/signup')
.get(userAuthController.renderSignupPage)
.post(userAuthController.handleSignupForm);

router.route('/login')
.get(userAuthController.renderLoginPage)
.post(userAuthController.handleLoginForm);

router.route('/account')
.get(userAuthController.renderAccountPage)

export default router;