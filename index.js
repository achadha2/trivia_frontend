const categories = document.getElementById('catcon')
const answerArea = document.getElementById('answers')
const timer = document.querySelector('.timer')
const questionArea = document.getElementById('question-text')
let points
let correctAnswer

document.addEventListener('DOMContentLoaded', function(){

//event to handle pick question from categories
 categories.addEventListener('click', pickQuestion)
 showScore()
})


//``````````````fetch function```````````````````````````
function takeQuestion(category, difficulty){
  fetch('http://localhost:3000/questions')
  .then(res => res.json())
  .then(json => {question(category, difficulty, json)})
  .then(item => removeQuestion)
}


//```````````````DOM Manipulate``````````````````````````



const showQuestion = function(quest){
  let answerArray = quest.incorrect_answer
  categories.removeEventListener('click', pickQuestion)
  answerArray.push(quest.correct_answer)
  answerArray.sort(() => 0.5 - Math.random())

  correctAnswer = quest.correct_answer

  questionArea.innerHTML = `<span id="question-string">${quest.question}</span>`
  answerArray.forEach(answer => {
    answerArea.innerHTML += `<div class=response> ${answer} </div><br>`
  })
  time()
  answerArea.addEventListener('click', checkAnswer)
}

let score = 0

const showScore = function(){
  let scoreboard = document.getElementById('score')
  scoreboard.innerHTML = `${score}`
}

const showCorrect = function(){
  answerArea.removeEventListener('click', checkAnswer)
  let collection = document.getElementById("answers").children
  // debugger
  let array = Array.from(collection)
  let answerDiv = array.filter(children => children.innerText === correctAnswer)
  setTimeout(function(){
    answerDiv[0].classList.add('correct')
    showScore()
  }, 2000)
  setTimeout(function(){
    questionArea.innerHTML = ''
    answerArea.innerHTML =''
    categories.addEventListener('click', pickQuestion)
  }, 3000)

}

const removeQuestion = function(e){
  e.target.classList.remove(e.target.classList.value)
  e.target.classList.add('answered')
  e.target.innerHTML = `Answered`

}


//``````````````Event Handle Function`````````````````````

const pickQuestion = function(e){
  // debugger
  points = parseInt(e.target.innerText.slice(1))
  let category = e.target.parentElement.id
  let difficulty = e.target.className

    if (difficulty === "easy"){
      takeQuestion(category, difficulty)
      removeQuestion(e)
    } else if (difficulty === "medium"){
       takeQuestion(category, difficulty)
       removeQuestion(e)
    } else if (difficulty === "hard") {
       takeQuestion(category, difficulty)
       removeQuestion(e)
    }
}

const question = function (category, difficulty, json){
  let results = json.filter(question => question.category_id === parseInt(category) && question.difficulty === difficulty)

  let quest = results[Math.floor(Math.random()*results.length)]


  showQuestion(quest)

}

let timeRemaining
let timing

function startTimer(){
  if(timeRemaining === 0){
    timer.innerHTML = "--"
    // questionArea.innerHTML = ''
    // answerArea.innerHTML = ''
    score -= points
    showCorrect()


    clearInterval(timing)
  } else {

    timer.innerHTML = timeRemaining
    timeRemaining--
  }
}
const time = function(){
  timeRemaining = 10
  timing = setInterval(startTimer, 1000)
}

const checkAnswer = function(e){
  // debugger
  if(e.target.id !== 'answers'){
    e.target.classList.add('selected')
  }
  clearInterval(timing)
  // debugger
  // let points =
  timer.innerHTML = ''
  answerArea.removeEventListener('click', checkAnswer)
  let answer = e.target.innerText
  if(answer === correctAnswer){
    score += points
  } else{
    score -= points
  }

    showCorrect()

    // adjustScore(100)
}
