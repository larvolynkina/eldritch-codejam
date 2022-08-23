import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import { brownCards, blueCards, greenCards } from './data/mythicCards/index.js';

const ancients = document.querySelectorAll('.ancients-item');
const ancientsParent = document.querySelector('.ancients-list');
const btn = document.querySelector('.main-btn');
const deck = document.querySelector('.deck');
const card = document.querySelector('.card');

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

let selectedAncient;

ancientsParent.addEventListener('click', (e) => {
  ancients.forEach((ancient) => {
    ancient.classList.remove('active');
  });
  const div = e.target.closest('div');
  div.classList.add('active');
  ancientsData.forEach((item) => {
    if (item.id === div.id) {
      console.log(item.firstStage.greenCards);
      selectedAncient = item;
    }
  });
});

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

let firstStage;
let secondStage;
let thirdStage;

btn.addEventListener('click', () => {
  if (document.querySelector('.current-state') === null) {
    new Dots(selectedAncient, '.deck-container').render();
  } else {
    document.querySelector('.current-state').remove();
    new Dots(selectedAncient, '.deck-container').render();
  }

  const greenTotalNumbers =
    selectedAncient.firstStage.greenCards +
    selectedAncient.secondStage.greenCards +
    selectedAncient.thirdStage.greenCards;

  const brownTotalNumbers =
    selectedAncient.firstStage.brownCards +
    selectedAncient.secondStage.brownCards +
    selectedAncient.thirdStage.brownCards;

  const blueTotalNumbers =
    selectedAncient.firstStage.blueCards +
    selectedAncient.secondStage.blueCards +
    selectedAncient.thirdStage.blueCards;

  let greenQueue = makeQueue('green', 1, 18, greenTotalNumbers);
  let brownQueue = makeQueue('brown', 1, 21, brownTotalNumbers);
  let blueQueue = makeQueue('blue', 1, 12, blueTotalNumbers);

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

  firstStage = mixarr(makeStage(selectedAncient.firstStage));
  secondStage = mixarr(makeStage(selectedAncient.secondStage));
  thirdStage = mixarr(makeStage(selectedAncient.thirdStage));

  deck.style.backgroundImage = `url('assets/mythicCardBackground.png')`;
});

deck.addEventListener('click', () => {
  const blue = document.querySelectorAll('.blue');
  const green = document.querySelectorAll('.green');
  const brown = document.querySelectorAll('.brown');
  if (firstStage.length > 0) {
    const current = firstStage[firstStage.length - 1];
    console.log(current);
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
    console.log(current);
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
    console.log(current);
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
