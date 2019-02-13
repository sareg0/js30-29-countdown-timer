const buttons = document.querySelectorAll('[data-time]')
const timeLeft = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
document.customForm.addEventListener('submit', function (event) {
	event.preventDefault()
	const minutes = this.minutes.value
	const seconds = parseInt(minutes) * 60
	timer(seconds)
	this.reset()
})

buttons.forEach((button) => {
	button.addEventListener('click', start)
})

function start () {
	timer(this.dataset.time)
}

let countdown;

function timer (seconds) {
	clearInterval(countdown)
	const now = Date.now()
	const until = now + seconds * 1000
	let secondsLeft = Math.floor((until - Date.now()) / 1000)
	displayCountDown(secondsLeft)
	displayTime(until)

	countdown = setInterval(() => {
		intervals = countdown
		secondsLeft = Math.floor((until - Date.now()) / 1000)
		displayCountDown(secondsLeft)
		if (secondsLeft < 1) {
			clearInterval(countdown)
			return;
		}
	}, 1000)
}

function displayTime (timeInSeconds) {
	const date = new Date(timeInSeconds)
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const displayText = `Back at ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
	endTime.textContent = displayText
}

function displayCountDown (seconds) {
	let secondsLeft = seconds 
	const hours = Math.floor(secondsLeft / 3600)
	secondsLeft = secondsLeft % 3600
	const minutes = Math.floor(secondsLeft / 60)
	secondsLeft = (secondsLeft % 60)
	const cdText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
	timeLeft.textContent = cdText
	document.title = cdText
}