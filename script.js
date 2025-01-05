const questions = [
    {
        question: "What planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1
    },
    {
        question: "What is the boiling point of water?",
        answers: ["50°C", "100°C", "150°C", "200°C"],
        correctAnswer: 1
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "O2", "CO2", "H2"],
        correctAnswer: 0
    },
    {
        question: "Which gas do plants absorb from the air for photosynthesis?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 1
    },
    {
        question: "What is the largest organ in the human body?",
        answers: ["Brain", "Heart", "Skin", "Liver"],
        correctAnswer: 2
    }
];

let score = 0;
let currentQuestion = 0;

function displayQuestion() {
    const quizDiv = document.getElementById('quiz');
    const questionData = questions[currentQuestion];
    quizDiv.innerHTML = `
        <div class="question">
            ${currentQuestion + 1}. ${questionData.question}
        </div>
        ${questionData.answers.map((answer, index) => `
            <div class="answer" onclick="checkAnswer(${index})">${answer}</div>
        `).join('')}
    `;
}

function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const answerElements = document.querySelectorAll('.answer');

    // Highlight the correct answer
    answerElements[correctAnswer].classList.add('correct');

    // Highlight the selected answer
    if (selectedIndex === correctAnswer) {
        score++;
        answerElements[selectedIndex].classList.add('correct');
    } else {
        answerElements[selectedIndex].classList.add('incorrect');
    }

    // Disable clicking on answers after selection
    answerElements.forEach(element => element.style.pointerEvents = 'none');

    // Move to the next question or show results
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    document.getElementById('quiz').innerHTML = '';
    let message = score === questions.length ? "🎉 Perfect Score! You're a genius!" :
                  score > questions.length / 2 ? "😊 Great job!" :
                  "😅 Better luck next time!";
    document.getElementById('result').innerHTML = `
        You scored ${score} out of ${questions.length}!<br>
        ${message}<br>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    displayQuestion();
    document.getElementById('result').innerHTML = '';
}

// Start the quiz
displayQuestion();