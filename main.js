let theQuestion = document.querySelector(".container .question")
let answerArea = document.querySelector(".container .answers")
let count = document.querySelector(".container .counter .count")
let currentindex = 0;
let right = 0
let wrong = 0
let submitButton = document.querySelector(".container  input[type='submit']")
let startButton = document.querySelector(".choose .start")
let choose = document.querySelector(".choose")
let bulletsArea = document.querySelector(".bullets")
let restartButton = document.querySelector(".restart")

startButton.onclick = function() {
    questions()
    choose.remove()
    createBullets(10)
}

function questions() {
    let myrequst = new XMLHttpRequest()
    myrequst.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            let random = Math.floor(Math.random() * data.length)
            addquestions(data , random)
            currentindex++
            document.querySelectorAll(".container .answers .answer").forEach((answer)=>{
                answer.onclick = function () {
                    this.firstChild.checked = true;
                }
            })
            
            count.innerHTML = currentindex;
                
                submitButton.onclick = function () {
                        let thechoosenAnswer = document.querySelector(".container .answer input:checked + label").innerHTML   
                        checkAnswer(thechoosenAnswer , data , random)
                        answerArea.innerHTML = ""
                        theQuestion.innerHTML = "";
                        questions()
                    }                
            

        }
    }
    if (currentindex < 10) {
        myrequst.open("GET", "questions.json", true);
        myrequst.send();
    }else {
        let result = document.createElement("div")
        result.appendChild(document.createTextNode(`you score is ${right} from 10`))
        let thefinalscore = right;
        window.localStorage.setItem("score" , thefinalscore)
        result.className = "result"
        document.querySelector(".container").appendChild(result)
        restartButton.style.display = "block"
        restartButton.onclick = function () {
            window.location.reload()
        }
    }
}

function addquestions (data ,random) {
    if (currentindex <= data.length) {
        let question = document.createElement("h2")
        question.appendChild(document.createTextNode(data[random].title))
        theQuestion.appendChild(question)   
        for (let i = 1;i<=4;i++) {
            let maindiv = document.createElement("div")
            maindiv.className = "answer";
            let input = document.createElement("input")
            input.name = "answer"
            input.type = "radio"
            input.id = `answer${i}`
            input.dataset.answer = `answer_${i}`
            maindiv.appendChild(input)
            let label = document.createElement("label")
            label.htmlFor = `answer${i}`
            label.appendChild(document.createTextNode(data[random][`answer_${i}`]))
            maindiv.appendChild(label)
            answerArea.appendChild(maindiv)
        }
    }else {
        answerArea.innerHTML = ""
        theQuestion.innerHTML = ""
    }
}

function checkAnswer (answer , data , random) {
    if (answer == data[random].right_answer) {
            right++
            handelBulletsBlue()
    }else {
            
            wrong++
            handelBulletsRed()
    }
}

function createBullets(num) {
    for(let i=0;i<num;i++) {
        let span = document.createElement("span")
        bulletsArea.appendChild(span)
    }
}
function handelBulletsBlue() {
    let bullets = document.querySelectorAll(".bullets span")
    let ArrayofSpans = Array.from(bullets)
    ArrayofSpans.forEach((span , index)=>{
        
        if (currentindex === index + 1) {
            span.className = "blue"
        }
    })    
}
function handelBulletsRed() {
    let bullets = document.querySelectorAll(".bullets span")
    let ArrayofSpans = Array.from(bullets)
    ArrayofSpans.forEach((span , index)=>{
        
        if (currentindex === index + 1) {
            span.className = "red"
        }
    })    
}
let scoreArea = document.querySelector(".score")
if (window.localStorage.getItem("score")) {
    let scorediv = document.createElement("div")
    scorediv.className = "numofscore"
    scorediv.appendChild(document.createTextNode(`Your previus Score is ${window.localStorage.getItem("score")}`))
    scoreArea.appendChild(scorediv)
}
