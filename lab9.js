// lab9.js

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const output = document.querySelector('output');
    const firstNum = document.querySelector('#first-num').value;
    const secondNum = document.querySelector('#second-num').value;
    const operator = document.querySelector('#operator').value;
    output.textContent = eval(`${firstNum} ${operator} ${secondNum}`);
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
      'This simulates an error message in red.'
    );
  });

  // Console Count
  countBtn.addEventListener('click', () => {
    console.count('Count‑Button‑Clicks');
  });

  // Console Warn
  warnBtn.addEventListener('click', () => {
    console.warn(
      'You clicked the warning button.'
    );
  });

  // Console Assert
  assertBtn.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 10);
    console.assert(
      randomNumber >= 5,
      `Assertion failed: randomNumber (${randomNumber}) < 5`
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
    const mainElem = document.querySelector('main');
    console.dirxml(mainElem);
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
    console.timeEnd('MyTimer');
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
