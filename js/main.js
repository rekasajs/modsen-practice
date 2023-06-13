let   count = 0,
      score = 0;
const btnNext = document.querySelector('.quiz_next-btn'),
      quiz = document.querySelector('.quiz'),
      result = document.querySelector('.result_window');

showQuestions(count);
btnNext.addEventListener('click', nextQuestion);


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
    const results = document.querySelector('.results');

    if ((count + 1) == questions.length && option.classList.contains("disabled")) {
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        results.innerHTML = `Correct answers: ${score} of ${questions.length}`;
        return;
    }

    if (option.classList.contains("disabled")) {
        count++;
        showQuestions(count);
    }
    else {
        alert("Для начала необходимо выбрать вариант ответа!")
    }
}


function optionSelected(choice) {
    const userAnswer = choice.textContent,
        correctAnswer = questions[count].answer,
        options = document.querySelectorAll(".quiz_option");

    if (userAnswer == correctAnswer) {
        score++;
        choice.classList.add("correct");
    }
    else {
        choice.classList.add("incorrect");

        options.forEach(item => {
            if (item.textContent == correctAnswer) {
                setTimeout(() => {
                    item.classList.add("correct");
                }, 250);
            }
        })
    }

    options.forEach(item => item.classList.add("disabled"));
}

