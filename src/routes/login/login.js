const express = require('express');
const router = express.Router();

const loginController= require('../../app/controllers/login/loginControllers');


router.get('/', loginController.deliLogin);
router.get('/login', loginController.loginform);
router.post('/login', loginController.loginUser);

router.get('/register', loginController.registerForm);
router.post('/register', loginController.createStudentAccount);

router.get('/logout', loginController.logoutUser);
router.get('/forgotPassword', loginController.forgotPasswordForm);
router.post('/forgotPassword', loginController.retrievalPassword);

router.get('/changePassword', loginController.changePasswordForm);
router.post('/changePassword', loginController.changePassword);

module.exports = router;
