let gameseq = [];
let userseq = [];
let btns = ["red", "yellow", "green", "blue"];
let levels = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelup();
  }
});
function levelup() {
  userseq = [];
  levels.push(level+1);
  level++;
  h2.innerText = `Level ${level}`;
  //random btn coose
  let index = Math.floor(Math.random() * 4);
  let randomColor = btns[index];
  let randbtn = document.querySelector(`.${randomColor}`);
  gameseq.push(randomColor);
  console.log(gameseq);
  gameflash(randbtn);
}
function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}
function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    let hScore = highestScore();
    h2.innerHTML = `Game Over! your score was <b>${level}</b> </br> press any key to start and highest score is ${hScore}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  checkAns(userseq.length - 1);
}
let allbtns = document.querySelectorAll(".box");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}
function reset() {
  started = 0;
  gameseq = [];
  userseq = [];
  level = 0;
//   levels = [];
}
function highestScore() {
  let max = -1;
  for (l of levels) {
    max = Math.max(l, max);
    }
    return max;
}
