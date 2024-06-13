// Declaration to manage input/output for calculator operations
const inputValue = document.getElementById("user-input");

// Event listeners for number buttons
const numbers = document.querySelectorAll(".numbers").forEach(function (item) {
  item.addEventListener("click", function (e) {
    // Clear if input is NaN or starting with 0
    if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
      inputValue.innerText = "";
    }
    inputValue.innerText += e.target.innerHTML.trim();
  });
});

// Event listener for operational buttons
const operations = document.querySelectorAll(".operations").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const lastValue = inputValue.innerText.substring(inputValue.innerText.length - 1);
    
    if (!isNaN(lastValue) && e.target.innerHTML === "=") {
      // Evaluate expression and display result
      inputValue.innerText = eval(inputValue.innerText);
    } else if (e.target.innerHTML === "AC") {
      // Clear input
      inputValue.innerText = "0";
    } else if (e.target.innerHTML === "DEL") {
      // Delete last character
      inputValue.innerText = inputValue.innerText.substring(0, inputValue.innerText.length - 1);
      // If empty, set to 0
      if (inputValue.innerText.length === 0) {
        inputValue.innerText = "0";
      }
    } else {
      // Allow input of operators only after a number
      if (!isNaN(lastValue)) {
        inputValue.innerText += e.target.innerHTML;
      }
    }
  });
});
