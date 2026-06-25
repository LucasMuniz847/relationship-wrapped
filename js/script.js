const stories = document.querySelectorAll(".story");
const progressBars = document.querySelectorAll(".progress-bar");

const startButton = document.getElementById("startButton");
const bgMusic = document.getElementById("bgMusic");

const touchLeft = document.querySelector(".touch-left");
const touchRight = document.querySelector(".touch-right");

let currentStory = 0;
let timer;
let progressInterval;

const STORY_DURATION = 5000;

function showStory(index){

    stories.forEach(story=>{
        story.classList.remove("active");
    });

    stories[index].classList.add("active");

    updateProgress(index);

    if(index > 0){
        startAutoAdvance();
    }
}

function updateProgress(index){

    progressBars.forEach((bar,i)=>{

        if(i < index){
            bar.style.width = "100%";
        }
        else{
            bar.style.width = "0%";
        }

    });

    animateCurrentBar(index);
}

function animateCurrentBar(index){

    let width = 0;

    clearInterval(progressInterval);

    progressInterval = setInterval(()=>{

        width += 2;

        progressBars[index].style.width = width + "%";

        if(width >= 100){
            clearInterval(progressInterval);
        }

    }, STORY_DURATION / 50);

}

function startAutoAdvance(){

    clearTimeout(timer);

    timer = setTimeout(()=>{

        nextStory();

    }, STORY_DURATION);

}

function nextStory(){

    if(currentStory < stories.length - 1){

        currentStory++;

        showStory(currentStory);

    }

}

function prevStory(){

    if(currentStory > 1){

        currentStory--;

        showStory(currentStory);

    }

}

startButton.addEventListener("click", ()=>{

    bgMusic.play();

    currentStory = 1;

    showStory(currentStory);

});

touchRight.addEventListener("click", ()=>{

    nextStory();

});

touchLeft.addEventListener("click", ()=>{

    prevStory();

});