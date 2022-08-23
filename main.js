import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import { brownCards, blueCards, greenCards } from './data/mythicCards/index.js';

const ancients = document.querySelectorAll('.ancients-item');
const ancientsParent = document.querySelector('.ancients-list');
const btn = document.querySelector('.main-btn');

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

btn.addEventListener('click', () => {
  if (document.querySelector('.current-state') === null) {
    new Dots(selectedAncient, '.deck-container').render();
  } else {
    document.querySelector('.current-state').remove();
    new Dots(selectedAncient, '.deck-container').render();
  }
});

console.log(blueCards[0].difficulty);
