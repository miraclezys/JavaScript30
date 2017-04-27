const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function updateButton() {
	const method = video.paused? '►' : '❚ ❚';
	toggle.textContent = method;
}

function togglePlay() {
	const method = video.paused? 'play' : 'pause';
	video[method]();
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const present = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${present}%`;
}

function scrub(event) {
	console.log(mousedown);
	const scrbTime = (event.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrbTime;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);