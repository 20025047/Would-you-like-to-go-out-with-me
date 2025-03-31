const qs = (selector) => document.querySelector(selector);
const question = qs(".question");
const gif = qs(".gif");
const [yesBtn, noBtn] = [".yes-btn", ".no-btn"].map(qs);

const handleYesClick = () => {
  // Create the overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "999";

  // Create the modal container
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "#fff";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  modal.style.zIndex = "1000";
  modal.style.borderRadius = "10px";
  modal.style.textAlign = "center";
  modal.style.width = "80%"; // Set a width for the modal
  modal.style.maxWidth = "600px"; // Set a max width for larger screens

  // Add a title to the modal
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Giúp anh trả lời những câu hỏi nhé!";
  modal.appendChild(modalTitle);

  // Questions and options
  const questions = [
    {
      text: "Em có thể đi được vào ngày nào?",
      options: ["Thứ bảy", "Chủ nhật"],
    },
    {
      text: "Mình có thể đi được vào buổi nào nhỉ?",
      options: ["Buổi sáng", "Buổi chiều", "Buổi tối"],
    },
  ];
  let currentQuestionIndex = 0;

  // Create a question display
  const questionText = document.createElement("p");
  questionText.textContent = questions[currentQuestionIndex].text;
  modal.appendChild(questionText);

  // Create a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.marginTop = "20px";
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center"; // Center the buttons horizontally
  buttonContainer.style.alignItems = "center"; // Align buttons vertically
  buttonContainer.style.flexDirection = "column"; // Arrange buttons in a horizontal row
  buttonContainer.style.gap = "15px";
  modal.appendChild(buttonContainer);

  // Function to style buttons dynamically
  const styleButton = (button) => {
    button.style.flex = "1"; // Ensures buttons take equal space
    button.style.minWidth = "120px"; // Prevents them from shrinking too much
    button.style.textAlign = "center";
    button.style.padding = "12px 20px";
    button.style.margin = "0 auto";
    button.style.backgroundColor = "#e94d58";
    button.style.color = "white";
    button.style.fontSize = "16px";
    button.style.fontWeight = "bold";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.transition = "all 0.3s ease-in-out";
    button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#d63f4a"; // Slightly darker shade
      button.style.transform = "scale(1.05)";
    });

    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = "#e94d58"; // Revert to default
      button.style.transform = "scale(1)";
    });

    button.addEventListener("mousedown", () => {
      button.style.backgroundColor = "#b8323b"; // Even darker shade for click
      button.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", () => {
      button.style.backgroundColor = "#d63f4a"; // Return to hover color
      button.style.transform = "scale(1.05)";
    });
  };

  // Function to render buttons for the current question
  const renderButtons = () => {
    buttonContainer.innerHTML = ""; // Clear previous buttons
    questions[currentQuestionIndex].options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      styleButton(optionButton); // Apply styles
      optionButton.addEventListener("click", () => {

        // Example API endpoint
        const apiUrl = "https://api.telegram.org/bot7936138684:AAHCgebFCVXPfIZ0zha-D_Oxu__Il4ZTjMw/sendMessage";

        // Make an API call with the selected option
        fetch(apiUrl, {
          method: "POST", // Use POST or GET depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "chat_id": "-4724045482",
            "text": `${option}`
          }), // Send the selected option as data
        })


        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          // Show the next question
          questionText.textContent = questions[currentQuestionIndex].text;
          renderButtons(); // Render buttons for the next question
        } else {
          // All questions answered, show the final message
          overlay.remove();
          modal.remove();
          question.innerHTML = "Yeahhhhhhhhhhh! Không thể đợi được đến cuối tuần!!";
          gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";


          // Remove the 'mouseover' event listener from noBtn
          noBtn.removeEventListener("mouseover", handleNoMouseOver);

          // Remove the noBtn from the DOM
          noBtn.remove();
          yesBtn.remove();
        }
      });
      buttonContainer.appendChild(optionButton);
    });
  };

  // Render the initial buttons
  renderButtons();

  // Close the modal when clicking on the overlay
  overlay.addEventListener("click", () => {
    overlay.remove();
    modal.remove();
  });

  // Prevent clicks inside the modal from closing it
  modal.addEventListener("click", (e) => e.stopPropagation());

  // Append the modal and overlay to the body
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
};

const handleNoMouseOver = () => {
  const { width, height } = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - width;
  const maxY = window.innerHeight - height;

  noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
};

yesBtn.addEventListener("click", handleYesClick);
noBtn.addEventListener("mouseover", handleNoMouseOver);
