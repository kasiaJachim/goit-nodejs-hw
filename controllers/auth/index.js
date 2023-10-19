const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./current");
const updateSubscription = require("./updateSubscription");
const updateAvatars = require("./updateAvatar");
const verify = require('./verify');
const verifyEmail = require('./verifyEmail');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatars,
  verify,
  verifyEmail,
};
