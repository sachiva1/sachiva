
  const text = "Reliable IT Solutions for\nYour Business";
  let i = 0;
  const speed = 80; // typing speed in milliseconds
  const typingElement = document.getElementById("typing-text");

  function typeWriter() {
    if (i < text.length) {
      typingElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      // After typing is complete, remove the blinking caret
      typingElement.style.borderRight = "none";
    }
  }

  window.onload = typeWriter;

