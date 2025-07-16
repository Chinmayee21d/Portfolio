/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");



//about me
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");

}



/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPaper = new Swiper('.paper__container', {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});



/*==================== CONTACT FORM VALIDATIONS ====================*/
var nameError = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');

function validateName() {
  var name = document.getElementById('fullName').value;

  if (name.length == 0) {
    nameError.innerHTML = 'Full name is required!';
    return false;
  }
  if (!name.match(/[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/)) {
    nameError.innerHTML = 'Enter full name!';
    return false;
  }
  nameError.innerHTML = '<i class="uil uil-check-circle projects__modal-icon"></i>';
  return true;
}

function validateEmail() {
  var email = document.getElementById('email_id').value;

  if (email.length == 0) {
    emailError.innerHTML = 'A valid email address is required!';
    return false;
  }
  // if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
  if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
    emailError.innerHTML = 'Invalid email!';
    return false;
  }
  emailError.innerHTML = '<i class="uil uil-check-circle projects__modal-icon"></i>';
  return true;
}

function validateMessage() {
  var message = document.getElementById('message').value;
  var required = 30;
  var left = required - message.length;

  if (left > 0) {
    messageError.innerHTML = left + ' more characters are required!';
    return false;
  }
  messageError.innerHTML = '<i class="uil uil-check-circle projects__modal-icon"></i>';
  return true;
}


function SendMail(event) {
  if (event) event.preventDefault(); // Prevents form submission

  if (!validateName() || !validateEmail() || !validateMessage()) {
    swal("Sorry!", "Please fix the errors to send a message!", "warning");
    return false;
  }

  var params = {
    from_name: document.getElementById("fullName").value,
    email_id: document.getElementById("email_id").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  emailjs.send("service_y00cf27", "template_wkrr9wn", params)
    .then(function (response) {
      console.log("SUCCESS!", response.status, response.text);
      swal("Success!", "Your message has been sent!", "success");

      // Reset form fields
      document.getElementById("contact-form").reset();

      // Also clear error messages, if needed
      document.getElementById("name-error").innerText = "";
      document.getElementById("email-error").innerText = "";
      document.getElementById("message-error").innerText = "";
    }, function (error) {
      console.error("FAILED...", error);
      swal("Error!", "Failed to send message. Try again later.", "error");
    });

  return false;
}




/*==================== EMAIL SERVICE ====================*/
// function SendMail(event) {
//   if (event) event.preventDefault(); // Prevents form submission from scrolling up

//   if (!validateName() || !validateEmail() || !validateMessage()) {
//     swal("Sorry!", "Please fix the errors to send a message!", "warning");
//     return false;
//   }

//   var params = {
//     from_name: document.getElementById("fullName").value,
//     email_id: document.getElementById("email_id").value,
//     subject: document.getElementById("subject").value,
//     message: document.getElementById("message").value
//   };

//   emailjs.send("service_y00cf27", "template_wkrr9wn", params)
//     .then(function (response) {
//       console.log("SUCCESS!", response.status, response.text);
//       swal("Success!", "Your message has been sent!", "success");
//     }, function (error) {
//       console.error("FAILED...", error);
//       swal("Error!", "Failed to send message. Try again later.", "error");
//     });

//   return false; // Prevents further propagation
// }


const filterButtons = document.querySelectorAll('.filter__btn');
const paperCards = document.querySelectorAll('.paper__card');
const loadMoreBtn = document.querySelector('.load-more-btn');
let visibleCards = 6; // Initial number of visible cards per filter

// Function to update the visibility of the "Load More" button
function updateLoadMoreVisibility(filteredCards) {
  // If there are more hidden cards, show the "Load More" button
  const hiddenCards = filteredCards.filter(card => card.classList.contains('hidden'));
  if (hiddenCards.length > 0) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

// Function to show/hide papers based on filter and reset visible cards
function filterPapers(filter) {
  let filteredCards = [];

  // Show or hide cards based on the filter
  paperCards.forEach(card => {
    if (filter === 'all' || card.getAttribute('data-category') === filter) {
      card.classList.remove('hidden'); // Show the card
      filteredCards.push(card);
    } else {
      card.classList.add('hidden'); // Hide the card
    }
  });

  // Initially hide all papers after the visible limit
  filteredCards.forEach((card, index) => {
    if (index >= visibleCards) {
      card.classList.add('hidden');
    } else {
      card.classList.remove('hidden');
    }
  });

  // Update "Load More" button visibility
  updateLoadMoreVisibility(filteredCards);
}

// Set up event listeners for filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    filterPapers(filter); // Filter papers based on the clicked filter
  });
});

// Load more papers on "Load More" button click
loadMoreBtn.addEventListener('click', () => {
  const activeFilter = document.querySelector('.filter__btn.active').getAttribute('data-filter');
  const hiddenCards = [...document.querySelectorAll('.paper__card.hidden')].filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter);
  const limit = 3; // Number of papers to show per click

  // Show the next batch of hidden papers
  hiddenCards.forEach((card, index) => {
    if (index < limit) {
      card.classList.remove('hidden');
    }
  });

  // Update the visibility of the "Load More" button after loading more cards
  const filteredCards = [...paperCards].filter(card => activeFilter === 'all' || card.getAttribute('data-category') === activeFilter);
  updateLoadMoreVisibility(filteredCards);
});

// Initialize the page to show only the first 6 papers on load
document.addEventListener('DOMContentLoaded', () => {
  filterPapers('all'); // Initialize with "all" filter on page load
});




/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});




/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

// const themeButton = document.getElementById("theme-button");
// const darkTheme = "dark-theme";
// const iconTheme = "uil-sun";

// // Previously selected topic (if user selected)
// const selectedTheme = localStorage.getItem("selected-theme");
// const selectedIcon = localStorage.getItem("selected-icon");

// // We obtain the current theme that the interface has by validating the dark-theme class
// const getCurrentTheme = () =>
//   document.body.classList.contains(darkTheme) ? "dark" : "light";
// const getCurrentIcon = () =>
//   themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// //validate if user previously chose a theme
// if (selectedTheme) {
//   // if theme selected by user previously then we add/remove classes again based on localStorage
//   document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
//     darkTheme
//   );
//   themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
//     iconTheme
//   );
// }
//if initially there is no local storage ie. user has not made a choice and this is first time loading
//then we check if browser/OS is in dark mode and then add dark theme if required by default
else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  console.log("found dark mode for browser/OS");
  // add dark theme by setting dark theme flags in localStorage
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
  // add classes for dark theme in DOM
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
