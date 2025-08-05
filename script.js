if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const deck = ['坊主', '姫', '殿', '殿', '殿', '殿', '殿', '殿', '殿', '殿'];

    const message = document.getElementById('message');
    const cardImage = document.getElementById('card-image');
    const remaining = document.getElementById('remaining');
    const playerCountEl = document.getElementById('player-count');
    const cpuCountEl = document.getElementById('cpu-count');
    const playerPile = document.getElementById('player-pile');
    const cpuPile = document.getElementById('cpu-pile');
    const drawBtn = document.getElementById('draw');

    const bgm = document.getElementById('bgm');

    const flipSound = new Audio('audio/mekuru.mp3');
    const bouzuSound = new Audio('audio/bouzu.mp3');
    const himeSound = new Audio('audio/hime.mp3');
    const tonoSound = new Audio('audio/otoko.mp3');

    const playerCards = [];
    const cpuCards = [];
    let turn = 'player';

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    function updateDisplay() {
      remaining.textContent = `残り枚数: ${deck.length}`;
      playerCountEl.textContent = `プレイヤー: ${playerCards.length}枚`;
      cpuCountEl.textContent = `CPU: ${cpuCards.length}枚`;
    }

    function drawCard(current) {
      if (deck.length === 0) {
        message.textContent = `すべての札をめくりました。プレイヤー: ${playerCards.length}枚 CPU: ${cpuCards.length}枚`;
        drawBtn.disabled = true;
        return;
      }

      if (bgm.paused) {
        bgm.play();
      }
      flipSound.currentTime = 0;
      flipSound.play();

      const index = Math.floor(Math.random() * deck.length);
      const card = deck.splice(index, 1)[0];

      const images = {
        '坊主': 'images/monk.png',
        '姫': 'images/princess.png',
        '殿': 'images/nobleman.png'
      };
      cardImage.src = images[card];
      cardImage.style.display = 'block';

      const pile = current === 'player' ? playerCards : cpuCards;
      const pileContainer = current === 'player' ? playerPile : cpuPile;

      if (card === '坊主') {
        bouzuSound.play();
        message.textContent = current === 'player' ? '坊主！カードを山札に戻します' : 'CPUが坊主！カードを山札に戻します';
        deck.push(...pile, card);
        pile.length = 0;
        pileContainer.innerHTML = '';
        shuffle(deck);
      } else {
        if (card === '姫') {
          himeSound.play();
        } else {
          tonoSound.play();
        }
        pile.push(card);
        const cardElem = document.createElement('img');
        cardElem.src = images[card];
        cardElem.classList.add('pile-card');
        cardElem.style.left = `${(pile.length - 1) * 20}px`;
        pileContainer.appendChild(cardElem);
        message.textContent = current === 'player' ? `${card}を引きました` : `CPUが${card}を引きました`;
      }

      updateDisplay();

      if (deck.length === 0) {
        message.textContent = `すべての札をめくりました。プレイヤー: ${playerCards.length}枚 CPU: ${cpuCards.length}枚`;
        drawBtn.disabled = true;
      }
    }

    drawBtn.addEventListener('click', () => {
      if (turn !== 'player') return;
      drawBtn.disabled = true;
      drawCard('player');
      if (deck.length === 0) return;
      turn = 'cpu';
      setTimeout(() => {
        drawCard('cpu');
        if (deck.length === 0) {
          return;
        }
        turn = 'player';
        drawBtn.disabled = false;
        message.textContent = 'カードをめくってください';
      }, 1000);
    });

    updateDisplay();
  });
}
