const video = document.getElementById("video");
const textOutput = document.getElementById("text-output");

// Function to display the extracted text
function displayText(text) {
  textOutput.textContent = text;
}

// Function to capture a screenshot and perform OCR
async function captureText() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0);

  // Tesseract.js setup (adjust language as needed)
  const worker = Tesseract.createWorker({
    logger: m => console.log(m),
    lang: "eng", // Change language code if needed (e.g., "spa" for Spanish)
  });
  await worker.load();
  await worker.loadLanguage("eng"); // Same language code as above
  await worker.initialize("eng"); // Same language code as above

  const { data: { text } } = await worker.recognize(canvas);
  worker.terminate();

  displayText(text);
}

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    // Add a button or timer to trigger captureText
  })
  .catch(error => {
    console.error("Error accessing camera:", error);
  });
