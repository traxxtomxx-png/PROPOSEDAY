/* STARS */
document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("stars-container");
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        star.style.left = `${x}%`; star.style.top = `${y}%`;
        star.style.width = `${size}px`; star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        starsContainer.appendChild(star);
    }
});

/* NAVIGATION */
const startBtn = document.getElementById("start-btn");
const bgMusic = document.getElementById("bg-music");
const restartBtn = document.getElementById("restart-btn");
const lookAtMePopup = document.getElementById("look-at-me");

const screens = {
    start: document.getElementById("start-screen"),
    slides: document.getElementById("slides-screen"),
    proposal: document.getElementById("proposal-screen")
};

// START
startBtn.addEventListener("click", () => {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(e => console.log("Audio requires interaction"));
    screens.start.classList.remove("active");
    setTimeout(() => {
        screens.start.classList.add("hidden");
        screens.slides.classList.remove("hidden");
        setTimeout(() => screens.slides.classList.add("active"), 50);
    }, 500);
});

// SLIDES
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

screens.slides.addEventListener("click", () => {
    slides[currentSlide].classList.remove("active-slide");
    currentSlide++;
    if (currentSlide < slides.length) {
        slides[currentSlide].classList.add("active-slide");
    } else {
        screens.slides.classList.remove("active");
        setTimeout(() => {
            screens.slides.classList.add("hidden");
            screens.proposal.classList.remove("hidden");
            
            // SHOW PROPOSAL
            setTimeout(() => {
                screens.proposal.classList.add("active");
                // INSTANT POPUP
                lookAtMePopup.classList.remove("hidden");
                setTimeout(() => lookAtMePopup.classList.add("show"), 50);
            }, 50);
        }, 1000);
    }
});

// CHOICE & VIDEO SWAP
const choiceBtns = document.querySelectorAll(".choice-btn");
const questionContainer = document.getElementById("question-container");
const finalMsgContainer = document.getElementById("final-msg-container");
const proposalVideo = document.getElementById("proposal-video");

choiceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Hide Popup Instantly
        lookAtMePopup.classList.remove("show");
        setTimeout(() => lookAtMePopup.classList.add("hidden"), 300);

        // Swap Video
        proposalVideo.src = "success.mp4"; 
        proposalVideo.load();
        proposalVideo.play();
        
        // Hide Question
        questionContainer.classList.add("fade-out");
        
        setTimeout(() => {
            questionContainer.classList.add("hidden"); 
            finalMsgContainer.classList.remove("hidden"); 
            createHearts();

            // Show Restart Button Later
            setTimeout(() => {
                restartBtn.classList.remove("hidden");
                setTimeout(() => restartBtn.classList.add("show"), 100);
            }, 3000);
        }, 500);
    });
});

// RESTART
restartBtn.addEventListener("click", () => { location.reload(); });

// HEARTS
function createHearts() {
    const container = document.querySelector(".hearts-container");
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart-particle");
        heart.innerHTML = "❤";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }, 300);
}