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
    let difficultyLevel = 1; // Nivel de dificultad inicial
    const maxDifficulty = 5; // Máximo nivel de dificultad
    let correctStreak = 0; // Racha de respuestas correctas
    const streakThreshold = 3; // Umbral para ajustar dificultad

    const numberRanges = [
        { min: 10, max: 99 },
        { min: 100, max: 999 },
        { min: 1000, max: 9999 },
        { min: 10000, max: 99999 },
        { min: 100000, max: 999999 }
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
        let rangeIndex1, rangeIndex2;

        // Ajustar rangos según el nivel de dificultad
        switch (difficultyLevel) {
            case 1:
                rangeIndex1 = 0; // 10-99
                rangeIndex2 = 0; // 10-99
                break;
            case 2:
                rangeIndex1 = 1; // 100-999
                rangeIndex2 = 1; // 100-999
                break;
            case 3:
                rangeIndex1 = 2; // 1000-9999
                rangeIndex2 = 2; // 1000-9999
                break;
            case 4:
                rangeIndex1 = 3; // 10000-99999
                rangeIndex2 = 3; // 10000-99999
                break;
            case 5:
                rangeIndex1 = 4; // 100000-999999
                rangeIndex2 = 4; // 100000-999999
                break;
            default:
                rangeIndex1 = 0;
                rangeIndex2 = 0;
        }

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
        } else if (operation === '+') {
            correctAnswer = numberOne + numberTwo;
        } else if (operation === '*') {
            // Ajustar rangos para multiplicación según dificultad
            numberOne = generateRandomNumberInRange(1, 10 * difficultyLevel);
            numberTwo = generateRandomNumberInRange(1, 10 * difficultyLevel);
            correctAnswer = numberOne * numberTwo;
        } else if (operation === '/') {
            // Asegurar división exacta
            numberTwo = generateRandomNumberInRange(1, 10 * difficultyLevel);
            numberOne = numberTwo * generateRandomNumberInRange(1, 10 * difficultyLevel);
            correctAnswer = numberOne / numberTwo;
        }

        userInput = '';
        updateUI();
    }

    function generateOperation() {
        const operations = ['+', '-', '*', '/'];
        return operations[Math.floor(Math.random() * operations.length)];
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
                answerStatusEl.textContent = 'Correcto';
                answerStatusEl.style.color = '#ffcc00';
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
                correctStreak++;
                if (correctStreak >= streakThreshold && difficultyLevel < maxDifficulty) {
                    difficultyLevel++;
                    correctStreak = 0;
                }
                generateProblem();
            } else if (userInput !== '' && Number(userInput) !== correctAnswer) {
                correctStreak = 0;
                if (difficultyLevel > 1) {
                    difficultyLevel--; // Reducir dificultad tras fallo
                }
            }
        }
    }

    numpadEl.addEventListener('click', handleNumpadClick);

    generateProblem();
});
