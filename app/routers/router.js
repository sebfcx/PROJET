import { Router } from 'express';
import mainController from '../controllers/mainController.js';
import accountPageController from '../controllers/accountPageController.js';
import contactPageController from '../controllers/contactPageController.js';
import loginPageController from '../controllers/loginPageController.js';
import signupPageController from '../controllers/signupPageController.js';

const router = Router();

router.get('/', mainController.renderHomePage);
router.get('/mentions', mainController.renderMentionsPage);
router.get('/transports', mainController.renderTransportsPage);
router.get('/vehicules', mainController.renderVehiculesPage);
router.get('/contact', mainController.renderContactPage);
router.get('/login', mainController.renderLoginPage);
router.get('/signup', mainController.renderSignupPage);

router.route('/account') 
.post(accountPageController.changeMemberPassword);

router.route('/contact')
.post(contactPageController.sendFormContact)

router.route('/login')
.post(loginPageController.handleLoginForm)

router.route('/signup')
.post(signupPageController.handleSignupForm)

export default router;
