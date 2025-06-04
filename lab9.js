// lab9.js

const originalOnError = window.onerror;

window.onerror = function (message, source, lineno, colno, errorObj) {
  if (typeof originalOnError === 'function') {
    originalOnError(message, source, lineno, colno, errorObj);
  }
  console.log(`Global error caught:
    message= ${message}
    source=  ${source}
    line=    ${lineno}, col= ${colno}
    errorObj:`, errorObj);

    return true;
}

class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CalculatorError';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const output = document.querySelector('output');
    try {
      const firstNum = document.querySelector('#first-num');
      const secondNum = document.querySelector('#second-num');
      const opSelector = document.querySelector('#operator');

      if(!firstNum || !secondNum || !opSelector) {
        throw new CalculatorError('Calculator inputs or operator dropdown not found in the page.');
      }

      const firstNumRaw = firstNum.value.trim();
      const secondNumRaw = secondNum.value.trim();
      const operator = opSelector.value;

      // Validate that both inputs are non‐empty and numeric
      if (firstNumRaw === '' || secondNumRaw === '') {
        throw new CalculatorError('Please fill in both number fields before calculating.');
      }

      const num1 = Number(firstNumRaw);
      const num2 = Number(secondNumRaw);

      if (Number.isNaN(num1) || Number.isNaN(num2)) {
        throw new CalculatorError(`Invalid number: "${firstNumRaw}" or "${secondNumRaw}" is not a number.`);
      }

      if (operator === '/' && num2 === 0) {
        throw new CalculatorError('Division by zero is not allowed.');
      }

      // since we’ve validated everything
      const result = eval(`${num1} ${operator} ${num2}`);
      output.textContent = result;
      console.log('Calculation successful:', `${num1} ${operator} ${num2} = ${result}`);
    } catch (calcError) { // Catch anything thrown above
      if (calcError instanceof CalculatorError) {
        console.error('Calculator error:', calcError.message);
        output.textContent = `Error: ${calcError.message}`;
      }
    } finally {
      console.log('Calculation attempt finished (finally block).');
    }
  });

  const errorBtns = Array.from(
    document.querySelectorAll('#error-btns > button')
  );

  const [
    logBtn,
    errorBtn,
    countBtn,
    warnBtn,
    assertBtn,
    clearBtn,
    dirBtn,
    dirxmlBtn,
    groupStartBtn,
    groupEndBtn,
    tableBtn,
    startTimerBtn,
    endTimerBtn,
    traceBtn,
    triggerErrorBtn
  ] = errorBtns;

  // console log
  logBtn.addEventListener('click', () => {
    console.log(
      { lab: 'Lab 9', feature: 'Console demos' }
    );
  });

  // Console Error
  errorBtn.addEventListener('click', () => {
    console.error(
      'Console Error Demo'
    );
  });

  // Console Count
  countBtn.addEventListener('click', () => {
    console.count('Count Button');
  });

  // Console Warn
  warnBtn.addEventListener('click', () => {
    console.warn(
      'Console Warn Button.'
    );
  });

  // Console Assert
  assertBtn.addEventListener('click', () => {
    const number = 2;
    console.assert(
      number >= 3,
      `The number does not equal 3`
    );
  });

  // Console Clear
  clearBtn.addEventListener('click', () => {
    console.clear();
    console.log('The console was just cleared.');
  });

  // Console Dir
  dirBtn.addEventListener('click', () => {
    const person = {
      firstName: 'Daniel',
      lastName: 'Chang',
      grades: [92, 85, 100],
      address: { street: '123 SD St', city: 'San Diego', zip: '12345' }
    };
    console.dir(person, { depth: 2 });
  });

  // Console dirxml
  dirxmlBtn.addEventListener('click', () => {
    try {
      const mainElem = document.querySelector('main');
      if (!mainElem) {
        throw new Error('<main> element missing—cannot dirxml.');
      }
      console.dirxml(mainElem);
    } catch (xmlError) {
      console.error('console.dirxml error:', xmlError.message);
    } finally {
      console.log('dirxml handler finished.');
    }
  });

  // Console Group Start
  groupStartBtn.addEventListener('click', () => {
    console.group('Examining');
    console.log('Apple');
    console.log('Banana');
    console.log('Grapes');
  });

  // Console Group End
  groupEndBtn.addEventListener('click', () => {
    console.groupEnd();
    console.log('Group closed. Back to normal logs.');
  });

  // Console Table
  tableBtn.addEventListener('click', () => {
    const fruits = [
      { name: 'Apple', color: 'Red', sweetness: 7 },
      { name: 'Banana', color: 'Yellow', sweetness: 9 },
      { name: 'Grapes', color: 'Purple', sweetness: 6 }
    ];
    console.table(fruits);
  });

  // Start Timer (console.time)
  startTimerBtn.addEventListener('click', () => {
    console.time('Timer');
    console.log('Timer is now running.');
  });

  // End Timer (console.timeEnd)
  endTimerBtn.addEventListener('click', () => {
    try{
      console.timeEnd('Timer');
    } catch (timerError) {
      console.error('Timer error:', timerError.message);
    }
  });

  // Console Trace
  traceBtn.addEventListener('click', () => {
    function levelOne() {
      levelTwo();
    }
    function levelTwo() {
      levelThree();
    }
    function levelThree() {
      console.trace('Here’s the call stack:');
    }
    levelOne();
  });

  // Trigger a Global Error
  triggerErrorBtn.addEventListener('click', () => {
    throw new Error('Trigger a Global Error!');
  });
});
