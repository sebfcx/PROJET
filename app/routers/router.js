import { Router } from 'express';
import mainController from '../controllers/mainController.js';
import memberAuthController from '../controllers/memberAuthController.js';

const router = Router();

router.get('/', mainController.renderHomePage);
router.get('/contact', mainController.renderContactPage);
router.get('/mentions', mainController.renderMentionsPage);
router.get('/transports', mainController.renderTransportsPage);
router.get('/vehicules', mainController.renderVehiculesPage);

router.route('/login')
.get(memberAuthController.renderLoginPage)
.post(memberAuthController.handleLoginForm);

router.route('/signup')
.get(memberAuthController.renderSignupPage)
.post(memberAuthController.handleSignupForm);

export default router;