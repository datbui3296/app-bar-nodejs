const EMAIL_RULE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_RULE = /^[a-z0-9]{5,30}$/;
const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
const FIELD_REQUIRED_MESSAGE = "This field is required.";
const PASSWORD_RULE_MESSAGE =
  "At least 1 letter, a number, at least 8 characters.";
const USERNAME_RULE_MESSAGE =
  "Username phải gồm các chữ thường và số, không có ký tự đặc biệt, độ dài 5 - 30 ký tự ";
const PASSWORD_CONFIRM_MESSAGE = "Password confirmation not match.";
const EMAIL_RULE_MESSAGE = "Email is invalid.";
module.exports = {
  EMAIL_RULE,
  USERNAME_RULE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  USERNAME_RULE_MESSAGE,
  PASSWORD_CONFIRM_MESSAGE,
  EMAIL_RULE_MESSAGE,
};
