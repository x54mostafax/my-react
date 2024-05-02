const bcrypt = require("bcrypt");
const hasedPassword = async password => {
  const passwordTest = await bcrypt.hash(password, 10);
  if (!passwordTest) {
    throw "there is wrong in password hashing.";
  }
  return passwordTest;
};
const ComparePassword = async (password, hashedPassword) => {
  const passwordTest = await bcrypt.compare(password, hashedPassword);
  if (!passwordTest) {
    throw Error("the password is wrong .");
  }
  return passwordTest;
};
module.exports = {
  hasedPassword,
  ComparePassword
};
