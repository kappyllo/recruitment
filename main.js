const footerYear = document.getElementById("current_year");

const birthDateInput = document.getElementById("birth_date");
const passwordInput = document.getElementById("pwd_input");
const confPasswordInput = document.getElementById("conf_pwd_input");

const birthDayError = document.getElementById("birth_err");
const confPwdError = document.getElementById("conf_pwd_err");
const eightPwdError = document.getElementById("eight_err");
const lowerPwdError = document.getElementById("lowercase_err");
const upperPwdError = document.getElementById("uppercase_err");
const numberPwdError = document.getElementById("number_err");
const specialPwdError = document.getElementById("special_char_err");

let d = new Date();
const currYear = d.getFullYear();

// Setting copyritght in footer to current year.
footerYear.innerHTML = currYear;

// Cheking if user is at least 13 years old.
birthDateInput.addEventListener("change", () => {
  const formatedBDate = Date.parse(birthDateInput.value);
  const getTimeDiff = () => {
    const time = d.getTime() - formatedBDate;
    const diffInDays = Math.round(time / (1000 * 3600 * 24));
    return diffInDays;
  };
  days = getTimeDiff();
  if (days <= 365 * 13) {
    birthDayError.classList.remove("hidden");
  } else {
    birthDayError.classList.add("hidden");
  }
});

// Cheking if password matches after pressing a key in confirm password input.
confPasswordInput.addEventListener("keyup", () => {
  if (passwordInput.value !== confPasswordInput.value) {
    confPwdError.classList.remove("hidden");
    confPasswordInput.classList.add("err_input");
  } else {
    confPwdError.classList.add("hidden");
    confPasswordInput.classList.remove("err_input");
  }
});

// Cheking if password match requirements and diaplaying error message after pressing a key in password input.
passwordInput.addEventListener("keyup", () => {
  const show = (element) => element.classList.remove("hidden");
  const hide = (element) => element.classList.add("hidden");
  !isEightChar(passwordInput.value) ? show(eightPwdError) : hide(eightPwdError);
  !containsNumber(passwordInput.value)
    ? show(numberPwdError)
    : hide(numberPwdError);
  !containsUpper(passwordInput.value)
    ? show(upperPwdError)
    : hide(upperPwdError);
  !containsLower(passwordInput.value)
    ? show(lowerPwdError)
    : hide(lowerPwdError);
  !containsSpecial(passwordInput.value)
    ? show(specialPwdError)
    : hide(specialPwdError);
});

function isEightChar(str) {
  return str.length >= 8;
}

function containsNumber(str) {
  return /\d/.test(str);
}

function containsUpper(str) {
  return /[A-Z]/.test(str);
}

function containsLower(str) {
  return /[a-z]/.test(str);
}

function containsSpecial(str) {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}
