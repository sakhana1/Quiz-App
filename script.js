let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];
let username = "";

const questions = {
    science: [
        { q: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Control Unit", "Computer Unit"], answer: "Central Processing Unit" },
        { q: "Which gas do humans breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
        { q: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], answer: "Water" }
    ],
    math: [
        { q: "What is 12 × 4?", options: ["48", "42", "36", "52"], answer: "48" },
        { q: "Square root of 81?", options: ["7", "8", "9", "6"], answer: "9" },
        { q: "Value of π?", options: ["3.14", "2.14", "4.13", "3.41"], answer: "3.14" }
    ],
    gk: [
        { q: "Capital of India?", options: ["Mumbai", "Delhi", "Chennai", "Bangalore"], answer: "Delhi" },
        { q: "Largest continent?", options: ["Africa", "Asia", "Europe", "Australia"], answer: "Asia" },
        { q: "National animal of India?", options: ["Lion", "Tiger", "Elephant", "Horse"], answer: "Tiger" }
    ]
};

function startQuiz() {
    username = document.getElementById("username").value;
    if (username === "") {
        alert("Please enter your name!");
        return;
    }
    document.querySelector(".hero").style.display = "none";
    document.getElementById("categorySection").style.display = "block";
}

function selectCategory(category) {
    selectedQuestions = questions[category];
    currentQuestion = 0;
    score = 0;

    document.getElementById("categorySection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    let q = selectedQuestions[currentQuestion];
    document.getElementById("question").innerText = q.q;

    let optionsHTML = "";
    q.options.forEach(option => {
        optionsHTML += `<button onclick="checkAnswer('${option}')">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(answer) {
    let correct = selectedQuestions[currentQuestion].answer;
    let feedback = document.getElementById("feedback");

    if (answer === correct) {
        score++;
        feedback.innerText = "✅ Correct!";
    } else {
        feedback.innerText = "❌ Wrong!";
    }
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById("feedback").innerText = "";

    if (currentQuestion < selectedQuestions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("scoreSection").style.display = "block";

    document.getElementById("result").innerText =
        `${username}, your score is ${score}/${selectedQuestions.length}`;

    let performanceText = "";

    if (score === selectedQuestions.length) {
        performanceText = "🔥 Outstanding! Perfect Score!";
    } else if (score >= selectedQuestions.length / 2) {
        performanceText = "👏 Well Done!";
    } else {
        performanceText = "💡 Keep Learning!";
    }

    document.getElementById("performance").innerText = performanceText;

    localStorage.setItem("quizScore", score);
}

function restartQuiz() {
    location.reload();
}