const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

const startbtn = document.getElementById("start-btn");
const nextbtn = document.getElementById("next-btn");
const restartbtn = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

startbtn.addEventListener("click", startQuiz);
nextbtn.addEventListener("click", nextQuestion);

function startQuiz() {
    startbtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
}

//This function shows the questions
function showQuestion() {
    nextbtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "" //cleares choices
    questions[currentQuestionIndex].choices.forEach((choice) => {
        const li = document.createElement("li");
        li.textContent = choice;

        li.addEventListener("click", () => {
            if(!li.classList.contains("selected")) {
                selectChoice(li, choice);
            }
        });

        choicesList.appendChild(li);
    })
}

function selectChoice(li, choice) {
    // store the correct answer in the "answer" variable
    const answer = questions[currentQuestionIndex].answer;

    for (const option of choicesList.children) {
        option.classList.remove("selected")
    }

    li.classList.add("selected")

    //increase/decrease the score
    if(choice === answer) {
        score = score + 2;
        
    } else {
        score = score - 1;
    }

    nextbtn.classList.remove("hidden");

}


function nextQuestion() {
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = score;
    restartbtn.addEventListener("click", restartQuiz);
}

function restartQuiz() {
    questionContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
}


// give individual marks that will add up in the end. Every correct answer will get 2 points and every wrong answer will deduct 1 point
// show color indicating that you cant select any other option once selected
// 