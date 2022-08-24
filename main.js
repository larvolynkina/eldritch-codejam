import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import { brownCards, blueCards, greenCards } from './data/mythicCards/index.js';

const ancients = document.querySelectorAll('.ancients-item');
const ancientsParent = document.querySelector('.ancients-list');
const btn = document.querySelector('.main-btn');
const deck = document.querySelector('.deck');
const card = document.querySelector('.card');
const levels = document.querySelectorAll('.difficulties-item');
const levelsList = document.querySelector('.difficulties-list');

class Dots {
  constructor(data, parentSelector) {
    this.data = data;
    this.parent = document.querySelector(parentSelector);
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('current-state');
    element.innerHTML = `
          <div class="stage-container"><span class="stage-text ">Первая стадия</span>
              <div class="dots-container">
                  <div class="dot green">${this.data.firstStage.greenCards}</div>
                  <div class="dot brown">${this.data.firstStage.brownCards}</div>
                  <div class="dot blue">${this.data.firstStage.blueCards}</div>
              </div>
          </div>
          <div class="stage-container"><span class="stage-text ">Вторая стадия</span>
              <div class="dots-container">
                  <div class="dot green">${this.data.secondStage.greenCards}</div>
                  <div class="dot brown">${this.data.secondStage.brownCards}</div>
                  <div class="dot blue">${this.data.secondStage.blueCards}</div>
              </div>
          </div>
          <div class="stage-container"><span class="stage-text ">Третья стадия</span>
              <div class="dots-container">
                  <div class="dot green">${this.data.thirdStage.greenCards}</div>
                  <div class="dot brown">${this.data.thirdStage.brownCards}</div>
                  <div class="dot blue">${this.data.thirdStage.blueCards}</div>
              </div>
          </div>
          `;
    this.parent.prepend(element);
  }
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let selectedAncient;
let ancientCheck = false;
let levelCheck = false;
let greenTotalNumbers;
let brownTotalNumbers;
let blueTotalNumbers;

function totalNumbers(colour) {
  return (
    selectedAncient.firstStage[colour] +
    selectedAncient.secondStage[colour] +
    selectedAncient.thirdStage[colour]
  );
}

function clearDeck() {
  levels.forEach((level) => {
    level.classList.remove('active');
  });
  deck.style.backgroundImage = '';
  card.style.backgroundImage = '';
  if (document.querySelector('.current-state') !== null) {
    document.querySelector('.current-state').remove();
  }
}

ancientsParent.addEventListener('click', (e) => {
  levelCheck = false;
  btn.style.display = '';
  ancients.forEach((ancient) => {
    ancient.classList.remove('active');
  });
  clearDeck();
  const div = e.target.closest('div');
  div.classList.add('active');
  ancientsData.forEach((item) => {
    if (item.id === div.id) {
      selectedAncient = item;
    }
  });
  ancientCheck = true;

  greenTotalNumbers = totalNumbers('greenCards');
  brownTotalNumbers = totalNumbers('brownCards');
  blueTotalNumbers = totalNumbers('blueCards');
});

function makeQueue(colour, min, max, n) {
  const res = [];
  for (let i = 0; i < n; i += 1) {
    const x = generateRandomNumber(min, max);
    if (res.lastIndexOf(`${colour}${x}`) === -1) {
      res.push(`${colour}${x}`);
    } else {
      i -= 1;
    }
  }
  return res;
}

function makeQueueCut(arr, total) {
  const res = [];
  for (let i = 0; i < total; i += 1) {
    res.push(arr[arr.length - 1 - i]);
  }
  return res;
}

let firstStage;
let secondStage;
let thirdStage;
let greenQueue;
let brownQueue;
let blueQueue;

// Сформировать очередь при нормальном уровне сложности

function makeStage(stage) {
  const result = [];
  for (let i = 0; i < stage.greenCards; i += 1) {
    result.push(greenQueue[0]);
    greenQueue = greenQueue.slice(1);
  }
  for (let i = 0; i < stage.brownCards; i += 1) {
    result.push(brownQueue[0]);
    brownQueue = brownQueue.slice(1);
  }
  for (let i = 0; i < stage.blueCards; i += 1) {
    result.push(blueQueue[0]);
    blueQueue = blueQueue.slice(1);
  }
  return result;
}

function mixarr(arr) {
  return arr
    .map((i) => [Math.random(), i])
    .sort()
    .map((i) => i[1]);
}

btn.addEventListener('click', () => {
  if (ancientCheck && levelCheck) {
    if (document.querySelector('.current-state') === null) {
      new Dots(selectedAncient, '.deck-container').render();
    } else {
      document.querySelector('.current-state').remove();
      new Dots(selectedAncient, '.deck-container').render();
    }

    firstStage = mixarr(makeStage(selectedAncient.firstStage));
    secondStage = mixarr(makeStage(selectedAncient.secondStage));
    thirdStage = mixarr(makeStage(selectedAncient.thirdStage));

    deck.style.backgroundImage = `url('assets/mythicCardBackground.png')`;
    btn.style.display = 'none';
  } else {
    alert('Выберите Древнего и уровень сложности!');
  }
});

deck.addEventListener('click', () => {
  const blue = document.querySelectorAll('.blue');
  const green = document.querySelectorAll('.green');
  const brown = document.querySelectorAll('.brown');
  if (firstStage.length > 0) {
    const current = firstStage[firstStage.length - 1];
    if (current.slice(0, 4) === 'blue') {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        4
      )}/${current}.png')`;
      blue[0].innerText = `${blue[0].innerText - 1}`;
      firstStage.pop();
    } else if (current.slice(0, 4) === 'gree') {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        5
      )}/${current}.png')`;
      green[0].innerText = `${green[0].innerText - 1}`;
      firstStage.pop();
    } else {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        5
      )}/${current}.png')`;
      brown[0].innerText = `${brown[0].innerText - 1}`;
      firstStage.pop();
    }
  } else if (secondStage.length > 0) {
    const current = secondStage[secondStage.length - 1];
    if (current.slice(0, 4) === 'blue') {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        4
      )}/${current}.png')`;
      blue[1].innerText = `${blue[1].innerText - 1}`;
      secondStage.pop();
    } else if (current.slice(0, 4) === 'gree') {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        5
      )}/${current}.png')`;
      green[1].innerText = `${green[1].innerText - 1}`;
      secondStage.pop();
    } else {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        5
      )}/${current}.png')`;
      brown[1].innerText = `${brown[1].innerText - 1}`;
      secondStage.pop();
    }
  } else if (thirdStage.length > 0) {
    const current = thirdStage[thirdStage.length - 1];
    if (current.slice(0, 4) === 'blue') {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        4
      )}/${current}.png')`;
      blue[2].innerText = `${blue[2].innerText - 1}`;
      thirdStage.pop();
    } else if (current.slice(0, 4) === 'gree') {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        5
      )}/${current}.png')`;
      green[2].innerText = `${green[2].innerText - 1}`;
      thirdStage.pop();
    } else {
      card.style.backgroundImage = `url('assets/MythicCards/${current.slice(
        0,
        5
      )}/${current}.png')`;
      brown[2].innerText = `${brown[2].innerText - 1}`;
      thirdStage.pop();
    }
  } else {
    deck.style.backgroundImage = '';
  }
});

levelsList.addEventListener('click', (e) => {
  levelCheck = true;
  btn.style.display = '';
  clearDeck();
  e.target.closest('div').classList.add('active');
  // очень легкий уровень
  if (e.target.innerText === difficulties[0].name) {
    const veryEasyGreen = mixarr(
      greenCards
        .filter((value) => value.difficulty === 'easy')
        .map((item) => item.id)
    );
    const veryEasyBrown = mixarr(
      brownCards
        .filter((value) => value.difficulty === 'easy')
        .map((item) => item.id)
    );
    const veryEasyBlue = mixarr(
      blueCards
        .filter((value) => value.difficulty === 'easy')
        .map((item) => item.id)
    );
    if (veryEasyGreen >= greenTotalNumbers) {
      greenQueue = makeQueueCut(veryEasyGreen, greenTotalNumbers);
    } else {
      const normalGreen = mixarr(
        greenCards
          .filter((value) => value.difficulty === 'normal')
          .map((item) => item.id)
      );
      const n = veryEasyGreen.length;
      for (let i = 0; i < greenTotalNumbers - n; i += 1) {
        veryEasyGreen.push(normalGreen[normalGreen.length - 1 - i]);
      }
      greenQueue = makeQueueCut(mixarr(veryEasyGreen), greenTotalNumbers);
    }
    if (veryEasyBrown >= brownTotalNumbers) {
      brownQueue = makeQueueCut(veryEasyBrown, brownTotalNumbers);
    } else {
      const normalBrown = mixarr(
        brownCards
          .filter((value) => value.difficulty === 'normal')
          .map((item) => item.id)
      );
      const n = veryEasyBrown.length;
      for (let i = 0; i < brownTotalNumbers - n; i += 1) {
        veryEasyBrown.push(normalBrown[normalBrown.length - 1 - i]);
      }

      brownQueue = makeQueueCut(mixarr(veryEasyBrown), brownTotalNumbers);
    }
    blueQueue = makeQueueCut(mixarr(veryEasyBlue), blueTotalNumbers);
  }
  // легкий уровень
  if (e.target.innerText === difficulties[1].name) {
    const easyGreen = mixarr(
      greenCards
        .filter((value) => value.difficulty !== 'hard')
        .map((item) => item.id)
    );
    const easyBrown = mixarr(
      brownCards
        .filter((value) => value.difficulty !== 'hard')
        .map((item) => item.id)
    );
    const easyBlue = mixarr(
      blueCards
        .filter((value) => value.difficulty !== 'hard')
        .map((item) => item.id)
    );

    greenQueue = makeQueueCut(easyGreen, greenTotalNumbers);
    brownQueue = makeQueueCut(easyBrown, brownTotalNumbers);
    blueQueue = makeQueueCut(easyBlue, blueTotalNumbers);
  }

  // средний уровень
  if (e.target.innerText === difficulties[2].name) {
    greenQueue = makeQueue('green', 1, 18, greenTotalNumbers);
    brownQueue = makeQueue('brown', 1, 21, brownTotalNumbers);
    blueQueue = makeQueue('blue', 1, 12, blueTotalNumbers);
  }
  // высокий уровень
  if (e.target.innerText === difficulties[3].name) {
    const hardGreen = mixarr(
      greenCards
        .filter((value) => value.difficulty !== 'easy')
        .map((item) => item.id)
    );
    const hardBrown = mixarr(
      brownCards
        .filter((value) => value.difficulty !== 'easy')
        .map((item) => item.id)
    );
    const hardBlue = mixarr(
      blueCards
        .filter((value) => value.difficulty !== 'easy')
        .map((item) => item.id)
    );

    greenQueue = makeQueueCut(hardGreen, greenTotalNumbers);
    brownQueue = makeQueueCut(hardBrown, brownTotalNumbers);
    blueQueue = makeQueueCut(hardBlue, blueTotalNumbers);
  }

  // очень высокий уровень
  if (e.target.innerText === difficulties[4].name) {
    const veryHardGreen = mixarr(
      greenCards
        .filter((value) => value.difficulty === 'hard')
        .map((item) => item.id)
    );
    const veryHardBrown = mixarr(
      brownCards
        .filter((value) => value.difficulty === 'hard')
        .map((item) => item.id)
    );
    const veryHardBlue = mixarr(
      blueCards
        .filter((value) => value.difficulty === 'hard')
        .map((item) => item.id)
    );
    if (veryHardGreen >= greenTotalNumbers) {
      greenQueue = makeQueueCut(veryHardGreen, greenTotalNumbers);
    } else {
      const normalGreen = mixarr(
        greenCards
          .filter((value) => value.difficulty === 'normal')
          .map((item) => item.id)
      );
      const n = veryHardGreen.length;
      for (let i = 0; i < greenTotalNumbers - n; i += 1) {
        veryHardGreen.push(normalGreen[normalGreen.length - 1 - i]);
      }
      greenQueue = makeQueueCut(mixarr(veryHardGreen), greenTotalNumbers);
    }
    if (veryHardBrown >= brownTotalNumbers) {
      brownQueue = makeQueueCut(veryHardBrown, brownTotalNumbers);
    } else {
      const normalBrown = mixarr(
        brownCards
          .filter((value) => value.difficulty === 'normal')
          .map((item) => item.id)
      );
      const n = veryHardBrown.length;
      for (let i = 0; i < brownTotalNumbers - n; i += 1) {
        veryHardBrown.push(normalBrown[normalBrown.length - 1 - i]);
      }

      brownQueue = makeQueueCut(mixarr(veryHardBrown), brownTotalNumbers);
    }
    blueQueue = makeQueueCut(mixarr(veryHardBlue), blueTotalNumbers);
  }
});
