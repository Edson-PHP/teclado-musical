const audio = new Audio("../../assets/tunes/a.wav");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const mappedKeys = [];
let recordedNotes = []; 
let isRecording = false; 

const playTune = (key) => {
    audio.src = `../../assets/tunes/${key}.wav`;
    audio.play();
    highlightKey(key);
    if (isRecording) {
        recordedNotes.push(key); 
    }
};

const highlightKey = (key) => {
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");

    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

const setupPianoKeys = () => {
    pianoKeys.forEach((key) => {
        key.addEventListener("click", () => playTune(key.dataset.key));
        mappedKeys.push(key.dataset.key);
    });
};

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

const toggleKeyVisibility = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const checkRecordingStatus = () => {
    const recordCheckbox = document.querySelector(".record-button input");
    isRecording = recordCheckbox.checked; 
    if (isRecording) {
        recordedNotes = []; 
        console.log("Gravação iniciada");
    } else {
        console.log("Gravação finalizada");
    }
};

const playRecordedNotes = () => {
    let delay = 0; 
    recordedNotes.forEach((note) => {
        setTimeout(() => playTune(note), delay);
        delay += 300; 
    });
};

const setupEventListeners = () => {
    document.addEventListener("keydown", (e) => {
        if (mappedKeys.includes(e.key)) {
            playTune(e.key);
        }
    });

    volumeSlider.addEventListener("input", handleVolume);
    keysCheck.addEventListener("click", toggleKeyVisibility);

    const recordCheckbox = document.querySelector(".record-button input");
    recordCheckbox.addEventListener("change", checkRecordingStatus);
};

const playButton =  document.querySelector(".play-recording-button");
playButton.addEventListener("click", playRecordedNotes);

const init = () => {
    setupPianoKeys();
    setupEventListeners();
};

init();
