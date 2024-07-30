const footerYear = document.getElementById("current_year");

const birthDateInput = document.getElementById("birth_date");
const passwordInput = document.getElementById("pwd_input");
const confPasswordInput = document.getElementById("conf_pwd_input");
const phoneNumberInput = document.getElementById("phone_num_input");

const birthDayError = document.getElementById("birth_err");
const phoneNumberError = document.getElementById("phone_num_err");

const confPwdError = document.getElementById("conf_pwd_err");

const popup = document.getElementById("popup");
const uppercaseItem = document.getElementById("uppercase");
const lowercaseItem = document.getElementById("lowercase");
const numberItem = document.getElementById("number");
const specialCharItem = document.getElementById("specialChar");
const minLengthItem = document.getElementById("minLength");

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
  const value = confPasswordInput.value;

  passwordInput.value !== value
    ? confPwdError.classList.remove("hidden")
    : confPwdError.classList.add("hidden");

  passwordInput.value !== value
    ? confPasswordInput.classList.add("err_input")
    : confPasswordInput.classList.remove("err_input");

  if (value === "") {
    confPwdError.classList.add("hidden");
  }
});

// Cheking if password match requirements and diaplaying error message after pressing a key in password input.
passwordInput.addEventListener("keyup", () => {
  const value = passwordInput.value;

  const uppercaseValid = containsUpper(value);
  const lowercaseValid = containsLower(value);
  const numberValid = containsNumber(value);
  const specialCharValid = containsSpecial(value);
  const minLengthValid = isEightChar(value);

  // Updating validation items
  uppercaseItem.className = uppercaseValid ? "valid-item" : "invalid-item";
  lowercaseItem.className = lowercaseValid ? "valid-item" : "invalid-item";
  numberItem.className = numberValid ? "valid-item" : "invalid-item";
  specialCharItem.className = specialCharValid ? "valid-item" : "invalid-item";
  minLengthItem.className = minLengthValid ? "valid-item" : "invalid-item";

  // Displaying or hiding popup
  popup.style.display = value ? "block" : "none";

  const allValid =
    uppercaseValid &&
    lowercaseValid &&
    numberValid &&
    specialCharValid &&
    minLengthValid;
  popup.className = allValid ? "popup valid" : "popup";
});

// Hiding pop-up after leaving the input field.
passwordInput.addEventListener("blur", function () {
  popup.style.display = "none";
});

// Checking if number is in the correct format.
phoneNumberInput.addEventListener("keyup", () => {
  const value = phoneNumberInput.value;
  !/^\d{3}-\d{3}-\d{3}$/.test(value)
    ? phoneNumberError.classList.remove("hidden")
    : phoneNumberError.classList.add("hidden");

  if (value === "") {
    phoneNumberError.classList.add("hidden");
  }
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
