import { Router } from 'express';
import mainController from '../controllers/mainController.js';
import userAuthController from '../controllers/userAuthController.js';

const router = Router();

router.get('/', mainController.renderHomePage);
router.get('/contact', mainController.renderContactPage);
router.get('/mentions', mainController.renderMentionsPage);
router.get('/transports', mainController.renderTransportsPage);
router.get('/vehicules', mainController.renderVehiculesPage);

router.get('/signup', userAuthController.renderSignupPage);
router.post('/signup', userAuthController.handleSignupForm);

router.get('/login', userAuthController.renderLoginPage);
router.post('/login', userAuthController.handleLoginForm);

router.get('/account', userAuthController.renderAccountPage);
router.post('/account', userAuthController.renderAccountPage);

export default router;
