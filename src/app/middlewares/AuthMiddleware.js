const User = require("../models/User");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    requireAuth: async function (req, res, next) {
        if (!req.signedCookies.userId) {
            res.redirect("/login");
            return;
        }
        const user = await User.aggregate([
            { $match: { _id: ObjectId(req.signedCookies.userId) } },
        ]);
        if (user.length > 0) {
            res.locals.user = user;
            next();
        } else {
            res.redirect("/login");
        }
    },

    checkRequireAdmin: async function (req, res, next) {

        if (!req.signedCookies.adminId) {
            res.redirect("/login-admin");
            return;
        }

        const admin = await Admin.aggregate([
            { $match: { _id: ObjectId(req.signedCookies.adminId) } },
        ]);
        if (admin.length > 0) {
            res.locals.admin = admin;
            return next();
        } else {
            res.redirect("/login-admin");
        }
        return next();
    },

    authValidate: function (req, res, next) {
        const { email, password } = req.body;
        if (!email && !password) {
            req.flash(
                "error",
                "Vui lòng nhập thông tin dưới đây để đăng nhập tài khoản của bạn!"
            );
            res.render("login", {
                errors: req.flash("error"),
                layout: "",
            });
            return;
        }
        if (!email) {
            req.flash("error", "Vui lòng nhập tài khoản email!");
            res.render("login", {
                errors: req.flash("error"),
                values: req.body,
                layout: "",
            });
            return;
        }
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(regexEmail)) {
            req.flash("error", "Vui lòng nhập địa chỉ email hợp lệ!");
            res.render("login", {
                errors: req.flash("error"),
                values: req.body,
                layout: "",
            });
            return;
        }
        if (!password) {
            req.flash("error", "Vui lòng nhập mật khẩu!");
            res.render("login", {
                errors: req.flash("error"),
                values: req.body,
                layout: "",
            });
            return;
        }
        next();
    },

    changePassValidate: function (req, res, next) {
        const { passwordOld, passwordNew, passwordConfirm } = req.body;
        if (!passwordOld && !passwordNew && !passwordConfirm) {
            req.flash(
                "error",
                "Vui lòng nhập thông tin dưới đây để đổi mật khẩu mới cho tài khoản của bạn!"
            );
            res.render("auth/password-change", {
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (!passwordOld) {
            req.flash("error", "Vui lòng nhập mật khẩu cũ!");
            res.render("auth/password-change", {
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (!passwordNew) {
            req.flash("error", "Vui lòng nhập mật khẩu mới!");
            res.render("auth/password-change", {
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (!passwordConfirm) {
            req.flash("error", "Vui lòng nhập lại mật khẩu mới để xác nhận!");
            res.render("auth/password-change", {
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        // if (passwordNew.length < 6) {
        //     req.flash("error", "Mật khẩu phải chứa ít nhất 6 ký tự!");
        //     res.render("auth/password-change", {
        //         errors: req.flash("error"),
        //         values: req.body,
        //     });
        //     return;
        // }
        if (passwordNew !== passwordConfirm) {
            req.flash("error", "Xác nhận mật khẩu mới không khớp!");
            res.render("auth/password-change", {
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        next();
    },

    resetPassValidate: function (req, res, next) {
        const { token } = req.params;
        const { password, passwordConfirm } = req.body;
        if (!password && !passwordConfirm) {
            req.flash(
                "error",
                "Vui lòng nhập thông tin dưới đây để đặt lại mật khẩu mới cho tài khoản của bạn!"
            );
            res.render("auth/reset-confirm", {
                token,
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (!password) {
            req.flash("error", "Vui lòng nhập mật khẩu mới!");
            res.render("auth/reset-confirm", {
                token,
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (!passwordConfirm) {
            req.flash("error", "Vui lòng nhập lại mật khẩu mới để xác nhận!");
            res.render("auth/reset-confirm", {
                token,
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (password.length < 6) {
            req.flash("error", "Mật khẩu mới phải chứa ít nhất 6 ký tự!");
            res.render("auth/reset-confirm", {
                token,
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        if (password !== passwordConfirm) {
            req.flash("error", "Xác nhận mật khẩu mới không khớp!");
            res.render("auth/reset-confirm", {
                token,
                errors: req.flash("error"),
                values: req.body,
            });
            return;
        }
        next();
    },
};
