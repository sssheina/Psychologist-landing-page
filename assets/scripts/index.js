//  ----- HEADER COLOR -----

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

// ----- SWITCHING CLASSES to show or hide the burger menu (mobile or PC version) -----

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  let menuArrow = document.querySelector(".menu__arrow");

  menuArrow.addEventListener("click", function () {
    menuArrow.parentElement.classList.toggle("_active");
    console.log(menuArrow.parentElement);
  });
} else {
  document.body.classList.add("_pc");
}

//  ----- BURGER MENU -----
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

// Parallax
var rellax = new Rellax(".rellax");

// ----- SLIDER HELP -----

const swiper = new Swiper(".swiper", {
  grabCursor: true,
  touchRatio: 2,
  slideToClickedSlide: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  // slidesPerView: 1, // - по умолчанию значение 1
  slidesPerView: 3,
  // breakpoints: {
  //   320: {
  //     slidesPerView: 1,
  //   },
  //   480: {
  //     slidesPerView: 2,
  //   },
  //   992: {
  //     slidesPerView: 3,
  //   },
  // },
  loop: true,
  loopedSlides: 3,
  watchOverflow: true,
  spaceBetween: 37,
  slidesPerGroup: 2,
  // centeredSlides: true,
  initialSlide: 0,
  freeMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 1200,
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const headerContainer = document.querySelector(".header__container");
  header.classList.toggle("scrolled", window.scrollY > 0);
  headerContainer.classList.toggle(
    "scrolledHeaderContainer",
    window.scrollY > 0
  );
});

// ___________________________

// ----- DOWNLOAD FILE -----

function downloadPDF() {
  const link = document.createElement("a");
  link.href = "./assets/images/guide.pdf";
  link.download = "guide.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function scrollToRegistration() {
  const targetBlock = document.getElementById("registration");
  targetBlock.scrollIntoView({ behavior: "smooth" });
}

//----- Thanx-message -----

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".thanx-message__link");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

modal.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modalClose();
  }
});


// ----- Privacy Policy -----

const modalPrivacy = document.querySelector(".privacy-policy__concent");
const overlayPrivacy = document.querySelector(".privacy-policy");
const openModalBtnPrivacy = document.querySelector(".privacy-policy__link");
const closeModalBtnPrivacy = document.querySelector(".privacy-policy__btn-close");

const openModalPrivacy = function () {
  modalPrivacy.classList.remove("hidden");
  overlayPrivacy.classList.remove("hidden");
};

openModalBtnPrivacy.addEventListener("click", openModalPrivacy);

const closeModalPrivacy = function () {
  modalPrivacy.classList.add("hidden");
  overlayPrivacy.classList.add("hidden");
};

closeModalBtnPrivacy.addEventListener("click", closeModalPrivacy);

overlayPrivacy.addEventListener("click", closeModalPrivacy);

modalPrivacy.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalPrivacy.classList.contains("hidden")) {
    closeModalPrivacy ();
  }
});


// const privacyPolicyLink = document.querySelector(".privacy-policy__link");
// const privacyPolicy = document.querySelector(".privacy-policy");
// const closePopupBtn = document.querySelector(".privacy-policy__btn-close");

// privacyPolicyLink.addEventListener("click", () => {
//   privacyPolicy.style.display = "block";
// });
// closePopupBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   privacyPolicy.style.display = "none";
// });

// _________________________________________________

// // ----- Smooth scrollbar -----
// var Scrollbar = window.Scrollbar;
// const options = {
//   damping: 0.05,
// };
// Scrollbar.init(document.querySelector("#my-scrollbar"), options);


//////////////////////////////////
// CONSTANTS
//////////////////////////////////

// REGISTRATION FORM CONSTANTS
const REG_FORM_VALIDATION_MESSAGE_NAME = "Имя должно быть заполнено";

// ____________________________PHPMailer__________________________

async function submitForm(event) {
  event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
 try {
	 
   // Validating the form
   if(!validateRegForm(false)){
	   return;
   }
   
   // Формируем запрос
   const response = await fetch("send.php", {
     method: "POST",
     body: new FormData(emailform),
   });
   // проверяем, что ответ есть
   if (!response.ok)
     throw `Ошибка при обращении к серверу: ${response.status}`;
   // проверяем, что ответ действительно JSON
   const contentType = response.headers.get("content-type");
   if (!contentType || !contentType.includes("application/json")) {
     throw "Ошибка обработки. Ответ не JSON";
   }
   // обрабатываем запрос
   const json = await response.json();
   if (json.result === "success") {
     // в случае успеха
     showThankYouMessage();
    //  alert(json.info);
   } else {
     // в случае ошибки
     console.log(json);
     throw json.info;
   }
 } catch (error) {
   // обработка ошибки
   alert(error);
 }
}

function showThankYouMessage() {
  modal.style.display = "block";
}


// async function submitForm(event) {
//   event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
//   try {
//     // Формируем запрос
//     const response = await fetch("send.php", {
//       method: "POST",
//       body: new FormData(emailform),
//     });
//     // проверяем, что ответ есть
//     if (!response.ok)
//       throw `Ошибка при обращении к серверу: ${response.status}`;
//     // проверяем, что ответ действительно JSON
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw "Ошибка обработки. Ответ не JSON";
//     }
//     // обрабатываем запрос
//     const json = await response.json();
//     if (json.result === "success") {
//       // в случае успеха
//       showThankYouMessage();
//       //  alert(json.info);
//     } else {
//       // в случае ошибки
//       console.log(json);
//       throw json.info;
//     }
//   } catch (error) {
//     // обработка ошибки
//     alert(error);
//   }
// }

// function showThankYouMessage() {
//   modal.style.display = "block";
// }

// ----- Education PIC-ZOOM -----

document.querySelectorAll(".education__pic").forEach((image) => {
  image.onclick = () => {
    document.querySelector(".education__popup").style.display = "block";
    document.querySelector(".education__popup-img").src =
      image.getAttribute("src");
  };
});
document.querySelector(".education__btn-close").onclick = () => {
  document.querySelector(".education__popup").style.display = "none";
};

window.onclick = (event) => {
  let popup = document.querySelector(".education__popup");
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

//  ----- REGISTRATION FORM -----

const form = document.querySelector(".formWithValidation");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const checkboxAdult = document.querySelectorAll(".checkbox_18");
const checkboxPrivat = document.querySelectorAll(".checkboxPrivat");
const errorsInfo = document.querySelector("#errorsInfo");
const errorUserName = document.querySelector("#errorUserName");
const errorEmail = document.querySelector("#errorEmail");
const whatsappInput = document.querySelector("#whatsApp");

let submitted = false;

// const whatsappRegex = /\+[0-9]{1,3}\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}/;

// Registration form validation functions
//----------------------------------------

//If needShowMessages = true, the validation messages will be displayed beneath the name field
//Return true if validation is ok, false otherwise
function validateRegFormName(needShowMessages){
	
	//Doing the basic validation - the name field should not be empty
	let result = true;
	let el = document.getElementById("userName");
	// let elError = document.getElementById("usernameError");
	
	
	if(el.value === null || el.value === ""){
		result = false;
	}
	
	if(needShowMessages){
    errorUserName.innerText = result ? "" : REG_FORM_VALIDATION_MESSAGE_NAME;
	}
	
	return result;
}

function validateRegForm(needShowMessages){
	let result = true;
	
	result = validateRegFormName(needShowMessages);
	
	if(result){
		//validating other controls
	}
	
	return result;
}

document.getElementById("userName").addEventListener("keyup", (event) => {
	validateRegFormName(true);
})

function validateEmail(email) {
  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  return re.test(email);
}

function validateCheckboxes(checkboxes) {
  return [...checkboxes].some((checkbox) => checkbox.checked);
}

/*
form.addEventListener("submit", (e) => {
  if (!submitted) {
    submitted = true;
  }

  let errors = [];

  if (userName.value === "") {
    // Check if the username field is empty
    errors.push("Имя обязательно");
  }

  if (email.value === "") {
    // Check if the email field is empty
    errors.push("Email обязателен");
  } else if (!validateEmail(email.value)) {
    // Check if the email format is valid
    errors.push("Недействительный адрес электронной почты");
  }

  if (!validateCheckboxes(checkboxAdult)) {
    errors.push("Подтверди, что тебе больше 18 лет");
  }

  if (!validateCheckboxes(checkboxPrivat)) {
    errors.push("Необходимо согласиться с условиями");
  }

  // if (!whatsappRegex.test(whatsappInput.value)) {
  //   errors.push('Поле WhatsApp может содержать только цифры, "-", "+", "()" и пробелы');
  // }

  if (errors.length > 0) {
    e.preventDefault();
    errorsInfo.innerHTML = errors.join("<br>");
    errorsInfo.style.color = "#fb7070";
  } else {
    errorsInfo.innerHTML = "";
    form.submit();
  }
});
*/

// input.onblur = function() {
//   if (!input.value.includes('@')) { // не email
//     input.classList.add('invalid');
//     error.innerHTML = 'Пожалуйста, введите правильный email.'
//   }
// };

// input.onfocus = function() {
//   if (this.classList.contains('invalid')) {
//     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
//     this.classList.remove('invalid');
//     error.innerHTML = "";
//   }
// };

email.onblur = function() {
  if (email.value === "") {
    // Check if the email field is empty
    email.classList.add('invalid');
    errorsInfo.innerHTML = 'Email обязателен'
  }
  else if (!validateEmail(email.value)) { // не email
    email.classList.add('invalid');
    errorsInfo.innerHTMLL = 'Пожалуйста, введи правильный email.'
  }
};

email.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    this.classList.remove('invalid');
    errorsInfo.innerHTML = "";
  }
};

userName.addEventListener("input", () => {
  if (submitted) errorsInfo.innerHTML = "";
});

email.addEventListener("input", () => {
  if (submitted) errorsInfo.innerHTML = "";
});

whatsappInput.addEventListener("input", () => {
  if (submitted) errorsInfo.innerHTML = "";
});

checkboxAdult.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (submitted) errorsInfo.innerHTML = "";
  });
});

checkboxPrivat.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (submitted) errorsInfo.innerHTML = "";
  });
});



// const whatsappRegex = /\+[0-9]{1,3}\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}/;

// function validateEmail(email) {
//   const re =
//     /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
//   return re.test(email);
// }

// function validateCheckboxes(checkboxes) {
//   return [...checkboxes].some((checkbox) => checkbox.checked);
// }

/*
form.addEventListener("submit", (e) => {
  if (!submitted) {
    submitted = true;
  }

  let errors = [];

  if (userName.value === "") {
    // Check if the username field is empty
    errors.push("Имя обязательно");
  }

  if (email.value === "") {
    // Check if the email field is empty
    errors.push("Email обязателен");
  } else if (!validateEmail(email.value)) {
    // Check if the email format is valid
    errors.push("Недействительный адрес электронной почты");
  }

  if (!validateCheckboxes(checkboxAdult)) {
    errors.push("Подтверди, что тебе больше 18 лет");
  }

  if (!validateCheckboxes(checkboxPrivat)) {
    errors.push("Необходимо согласиться с условиями");
  }

  // if (!whatsappRegex.test(whatsappInput.value)) {
  //   errors.push('Поле WhatsApp может содержать только цифры, "-", "+", "()" и пробелы');
  // }

  if (errors.length > 0) {
    e.preventDefault();
    errorsInfo.innerHTML = errors.join("<br>");
    errorsInfo.style.color = "#fb7070";
  } else {
    errorsInfo.innerHTML = "";
    form.submit();
  }
});
*/

// input.onblur = function() {
//   if (!input.value.includes('@')) { // не email
//     input.classList.add('invalid');
//     error.innerHTML = 'Пожалуйста, введите правильный email.'
//   }
// };

// input.onfocus = function() {
//   if (this.classList.contains('invalid')) {
//     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
//     this.classList.remove('invalid');
//     error.innerHTML = "";
//   }
// };

// email.onblur = function () {
//   if (email.value === "") {
//     // Check if the email field is empty
//     email.classList.add("invalid");
//     errorsInfo.innerHTML = "Email обязателен";
//   } else if (!validateEmail(email.value)) {
//     // не email
//     email.classList.add("invalid");
//     errorsInfo.innerHTMLL = "Пожалуйста, введи правильный email.";
//   }
// };

// email.onfocus = function () {
//   if (this.classList.contains("invalid")) {
//     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
//     this.classList.remove("invalid");
//     errorsInfo.innerHTML = "";
//   }
// };

// userName.addEventListener("input", () => {
//   if (submitted) errorsInfo.innerHTML = "";
// });

// email.addEventListener("input", () => {
//   if (submitted) errorsInfo.innerHTML = "";
// });

// whatsappInput.addEventListener("input", () => {
//   if (submitted) errorsInfo.innerHTML = "";
// });

// checkboxAdult.forEach((checkbox) => {
//   checkbox.addEventListener("change", () => {
//     if (submitted) errorsInfo.innerHTML = "";
//   });
// });

// checkboxPrivat.forEach((checkbox) => {
//   checkbox.addEventListener("change", () => {
//     if (submitted) errorsInfo.innerHTML = "";
//   });
// });

//  ----- Посточные ошибки в инпутах -----

// JavaScript
// document.getElementById('username').addEventListener('input', function (e) {
//   let target = e.target;
//   let error = document.getElementById('usernameError');

//   if (target.value === '') {
//       error.textContent = 'Username is required';
//       error.style.display = 'block';
//   } else {
//       error.style.display = 'none';
//   }
// });

// document.getElementById('email').addEventListener('input', function (e) {
//   let target = e.target;
//   let error = document.getElementById('emailError');

//   if (target.value === '') {
//       error.textContent = 'Email is required';
//       error.style.display = 'block';
//   } else if (!target.validity.valid) {
//       error.textContent = 'Please enter a valid email';
//       error.style.display = 'block';
//   } else {
//       error.style.display = 'none';
//   }
// });

// document.getElementById('myForm').addEventListener('submit', function (e) {
//   let username = document.getElementById('username');
//   let email = document.getElementById('email');

//   if (username.value === '' || email.value === '' || !email.validity.valid) {
//       e.preventDefault();
//   }
// });

// ----- BUTTON UP -----

const btnUp = document.querySelector(".button-up");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  if (scrollY > 400) {
    btnUp.style.display = "block";
  } else {
    btnUp.style.display = "none";
  }
});

btnUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// ----- Прокрутка при клике -----
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

//  ----- BUTTON GLOW EFFECT -----

(function setGlowEffectRx() {
  const glowEffects = document.querySelectorAll(".glow-effect");

  glowEffects.forEach((glowEffect) => {
    const glowLines = glowEffect.querySelectorAll("rect");
    const rx = getComputedStyle(glowEffect).borderRadius;

    glowLines.forEach((line) => {
      line.setAttribute("rx", rx);
    });
  });
})();
