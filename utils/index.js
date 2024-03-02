function validateEmail(email) {
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  let valid = true;
  let message = "";

  if (!emailRegex.test(email)) {
    valid = false;
    message = "Email is not valid!";
  }

  return [valid, message];
}

function validatePassword(password, confirmPassword) {
  // Password must include at least one of each below:
  // an uppercase, a lowercase, a number and a special character
  const passwordRegex =
    /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$/;

  let valid = true;
  let message = "";

  if (password.length < 10) {
    valid = false;
    message = "Password must be at least 10 characters long!";
  } else if (!passwordRegex.test(password)) {
    valid = false;
    message = "Password does not meet criteria!";
  } else if (password !== confirmPassword) {
    valid = false;
    message = "Passwords do no match!";
  }

  return [valid, message];
}

module.exports = { validateEmail, validatePassword };
