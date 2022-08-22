const scoreDisplay = document.getElementById('score-display')
const startButtonEn = document.getElementById('start-en')
const selectLanguage = document.getElementById('select-language')

const questionsDisplay = document.getElementById('questions-display')

let questions = {}
let language = 'en';
startButtonEn.addEventListener("click", () => populateQuestions(language))
selectLanguage.addEventListener('change', (event)=>{
    language = event.target.value
})
// startButtonRo.addEventListener("click", () => populateQuestions('ro'))
// startButtonRu.addEventListener("click", () => {
//     questionsDisplay.innerHTML = "<p></p>"
//     populateQuestions('ru')
// })




fetch('./questions.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        questions = data
    });

let score = 0
let clicked = []

scoreDisplay.textContent = score

function populateQuestions(language) {
    questionsDisplay.innerHTML = "<p></p>"
    questions[language].forEach(question => {
        const questionBox = document.createElement('div')
        questionBox.classList.add('question-box')
        

        const logoDisplay = document.createElement('h1')
        logoDisplay.textContent = '~~~'
        questionBox.append(logoDisplay)
        question.quiz.forEach(tip => {
            const tipText = document.createElement('p')
            tipText.textContent = tip
            questionBox.append(tipText)
        })

        const questionButtons = document.createElement('div')
        questionButtons.classList.add('question-buttons')
        questionBox.append(questionButtons)

        question.options.forEach((option, optionIndex) => {
            const questionButton = document.createElement('button')
            questionButton.classList.add('question-button')
            questionButton.textContent = option

            questionButton.addEventListener('click', () => checkAnswer(questionBox, questionButton, option, optionIndex + 1, question.correct))

            questionButtons.append(questionButton)
        })


        const answerDisplay = document.createElement('div')
        answerDisplay.classList.add('answer-display')

        questionBox.append(answerDisplay)
        questionsDisplay.append(questionBox)
    })
}

//populateQuestions ()


function checkAnswer(questionBox, questionButton, option, optionIndex, correctAnswer) {
    console.log('option', option)
    console.log('optionIndex', optionIndex)

    if (optionIndex === correctAnswer) {
        score++
        scoreDisplay.textContent = score
        addResult(questionBox, 'Correct!')
    } else {
        score--
        scoreDisplay.textContent = score
        addResult(questionBox, 'Wrong!')
    }
    clicked.push(option)
    questionButton.disabled = clicked.includes(option)
}

function addResult(questionBox, answer) {
    const answerDisplay = questionBox.querySelector('.answer-display')
    answerDisplay.textContent = answer
}