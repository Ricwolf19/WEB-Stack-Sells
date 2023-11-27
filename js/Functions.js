document.getElementById("message-change-btn").addEventListener("click", function() {
    var messageBtn = document.getElementById("message-btn");
  
    if (messageBtn.style.left === "0px") {
      messageBtn.style.right = "0";
      messageBtn.style.left = "";
      messageBtn.style.backgroundColor = "#00296b";
      document.getElementById("message-title").innerText = "Support";
      document.getElementById("message-icon").className = "bi bi-wrench-adjustable-circle-fill";
    } else {
      messageBtn.style.left = "0";
      messageBtn.style.right = "";
      messageBtn.style.backgroundColor = "#38b000";
      document.getElementById("message-title").innerText = "Review";
      document.getElementById("message-icon").className = "bi bi-card-text";
    }
  });
  