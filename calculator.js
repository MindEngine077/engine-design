// Convert pixels to REM
function convertToRem() {
  let pixels = document.getElementById("pixelInput").value;
  if (pixels) {
    let rem = pixels / 16; // Assuming 1rem = 16px
    document.getElementById("remResult").textContent = rem.toFixed(3);
  } else {
    document.getElementById("remResult").textContent = "-";
  }
}

// Convert element width to percentage based on container
function calculatePercentage() {
  let containerWidth = document.getElementById("containerWidth").value;
  let elementWidth = document.getElementById("elementWidth").value;

  if (containerWidth && elementWidth) {
    let percentage = (elementWidth / containerWidth) * 100;
    document.getElementById("percentageResult").textContent =
      percentage.toFixed(2);
  } else {
    document.getElementById("percentageResult").textContent = "-";
  }
}

// Convert pixels to viewport width (vw) or height (vh)
function convertToViewport() {
  let viewportValue = document.getElementById("viewportValue").value;
  let viewportType = document.getElementById("viewportType").value;
  let viewportSize =
    viewportType === "vw" ? window.innerWidth : window.innerHeight;

  if (viewportValue) {
    let viewport = (viewportValue / viewportSize) * 100;
    document.getElementById("viewportResult").textContent = viewport.toFixed(2);
    document.getElementById("viewportUnit").textContent = viewportType;
  } else {
    document.getElementById("viewportResult").textContent = "-";
  }
}
