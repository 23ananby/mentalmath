document.addEventListener('DOMContentLoaded', () => {
    const numberOneEl = document.getElementById('number-one');
    const numberTwoEl = document.getElementById('number-two');
    const numberDigits1El = document.getElementById('number-digits-1');
    const numberDigits2El = document.getElementById('number-digits-2');
    const operationSymbolEl = document.getElementById('operation-symbol');
    const userAnswerEl = document.getElementById('user-answer');
    const answerStatusEl = document.getElementById('answer-status');
    const numpadEl = document.getElementById('numpad');

    let numberOne;
    let numberTwo;
    let operation;
    let correctAnswer;
    let userInput = '';

    function generateRandomNumber() {
        // Generar una longitud aleatoria de dígitos entre 1 y 10
        const digitCount = Math.floor(Math.random() * 10) + 1;
        let number = 0;
        // Generar cada dígito de forma aleatoria
        for (let i = 0; i < digitCount; i++) {
            const digit = Math.floor(Math.random() * 10);
            number = number * 10 + digit;
        }
        return number;
    }

    function formatNumberWithCommas(number) {
        return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getDigitCount(number) {
        if (number === 0) return 1;
        return String(Math.abs(number)).length;
    }

    function generateProblem() {
        numberOne = generateRandomNumber();
        numberTwo = generateRandomNumber();
        operation = Math.random() < 0.5 ? '+' : '-';

        if (operation === '+') {
            correctAnswer = numberOne + numberTwo;
        } else {
            correctAnswer = numberOne - numberTwo;
        }

        userInput = '';
        updateUI();
    }

    function updateUI() {
        numberOneEl.textContent = formatNumberWithCommas(numberOne);
        numberTwoEl.textContent = formatNumberWithCommas(numberTwo);
        operationSymbolEl.textContent = operation;

        numberDigits1El.textContent = `${getDigitCount(numberOne)} Dígitos`;
        numberDigits2El.textContent = `${getDigitCount(numberTwo)} Dígitos`;

        if (userInput === '') {
            userAnswerEl.textContent = '0';
            userAnswerEl.classList.add('placeholder');
        } else {
            userAnswerEl.textContent = formatNumberWithCommas(Number(userInput));
            userAnswerEl.classList.remove('placeholder');
        }

        if (userInput === '') {
            answerStatusEl.textContent = 'Confirmación';
            answerStatusEl.style.color = '#888';
        } else {
            if (Number(userInput) !== correctAnswer) {
                answerStatusEl.textContent = 'Incorrecto';
                answerStatusEl.style.color = '#fff';
            } else {
                answerStatusEl.textContent = '';
            }
        }
    }

    function handleNumpadClick(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON' && target.dataset.value) {
            const value = target.dataset.value;

            if (value === 'backspace') {
                if (userInput.length > 0) {
                    userInput = userInput.slice(0, -1);
                }
            } else {
                if (userInput.length < 10) {
                    userInput += value;
                }
            }

            updateUI();

            if (userInput !== '' && Number(userInput) === correctAnswer) {
                generateProblem();
            }
        }
    }

    numpadEl.addEventListener('click', handleNumpadClick);

    generateProblem();
});
