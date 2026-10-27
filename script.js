document.addEventListener("DOMContentLoaded", () => {
    const envelope = document.querySelector(".envelope");
    const openLetterButton = document.querySelector("#openLetter");
    const musicToggle = document.querySelector("#musicToggle");
    const quizContent = document.querySelector("#quizContent");
    const questionCount = document.querySelector("#questionCount");
    const progressFill = document.querySelector("#progressFill");
    const questionText = document.querySelector("#questionText");
    const answerList = document.querySelector("#answerList");
    const quizFeedback = document.querySelector("#quizFeedback");
    const nextQuestionButton = document.querySelector("#nextQuestion");
    const quizResult = document.querySelector("#quizResult");
    const resultTitle = document.querySelector("#resultTitle");
    const resultMessage = document.querySelector("#resultMessage");
    const restartQuizButton = document.querySelector("#restartQuiz");
    const surpriseButton = document.querySelector("#surpriseBtn");
    const surpriseMessage = document.querySelector("#surpriseMessage");

    openLetterButton?.addEventListener("click", () => {
        envelope?.classList.add("open");
        document.querySelector(".letter-card")?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    musicToggle?.addEventListener("click", () => {
        const isOn = musicToggle.getAttribute("aria-pressed") !== "true";
        musicToggle.setAttribute("aria-pressed", String(isOn));
        musicToggle.classList.toggle("active", isOn);
        musicToggle.title = isOn
            ? "Ambience idea enabled (no audio is played)"
            : "Toggle gentle ambience";
    });

    const questions = [
        {
            question: "Which sweet treat has featured in our dates? 🍦",
            options: ["Ice cream", "Plain bread", "Raw potatoes", "Nothing at all"],
            answer: 0,
            explanation: "Our ice-cream dates deserve their own documentary, Cat! 🍦❤️"
        },
        {
            question: "What did you cook for me? 🍽️",
            options: ["Pizza and chips", "Sadza and pork", "Sushi", "Just tea"],
            answer: 1,
            explanation: "Sadza and pork made with love. Michelin-star behaviour! 👩🏽‍🍳❤️"
        },
        {
            question: "Where did we get burgers after doing our nails? 💅🏽",
            options: ["RocoMamas", "The moon", "The network server room", "A secret laboratory"],
            answer: 0,
            explanation: "Nails done, burgers secured. An elite date! 🍔💕"
        },
        {
            question: "What do we say when money or transport is a problem? 😂",
            options: [
                "Call the president",
                "Let's buy a private jet",
                "Takabva tese kumadhaka",
                "Deploy another server"
            ],
            answer: 2,
            explanation: "TAKABVA TESE KUMADHAKA! 😭😂 Even our struggles have a slogan."
        },
        {
            question: "What do I love hearing when you answer my calls? 📞",
            options: ["Who is this?", "Hey babe", "Your network is unavailable", "Please hold"],
            answer: 1,
            explanation: "That 'hey babe' could fix my entire day. 🥹❤️"
        },
        {
            question: "Who do I jokingly claim is my other love? ⚽",
            options: ["My laptop", "My Wi-Fi router", "Kylian Mbappé", "My Java compiler"],
            answer: 2,
            explanation: "Mbappé, please respect the relationship. Cat is still my girl! 😂❤️"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function displayQuestion() {
        const question = questions[currentQuestion];
        if (!question || !questionText || !answerList) return;

        answered = false;
        questionCount.textContent = `QUESTION ${currentQuestion + 1} / ${questions.length}`;
        progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        questionText.textContent = question.question;
        answerList.replaceChildren();
        quizFeedback.textContent = "";
        nextQuestionButton.disabled = true;
        nextQuestionButton.textContent = currentQuestion === questions.length - 1
            ? "See my results ♡"
            : "Lock in answer ♡";

        question.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer-btn";
            button.textContent = option;
            button.addEventListener("click", () => {
                if (answered) return;
                answered = true;
                const correct = index === question.answer;
                score += Number(correct);
                button.classList.add(correct ? "correct" : "wrong");
                if (!correct) {
                    answerList.children[question.answer].classList.add("correct");
                }
                quizFeedback.textContent =
                    `${correct ? "Correct! 🥰 " : "Not quite! 😂 "}${question.explanation}`;
                answerList.querySelectorAll("button").forEach((answer) => {
                    answer.disabled = true;
                });
                nextQuestionButton.disabled = false;
                nextQuestionButton.textContent = currentQuestion === questions.length - 1
                    ? "See my results ♡"
                    : "Next question →";
            });
            answerList.append(button);
        });
    }

    function showQuizResult() {
        quizContent.classList.add("hidden");
        quizResult.classList.remove("hidden");
        resultTitle.textContent = score === questions.length
            ? "Perfect score! You know our story so well. 🥹❤️"
            : score >= 4
                ? "You passed the Cat exam. 🥰"
                : "Looks like we need more ice-cream and car dates! 😂❤️";
        resultMessage.textContent =
            `${score}/${questions.length} correct. Every memory with you is special to me — the real prize is getting to love you. ❤️`;
    }

    nextQuestionButton?.addEventListener("click", () => {
        if (!answered) return;
        currentQuestion += 1;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showQuizResult();
        }
    });

    restartQuizButton?.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        quizResult.classList.add("hidden");
        quizContent.classList.remove("hidden");
        displayQuestion();
    });

    if (questionText && answerList && quizFeedback && nextQuestionButton) {
        displayQuestion();
    }

    surpriseButton?.addEventListener("click", () => {
        surpriseMessage.classList.remove("hidden");
        surpriseButton.textContent = "I love you, Cat! ❤️🌹";
        surpriseMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    const petals = document.querySelector("#petals");
    function createPetal() {
        if (!petals || document.hidden) return;
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.textContent = Math.random() > 0.5 ? "♥" : "✿";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${6 + Math.random() * 5}s`;
        petal.style.setProperty("--drift", `${Math.random() * 140 - 70}px`);
        petal.addEventListener("animationend", () => petal.remove());
        petals.append(petal);
    }

    for (let i = 0; i < 8; i += 1) {
        window.setTimeout(createPetal, i * 450);
    }
    window.setInterval(createPetal, 1200);
});
