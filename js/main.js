let arrayElement = 0;
let userScore = 0;
const btnNext = document.querySelector('.quiz_next-btn');
const quiz = document.querySelector('.quiz');
const result = document.querySelector('.result_window');


function showQuestions(index) {
    const title = document.querySelector('.quiz_question');
    const answers = document.querySelector('.quiz_list');
    const total = document.querySelector('.quiz_total');

    title.innerHTML = `${questions[index].question}`;
    answers.innerHTML = '';

    questions[index].options.forEach(item => {
        const text = `<li class="quiz_option">${item}</li>`;
        answers.insertAdjacentHTML("beforeend", text);
    });

    const options = answers.querySelectorAll('.quiz_option');
    options.forEach(item => item.setAttribute("onclick", "optionSelected(this)"));

    total.innerHTML = `${index + 1} of ${questions.length}`;
}


function nextQuestion() {
    const option = document.querySelector('.quiz_option');
    const results = document.querySelector('.result_main');

    if (arrayElement === questions.length - 1 && option.classList.contains("disabled")) {
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        results.innerHTML = `Correct answers: ${userScore} of ${questions.length}`;
        return;
    }

    if (option.classList.contains("disabled")) {
        arrayElement++;
        showQuestions(arrayElement);
    }
    else {
        alert("You need to choose the answer option!!!")
    }
}


function optionSelected(choice) {
    const userAnswer = choice.textContent;
    const correctAnswer = questions[arrayElement].answer;
    const options = document.querySelectorAll(".quiz_option");

    if (userAnswer === correctAnswer) {
        userScore++;
        choice.classList.add("correct");
    }
    else {
        choice.classList.add("incorrect");

        options.forEach(item => {
            if (item.textContent === correctAnswer) {
                setTimeout(() => {
                    item.classList.add("correct");
                }, 250);
            }
        })
    }

    options.forEach(item => item.classList.add("disabled"));
}

showQuestions(arrayElement);
btnNext.addEventListener('click', nextQuestion);