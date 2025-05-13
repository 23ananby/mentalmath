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
        const digitCount = Math.floor(Math.random() * 10) + 1;
        let number = 0;

        for (let i = 0; i < digitCount; i++) {
            const digit = Math.floor(Math.random() * 10);
             if (i === 0 && digit === 0 && digitCount > 1 && Math.floor(Math.random() * 10) < 5) {
                i--;
            } else {
                 number = number * 10 + digit;
            }
        }
        return number;
    }

    function formatNumberWithCommas(number) {
         const parts = String(number).split('.');
         const integerPart = parts[0];
         const decimalPart = parts[1];
         const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
         return decimalPart ? integerWithCommas + '.' + decimalPart : integerWithCommas;
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

        if (userInput === '' || userInput === '-') {
             userAnswerEl.textContent = userInput === '-' ? '-' : '0';
             userAnswerEl.classList.add('placeholder');
             answerStatusEl.textContent = 'Confirmación';
             answerStatusEl.style.color = '#888';
        } else {
             const numericInput = Number(userInput);
             if (!isNaN(numericInput)) {
                userAnswerEl.textContent = formatNumberWithCommas(numericInput);
                userAnswerEl.classList.remove('placeholder');

                if (numericInput !== correctAnswer) {
                    answerStatusEl.textContent = 'Incorrecto';
                    answerStatusEl.style.color = '#fff';
                } else {
                    answerStatusEl.textContent = '';
                }
             } else {
                 userAnswerEl.textContent = userInput;
                 userAnswerEl.classList.remove('placeholder');
                 answerStatusEl.textContent = 'Entrada inválida';
                 answerStatusEl.style.color = 'red';
             }
        }
        if (userInput === '' || userInput === '-') {
             answerStatusEl.textContent = 'Confirmación';
             answerStatusEl.style.color = '#888';
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
            } else if (value === '-') {
                if (userInput === '') {
                    userInput = '-';
                }
            } else {
                 const currentLength = userInput.startsWith('-') ? userInput.length - 1 : userInput.length;
                 if (currentLength < 10) {
                     if (userInput === '-' && value === '0') {
                        return;
                     }
                     userInput += value;
                 }
            }

            updateUI();

            const numericInput = Number(userInput);
            if (userInput !== '' && userInput !== '-' && !isNaN(numericInput) && numericInput === correctAnswer) {
                generateProblem();
            } else if (userInput !== '' && userInput !== '-' && !isNaN(numericInput) && numericInput !== correctAnswer) {
                 answerStatusEl.textContent = 'Incorrecto';
                 answerStatusEl.style.color = '#fff';
            }
        }
    }

    numpadEl.addEventListener('click', handleNumpadClick);

    generateProblem();
});