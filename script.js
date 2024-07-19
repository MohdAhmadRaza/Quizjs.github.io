
const questions = [
    {
        question: "which is largest city in india?",
        answers: [
            { text: "bihar", correct: false},
            { text: "basti" , correct: false},
            { text: "rajisthan" ,  correct: true},
            { text: "delhi" ,  correct: false},
        ]
    },
    {
        question: "who is smallest  person name  in world?",
        answers:[
            { text: "asif", correct: false},
            { text: "saad" , correct: false},
            { text: "ahmad" ,  correct: false},
            { text: "ritu" ,  correct: true},
        ]
    },
    {
        question: "who is famous  thing  in lucknow?",
        answers:[
            { text: "chicken", correct: true},
            { text: "mutton" , correct: false},
            { text: "biryani" ,  correct: false},
            { text: "dal chawal" ,  correct: false},
        ]
    },
    {
        question: "which  is largest railway station  in india?",
        answers:[
            { text: "lucknow", correct: false},
            { text: "ajamgadh" , correct: false},
            { text: "delhi" ,  correct: false},
            { text: "gorakhpur" ,  correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0 ;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " +  currentQuestion.
    question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `you score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();



