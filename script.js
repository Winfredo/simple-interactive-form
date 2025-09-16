document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const inputs = form.querySelectorAll("input");
  const successMessage = document.getElementById("successMessage");

  const validators = {
    name: (value) => value.trim() !== "" || "Name is required.",
    email: (value) => {
      if (!value.trim()) return "Email is required.";
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return email.test(value) || "Please enter a valid email.";
    },
    phone: (value) => {
      if (!value.trim()) return "Phone number is required.";
      const phone = /^[0-9\s\-()+]+$/;
      return phone.test(value) || "Please enter a valid phone number.";
    },
    password: (value) => {
      if (!value.trim()) return "Password is required.";
      const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return password.test(value) || "Password must be 8+ chars, include uppercase, lowercase & number.";
    },
  };

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMsg = formGroup.querySelector(".error-message");
    input.classList.add("error");
    errorMsg.textContent = message;
  }

  function clearError(input) {
    const formGroup = input.parentElement;
    const errorMsg = formGroup.querySelector(".error-message");
    input.classList.remove("error");
    errorMsg.textContent = "";
  }

  function validateInput(input) {
    const name = input.name;
    const value = input.value;
    const validation = validators[name](value);
    if (validation === true) {
      clearError(input);
      return true;
    } else {
      showError(input, validation);
      return false;
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      successMessage.textContent = "";
    });
    input.addEventListener("blur", () => {
      validateInput(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;

    inputs.forEach((input) => {
      const valid = validateInput(input);
      if (!valid) allValid = false;
    });

    if (allValid) {
      successMessage.textContent = "Form submitted successfully!";
      form.reset();
      inputs.forEach(clearError);
    } else {
      successMessage.textContent = "";
    }
  });
});
