let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
  const choices = ['stone', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let resultText = '';
  let winPopup = document.getElementById('win-popup');
  let winAudio = document.getElementById('win-audio'); // Get the audio element

  // Check if the audio element exists and is loaded
  if (!winAudio) {
    console.error("Audio element not found.");
    return; // Exit if audio element is missing
  }

  if (playerChoice === computerChoice) {
    resultText = 'It\'s a tie!';
    document.getElementById('result-text').style.color = '#FFA500'; // Orange for draw
  } else if (
    (playerChoice === 'stone' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'stone') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    resultText = 'You win!';
    document.getElementById('result-text').style.color = '#28a745'; // Green for win
    playerScore++;

    // Show pop-up with animation when player wins
    winPopup.style.display = 'block';
    winPopup.style.animation = 'popper 1s ease-out, colorAnimation 2s ease-in-out'; // Trigger animation
    setTimeout(function () {
      winPopup.style.display = 'none'; // Hide after animation
    }, 3000); // Hide after 3 seconds

    // Set the audio volume before playing
    winAudio.volume = 0.3; // Reduce volume to 30%
    winAudio.play().catch(error => {
      console.error("Error playing audio: ", error); // Log any audio errors
    });

    // Trigger Confetti effect
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ff0', '#ff6347', '#4caf50', '#00bcd4'], // Custom colors
    });
  } else {
    resultText = 'You lose!';
    document.getElementById('result-text').style.color = '#dc3545'; // Red for lose
    computerScore++;
  }

  document.getElementById('result-text').innerText = resultText;
  document.getElementById('player-score').innerText = playerScore;
  document.getElementById('computer-score').innerText = computerScore;
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
}

let isMuted = false;
const audioElement = document.getElementById('win-audio');
const audioButton = document.getElementById('audio-btn');

function toggleAudio() {
  isMuted = !isMuted;
  if (audioElement) {
    audioElement.muted = isMuted;
    audioButton.innerHTML = isMuted
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';
  }
}
