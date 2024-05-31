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


router.route('/account') 
.post(accountPageController.changeMemberPassword);

router.route('/contact')
.get(contactPageController.renderContactPage)
.post(contactPageController.sendFormContact)

router.route('/login')
.get(loginPageController.renderLoginPage)
.post(loginPageController.handleLoginForm)

router.route('/signup')
.get(signupPageController.renderSignupPage)
.post(signupPageController.handleSignupForm)


export default router;
