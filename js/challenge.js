const timerElement = document.querySelector("#counter");
const likedTimes = [];
let timerRunning;
let timerID = startTimer();

document.querySelector("#plus").addEventListener("click",incrementTimer);
document.querySelector('#minus').addEventListener("click", decrementTimer);
document.querySelector('#heart').addEventListener("click", handleLike);
document.querySelector('#pause').addEventListener("click", handlePauseButton);
document
    .querySelector("#comment-form")
    .addEventListener("submit", handleSubmit);

function startTimer(){
    timerRunning = true;
    return setInterval(incrementTimer, 1000);
}

function incrementTimer(){
    const currentTime = parseInt(timerElement.innerText, 10);
    timerElement.innerText = currentTime + 1;
}

function decrementTimer(){
    const currentTime = parseInt(timerElement.innerText, 10);
    timerElement.innerText = currentTime - 1;
}

function handlePauseButton(){
    const buttons = document.querySelectorAll("button");

    if (timerRunning === true){
        timerRunning = false;
        clearInterval(timerID);
        for (const button of buttons){
            if (button.id !== "pause"){
                button.disabled = true;
            }
        }
    } else if (timerRunning === false){
        timerID = startTimer();
        for (const button of buttons){
            if (button.id !== "pause"){
                button.disabled = false;
            }
        }
    }
}

function handleLike(e){
    const currentTime = parseInt(timerElement.innerText, 10);
    const foundObject = likedTimes.find((object) => object.time === currentTime);
    const ul = document.querySelector(".likes");

    if (foundObject === undefined){
        const newObject = {time: currentTime, likes:1};
        likedTimes.push(newObject);

        const li = document.createElement("li");
        li.id = `${currentTime}`;
        console.log(li.id);

        if (newObject.likes ===1){
            li.innerText = `${currentTime} has been liked ${newObject.likes} time`;
        } else
        {
            li.innerText = `${currentTime} has been liked ${newObject.likes} times`;
        }

        ul.appendChild(li);
    } else
    {
        foundObject.likes++;
        const li = document.getElementById(`${currentTime}`);
        console.log(li);
        li.innerText = `${currentTime} has been liked ${foundObject.likes} times`;
    }
}

function handleSubmit(e){
    e.preventDefault();
    const comment = document.querySelector("#comment-input").value;
    const commentList = document.querySelector("#list");
    const newComment = document.createElement("p");

    document.querySelector("#comment-input").value = "";
    newComment.innerText = comment;
    commentList.appendChild(newComment);
}