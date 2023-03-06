console.log('it works');
// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const wideScreen = player.querySelector('.wide');

// Build out functions
//for controlling play pause through screen
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//for handling the play pause button
function handlePlay() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  let skippedTime = this.dataset.skip; //it returns howmuch time you want to skip
  video.currentTime += parseFloat(skippedTime);
}

function handleRange() {
  video[this.name] = this.value; //controls the volume and speed
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

//Hook up the event listners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', handlePlay);
video.addEventListener('pause', handlePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('timeupdate', handleProgress);
ranges.forEach(button => button.addEventListener('change', handleRange));
ranges.forEach(button => button.addEventListener('mousemove', handleRange));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));
wideScreen.addEventListener('click', handleScreen);
