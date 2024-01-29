const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

class LoginController {
    //[POST] /register
    createStudentAccount(req, res) {
        User.findOne({ username: req.body.username }).then((user) => {
            if (user) {
                res.render('login/registerform', {
                    layout: 'login-page',
                    errorMessage: 'Username đã tồn tại, Vui lòng nhập Username khác!!',
                    user: req.body,
                });
            } else {
                const salt = 10;
                bcrypt.hash(req.body.password, salt).then((hashedPassword) => {
                    const newUser = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        time: req.body.time,
                    });
                    newUser.save().then(() => {
                        res.redirect('/login');
                    });
                });
            }
        })
    };

    //[POST] /loginUser
    loginUser(req, res) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                bcrypt.compare(req.body.password, user.password).then((result) => {
                    if (result == true) {
                        const accessToken = jwt.sign(
                            {
                                id: user.id,
                            },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: '2h',
                            }
                        );
                        res.cookie('accessToken', accessToken, {
                            httpOnly: true,
                        });
                        res.redirect('/home');
                    } else {
                        res.render('login/loginform', {
                            layout: 'login-page',
                            errorMessage: 'Wrong password or username',
                            user: req.body,
                        });
                    }
                });
            })
            .catch(() =>
                res.render('login/loginform', {
                    layout: 'login-page',
                    errorMessage: 'Wrong password or username',
                    user: req.body,
                })
            );
    }

    //[GET] /login
    loginform(req, res) {
        res.clearCookie('accessToken');
        res.render('login/loginform', {
            layout: 'login-page',
            errorMessage: null,
            user: null,
        });
    }

    //[GET] /register
    registerForm(req, res) {
        res.render('login/registerform', {
            layout: 'login-page',
            errorMessage: null,
            user: null,
        });
    }

    //[GET] /
    deliLogin(req, res) {
        res.redirect('/login');
    }

    //[POST] /logout
    logoutUser(req, res) {
        res.clearCookie('accessToken');
        res.redirect('/');
    }

    //[GET] /forgotPassword
    forgotPasswordForm(req, res) {
        res.render('login/forgotPasswordform', {
            layout: 'login-page',
            errorMessage: null,
        });
    }

    //[POST] /forgotPassword
    retrievalPassword(req, res, next) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (user && !user.admin) {
                    var randomPassword = Math.random().toString(36).slice(-8);
                    const salt = 10;
                    bcrypt
                        .hash(randomPassword, salt)
                        .then((hashedPassword) => {
                            user.password = hashedPassword;
                            user.save();
                        })
                        .catch(next);
                    res.render('login/forgotPasswordform', {
                        layout: 'login-page',
                        errorMessage: "Mật Khẩu mới của bạn là: " + randomPassword,
                    });
                } else {
                    res.render('login/forgotPasswordform', {
                        layout: 'login-page',
                        errorMessage: 'Tài Khoản Không Tồn Tại!!',
                    });
                }
            })
            .catch(next);
    }

    //[GET] /changePassword
    changePasswordForm(req, res) {
        res.render('login/changePasswordform', {
            layout: 'login-page',
            errorMessage: null,
            user: null,
        });
    }

    //[POST] /changePassword
    changePassword(req, res, next) {
        if (req.body)
            User.findOne({ username: req.body.username }).then((user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password).then((result) => {
                        if (result == true) {
                            const salt = 10;
                            bcrypt.hash(req.body.newpassword, salt).then((hashedNewPassword) => {
                                user.password = hashedNewPassword;
                                user
                                    .save()
                                    .then(() => {
                                        res.render('login/mess', {
                                            layout: 'login-page',
                                            errorMessage: 'Thay đổi mật khẩu thành công!!',
                                        });
                                        res.clearCookie('accessToken');
                                    })
                                    .catch(next);
                            });
                        } else {
                            res.render('login/changePasswordform', {
                                layout: 'login-page',
                                errorMessage: 'Mật khẩu không chính xác!!',
                                user: req.body,
                            });
                        }
                    });
                } else {
                    res.render('login/changePasswordform', {
                        layout: 'login-page',
                        errorMessage: 'Username không tồn tại!!',
                        user: req.body,
                    });
                }
            });
    }
}

module.exports = new LoginController();
