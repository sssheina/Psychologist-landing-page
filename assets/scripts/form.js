//  ----- REGISTRATION FORM -----

const form = document.querySelector(".formWithValidation");
//const email = document.querySelector("#email");
const checkboxAdult = document.querySelectorAll(".checkbox_18");
const checkboxPrivat = document.querySelectorAll(".checkboxPrivat");
const errorsInfo = document.querySelector("#errorsInfo");
const whatsappInput = document.querySelector("#whatsApp");

let submitted = false;

// Profanity filter list
const profanityList = ['xxx', 'viagra', 'bitch', 'slut', 'whore', 'cum', 'fuck']; // Add more words as needed

// Function to check for angle brackets and profanity
function validateInput(input) {
  if (/<|>/.test(input)) {
    return false; // Found angle brackets
  }
  for (let word of profanityList) {
    if (input.toLowerCase().includes(word)) {
      return false; // Found profanity
    }
  }
  return true;
}

// Function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Check for bot field (assuming a field with id 'botField' is used)
  if (document.getElementById('botField').value) {
    return; // Bot detected, do not process form
  }

// Function to clear form fields
function clearFormFields() {
  document.getElementById('userName').value = '';
  document.getElementById('email').value = '';
  document.getElementById('whatsApp').value = '';
  document.getElementById('telegram').value = '';
  document.getElementById('comment').value = '';
}

// Registration form validation functions
//----------------------------------------

//If needShowMessages = true, the validation messages will be displayed beneath the name field
//Return true if validation is ok, false otherwise
function validateRegFormName(needShowMessages) {
  //Doing the basic validation - the name field should not be empty
  let result = true;
  let el = document.getElementById("userName");
  let elError = document.getElementById("errorUserName");

  if (el.value === null || el.value === "") {
    result = false;
  }

  if (needShowMessages) {
    elError.innerText = result ? "" : REG_FORM_VALIDATION_MESSAGE_NAME;
  }

  return result;
}

function validateRegFormEmail(needShowMessages) {
  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  let result = true;
  let el = document.getElementById("email");
  let elError = document.getElementById("errorEmail");

  if (el.value === null || el.value === "") {
    result = false;

    if (needShowMessages) {
      elError.innerText = REG_FORM_VALIDATION_MESSAGE_EMAIL;
    }
  } else if (!re.test(el.value)) {
    result = false;

    if (needShowMessages) {
      elError.innerText = REG_FORM_VALIDATION_MESSAGE_EMAIL_SYNTAX;
    }
  } else {
    elError.innerText = "";
  }

  return result;
}

function validateRegFormAge(needShowMessages) {
  let result = true;
  let el = document.getElementById("checkbox_18");
  let elError = document.getElementById("errorAge");

  if (el.value === null || el.value === "" || !el.checked) {
    result = false;
  }

  if (needShowMessages) {
    elError.innerText = result ? "" : REG_FORM_VALIDATION_MESSAGE_AGE;
  }

  return result;
}

function validateRegFormPrivacy(needShowMessages) {
  let result = true;
  let el = document.getElementById("checkboxPrivat");
  let elError = document.getElementById("errorPrivacy");

  if (el.value === null || el.value === "" || !el.checked) {
    result = false;
  }

  if (needShowMessages) {
    elError.innerText = result ? "" : REG_FORM_VALIDATION_MESSAGE_PRIVACY;
  }

  return result;
}

function validateRegForm(needShowMessages) {
  let result = true;

  result = validateRegFormName(needShowMessages);

  if (result) {
    result = validateRegFormEmail(needShowMessages);
  }

  if (result) {
    result = validateRegFormAge(needShowMessages);
  }

  if (result) {
    result = validateRegFormPrivacy(needShowMessages);
  }

  let button_element = document.getElementById("registration_button");
  button_element.disabled = !result;

  return result;
}

document.getElementById("userName").addEventListener("blur", (event) => {
  validateRegFormName(true);
});
document.getElementById("userName").addEventListener("keyup", (event) => {
  validateRegForm(true);
});
document.getElementById("email").addEventListener("blur", (event) => {
  validateRegFormEmail(true);
});
document.getElementById("email").addEventListener("keyup", (event) => {
  validateRegForm(true);
});
document.getElementById("checkbox_18").addEventListener("click", (event) => {
  validateRegForm(true);
});
document.getElementById("checkboxPrivat").addEventListener("click", (event) => {
  validateRegForm(true);
});

function validateCheckboxes(checkboxes) {
  return [...checkboxes].some((checkbox) => checkbox.checked);
}
