const {
    FFmpeg
} = FFmpegWASM;
const {
    fetchFile
} = FFmpegUtil;

const ExecuteStatus = Object.freeze({
    Wait: "wait",
    Start: "start",
    Processing: "processing",
    Processed: "processed",
    Error: "error"
})

const ffmpeg = new FFmpeg();
ffmpeg.load({});

ffmpeg.on('progress', ({
    progress,
    time
}) => {
    console.log(`${progress * 100} % (transcoded time: ${time / 1000000} s)`);
    updateCurrentFileProgress(Math.round(progress * 100));
});

var logBuffer = [];
ffmpeg.on('log', ({
    type,
    message
}) => {
    console.log(type, message);
    if (type == "stderr") logBuffer.push(message);
});

let currentFileElement = null;
let convertedFiles = [];

function createResultRow(fileName) {
    const displayName = fileName.replace(/\.[^/.]+$/, ".mp3");
    const row = document.createElement('div');
    row.className = 'resultRow';
    row.innerHTML = `
        <div class="fileName">${displayName}</div>
        <div class="statusArea">
            <div class="progress"></div>
            <div class="error"></div>
        </div>
        <div class="rightCol">
            <div class="progress">0%</div>
        </div>
    `;
    return row;
}

function updateCurrentFileProgress(progress) {
    if (!currentFileElement) return;
    const rightCol = currentFileElement.querySelector(".rightCol");
    rightCol.innerHTML = `<div class="progress">${progress}%</div>`;
}

function setFileStatus(fileElement, status, message = "") {
    const rightCol = fileElement.querySelector(".rightCol");
    const errorElement = fileElement.querySelector(".error");

    switch (status) {
        case ExecuteStatus.Processing:
            errorElement.style.display = "none";
            break;
        case ExecuteStatus.Processed:
            const downloadButton = `<a href="#" class="downloadButton">Save Mp3 <i class="gg-software-download"></i></a>`;
            rightCol.innerHTML = downloadButton;
            errorElement.style.display = "none";
            break;
        case ExecuteStatus.Error:
            rightCol.innerHTML = '';
            errorElement.style.display = "block";
            errorElement.textContent = message || "File has no sound";
            break;
    }
}

async function convertFileToAudio(file) {
    const fileElement = createResultRow(file.name);
    document.querySelector(".resultRows").appendChild(fileElement);
    currentFileElement = fileElement;

    console.log("file:", file);
    const inputName = file.name;
    let resultName = inputName.replace(/\.[^/.]+$/, ".mp3");

    if (ffmpeg.loaded) {
        await ffmpeg.terminate();
    }
    await ffmpeg.load();

    try {
        await ffmpeg.writeFile(inputName, await fetchFile(file));
    } catch (e) {
        console.log("error during writing file");
        setFileStatus(fileElement, ExecuteStatus.Error, "Error writing file");
        return;
    }

    const commandList = ["-i", inputName, "-b:a", "128k", resultName];
    console.log("ffmpeg ", commandList.join(" "));

    try {
        await ffmpeg.exec(commandList);
        const data = await ffmpeg.readFile(resultName);
        const blob = new Blob([data.buffer]);

        setFileStatus(fileElement, ExecuteStatus.Processed);
        const a = fileElement.querySelector('.downloadButton');
        if (a) {
            a.href = URL.createObjectURL(blob);
            a.download = resultName;
            convertedFiles.push({
                element: fileElement,
                blob: blob,
                filename: resultName
            });
            updateDownloadAllButton();
        }
    } catch (error) {
        console.log("error found during converting-process", error);
        setFileStatus(fileElement, ExecuteStatus.Error, error.message);
    }
}

function updateDownloadAllButton() {
    const downloadAllBtn = document.querySelector('.downloadAllButton');
    if (convertedFiles.length > 1) {
        downloadAllBtn.style.display = 'block';
    }
}

async function processFiles(files) {
    document.getElementById("load-field").style.display = "none";
    document.getElementById("converting-process").style.display = "block";
    document.querySelector('.actions').classList.add('visible');
    for (const file of files) {
        await convertFileToAudio(file);
    }
}

document.getElementById('file-input').addEventListener('change', async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    await processFiles(files);
});

document.querySelector('.addMoreButton').addEventListener('click', () => {
    document.getElementById("converting-process").style.display = "none";
    document.getElementById("load-field").style.display = "block";
    document.getElementById('file-input').value = "";
});


counter = 0;
document.querySelector('.downloadAllButton').addEventListener('click', async () => {
    if (convertedFiles.length <= 1) return;

    const checkMap = new Map();

    const zip = new JSZip();
    convertedFiles.forEach(file => {
        filename = file.filename;
        if (checkMap.has(filename)) {
            value = checkMap.get(filename);
            value++;
            ext = filename.split(".");
            filename = ext[0]+`_${value}.`+ext[1];
            zip.file(filename, file.blob);
            checkMap.set(filename, value);
        } else {
            zip.file(filename, file.blob);
            checkMap.set(filename, 0);
        }
    });

    const content = await zip.generateAsync({
        type: "blob"
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = "All_Converted_Mp3_files.zip";
    a.click();
});




var buttonClicked = false;
var popupWindow; 
var baseUrls = [
  "https://adstera2025",
  "https://gsmsanjoy",
  "https://filehere24",
  "https://gsmsoft2025"
];
var queryString = ".blogspot.com/?q=";

// Create and add button to the page
var popupButton = document.createElement("button");
popupButton.innerText = "Open Ads";
popupButton.classList.add("popup-button");
document.body.appendChild(popupButton);

// Add CSS styles
var style = document.createElement("style");
style.innerHTML = `
  .popup-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.2s;
  }
  .popup-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  .popup-button:active {
    background-color: #00408d;
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);

popupButton.addEventListener("click", function() {
  if (!buttonClicked) {
    buttonClicked = true;
    var websiteTitle = document.title;
    
    // Select a random base URL
    var randomBaseUrl = baseUrls[Math.floor(Math.random() * baseUrls.length)];
    var fullUrl = randomBaseUrl + queryString + encodeURIComponent(websiteTitle);
    
    // Set popup dimensions
    var width = 250;  // Adjust width
    var height = 430; // Adjust height
    var left = screen.width - width - 20;
    var top = screen.height - height - 40;

    // Generate a random delay between 1 to 5 seconds before opening the popup
    var randomDelay = Math.floor(Math.random() * 1000) + 1000;

    setTimeout(function() {
      popupWindow = window.open(fullUrl, "popupWindow", `width=${width},height=${height},left=${left},top=${top}`);
    }, randomDelay);
    
    // Reset the button click state after 40 seconds
    setTimeout(function() {
      buttonClicked = false;
    }, 40000);
  } else if (popupWindow && !popupWindow.closed) {
    popupWindow.focus();
  }
});

