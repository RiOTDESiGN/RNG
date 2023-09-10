"use strict"

const generateBtn = document.getElementById("generate-button");
const autoGenerateCheckbox = document.getElementById("auto-generate-button");
const autoGenerateBtnStyle = document.getElementById("auto-generate-button-style");
const resetBtn = document.getElementById("reset-button")
const oddToggle = document.getElementById("toggle-odd-numbers");
const evenToggle = document.getElementById("toggle-even-numbers");
const primeToggle = document.getElementById("toggle-prime-numbers");
const compositeToggle = document.getElementById("toggle-composite-numbers");
const binaryToggle = document.getElementById("toggle-binary-numbers");
const allToggle = document.getElementById("toggle-all-numbers");
const otherCheckboxes = [
    { element : oddToggle       , name : "odd"       },
    { element : evenToggle      , name : "even"      },
    { element : primeToggle     , name : "prime"     },
    { element : compositeToggle , name : "composite" },
    { element : binaryToggle    , name : "binary"    },
];
const numberHistory = document.getElementById("number-history");
const bgColorPicker = document.getElementById('bg-color-picker');
const borderColorPicker = document.getElementById('border-color-picker');
const resetColor = document.getElementById('reset');
const modal = document.getElementById("custom-modal");
const closeBtn = document.getElementById("close-btn");

const randomNumbers = [];

let intervalId;
let generatedCount = 0;

generateBtn.addEventListener("click", generateRandomNumber);
autoGenerateCheckbox.addEventListener("change", autoGenerate);
resetBtn.addEventListener("click", resetHistory);
resetColor.addEventListener("click", resetColorToDefault);

for ( const { element, name } of otherCheckboxes ) {
    element.addEventListener("change", () => {
        element.checked
          ? numberHistory.classList.add(`show${ name }`)
          : numberHistory.classList.remove(`show${ name }`);
    })
}

allToggle.addEventListener("change", toggleAll);
bgColorPicker.addEventListener('change', () => {document.documentElement.style.setProperty('--bg', bgColorPicker.value);});
borderColorPicker.addEventListener('change', () => {document.documentElement.style.setProperty('--c', borderColorPicker.value);});

function generateRandomNumber() {
  if (generatedCount >= 9999) {
    generateBtn.disabled = true;
    autoGenerateCheckbox.checked = false;
    autoGenerateBtnStyle.classList.add("deadcheckmark");
    clearInterval(intervalId);
    modal.classList.add("fade-in");
    modal.classList.add("show");
    return;
  }

  const randomNumber = Math.floor(Math.random() * 101);
  randomNumbers.push(randomNumber);
  generatedCount++;

  displayResults();
}

function isPrime(currentNumber) {
  if (currentNumber < 2) return false;
  for (let i = 2; i <= Math.sqrt(currentNumber); i++) {
    if (currentNumber % i === 0) {
      return false;
    }
  }
  return true;
}

function isComposite(currentNumber) {
  if (currentNumber < 4) return false;
  for (let i = 2; i <= Math.sqrt(currentNumber); i++) {
    if (currentNumber % i === 0) {
      return true;
    }
  }
  return false;
}

function isBinary(currentNumber) {
  return currentNumber === 0 || currentNumber === 1;
}

function displayResults() { 
  const average = randomNumbers.reduce((a, b) => a + b, 0) / randomNumbers.length ||  0;
  document.getElementById("average").textContent = average.toFixed(0);
  document.getElementById("count").textContent = randomNumbers.length;
  
  const currentNumber = randomNumbers[randomNumbers.length - 1];
  const previousNumber = randomNumbers[randomNumbers.length - 2];
  
  document.getElementById("current-number").textContent = currentNumber ?? "0";
  document.getElementById("previous-number").textContent = previousNumber ?? "0";
  
  if ( randomNumbers.length <= 0 ) return;
  
  const divElement = document.createElement("div");

  divElement.textContent = currentNumber;

  if (isPrime(currentNumber))
    divElement.classList.add("prime");
  
  if (isComposite(currentNumber))
    divElement.classList.add("composite");
  
  if (isBinary(currentNumber))
    divElement.classList.add("binary");
  
  divElement.classList.add(currentNumber % 2 ? "odd" : "even");
  
  document.getElementById("number-history").appendChild(divElement);
}

function autoGenerate() {
  if (autoGenerateCheckbox.checked) {
    generateBtn.disabled = true;
    intervalId = setInterval(generateRandomNumber, 1);
  } else {
    generateBtn.disabled = false;
    clearInterval(intervalId);
  }
}

function toggleAll() {
    for (const { element } of otherCheckboxes)
      element.checked = allToggle.checked;
      
    numberHistory.className = allToggle.checked
        ? "history showodd showeven showprime showcomposite showbinary"
        : "history";
  }

otherCheckboxes.forEach(({element}) => {
    element.addEventListener("click", () => {
    if (!element.checked) {
      allToggle.checked = false;
    } else {
      const allOtherCheckboxesChecked = otherCheckboxes.every(({element}) => element.checked);
      if (allOtherCheckboxesChecked) {
        allToggle.checked = true;
      }
    }
  });
});

function resetHistory() {
  numberHistory.className = "history";
  numberHistory.replaceChildren();
  randomNumbers.splice(0);
  displayResults();
  clearInterval(intervalId);
  generatedCount = 0;
  autoGenerateCheckbox.disabled = false;
  autoGenerateCheckbox.checked = false;
  document.getElementById("myBar").style.height = 0;
  autoGenerateBtnStyle.classList.remove("deadcheckmark");
  
  for (const { element } of otherCheckboxes)
    element.checked = false;

  allToggle.checked = false;
  generateBtn.disabled = false;
}

function resetColorToDefault() {
  document.documentElement.style.setProperty('--bg', '#2b2b2b');
  document.documentElement.style.setProperty('--c', '#979797');
  borderColorPicker.value = '#979797';
  bgColorPicker.value = '#2b2b2b';
}

closeBtn.addEventListener("click", function() {
  autoGenerateCheckbox.disabled = true;
  modal.classList.remove("fade-in");
  modal.classList.add("fade-out");

  setTimeout(function() {
    modal.classList.remove("fade-out");
    modal.classList.remove("show");
  }, 500);
});

// ********************************************************************************** NAV BURGER

var nav = document.getElementById('nav');
var navlinks = nav.getElementsByTagName('a');

function toggleNav() {
    (nav.classList.contains('active')) ? nav.classList.remove('active') : nav.classList.add('active');
  }

document.getElementById('nav-icon').addEventListener('click', function(e) {
    e.preventDefault();
    toggleNav();
});

for(var i = 0; i < navlinks.length; i++) {
  navlinks[i].addEventListener('click', function() {
    toggleNav();
});
}

// ********************************************************************************** AUTO BUTTON

const toggleButton = document.getElementById("auto-generate-button");
toggleButton.addEventListener("click", toggleBtn);

function toggleBtn() {
    if (toggleButton.classList.contains("toggle-off")) {
        toggleButton.classList.remove("toggle-off");
        toggleButton.classList.add("toggle-on");
      } else {
        toggleButton.classList.remove("toggle-on");
        toggleButton.classList.add("toggle-off");
      }
}

// ****************************************************************************** SCROLL PROGRESS

window.onscroll = function() {scrollProgress()};

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.height = scrolled + "%";
}