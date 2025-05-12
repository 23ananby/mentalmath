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

    const numberRanges = [
        { min: 10, max: 99 },
        { min: 100, max: 999 },
        { min: 1000, max: 9999 },
        { min: 10000, max: 99999 },
        { min: 100000, max: 999999 },
        { min: 1000000, max: 1000000 }
    ];

    function generateRandomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatNumberWithCommas(number) {
        return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getDigitCount(number) {
        if (number === 0) return 1;
        return String(Math.abs(number)).length;
    }

    function generateProblem() {
        const rangeIndex1 = Math.floor(Math.random() * numberRanges.length);
        const rangeIndex2 = Math.floor(Math.random() * numberRanges.length);

        const range1 = numberRanges[rangeIndex1];
        const range2 = numberRanges[rangeIndex2];

        numberOne = generateRandomNumberInRange(range1.min, range1.max);
        numberTwo = generateRandomNumberInRange(range2.min, range2.max);

        operation = generateOperation();

        if (operation === '-') {
            if (numberOne < numberTwo) {
               [numberOne, numberTwo] = [numberTwo, numberOne];
            }
            correctAnswer = numberOne - numberTwo;
        } else {
            correctAnswer = numberOne + numberTwo;
        }

        userInput = '';

        updateUI();
    }

    function generateOperation() {
        return Math.random() < 0.5 ? '+' : '-';
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
                 if (userInput.length < 8) {
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
