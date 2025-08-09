if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('message');
    const cardImage = document.getElementById('card-image');
    const remaining = document.getElementById('remaining');
    const playerPile = document.getElementById('player-pile');
    const cpuPile = document.getElementById('cpu-pile');
    const drawBtn = document.getElementById('draw-button');
    const scoreboard = document.getElementById('scoreboard');

    const bgm = document.getElementById('bgm');

    const flipSound = new Audio('audio/mekuru.mp3');
    const bouzuSound = new Audio('audio/bouzu.mp3');
    const himeSound = new Audio('audio/hime.mp3');
    const tonoSound = new Audio('audio/otoko.mp3');

    const cardTypes = {
      bozu: { label: '坊主', image: 'images/monk.png', sound: bouzuSound, consequence: 'カードをすべて失います' },
      hime: { label: '姫', image: 'images/princess.png', sound: himeSound, consequence: '1枚獲得' },
      danna: { label: '殿', image: 'images/nobleman.png', sound: tonoSound, consequence: '1枚獲得' }
    };

    const deck = [];
    for (let i = 0; i < 10; i++) deck.push({ type: 'bozu' });
    for (let i = 0; i < 10; i++) deck.push({ type: 'hime' });
    for (let i = 0; i < 80; i++) deck.push({ type: 'danna' });

    const playerCards = [];
    const cpuCards = [];
    let turn = 'player';

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    shuffle(deck);

    function updateDisplay() {
      remaining.textContent = `残り枚数: ${deck.length}`;
      scoreboard.innerHTML = `Player: ${playerCards.length} cards<br>CPU: ${cpuCards.length} cards`;
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
      const info = cardTypes[card.type];
      cardImage.src = info.image;
      cardImage.style.display = 'block';
      cardImage.className = '';
      cardImage.classList.add(`card-${card.type}`);

      const pile = current === 'player' ? playerCards : cpuCards;
      const pileContainer = current === 'player' ? playerPile : cpuPile;

      if (card.type === 'bozu') {
        info.sound.play();
        message.innerHTML = current === 'player'
          ? '坊主を引きました！<br>カードをすべて失います。'
          : 'CPUが坊主を引きました！<br>CPUはカードをすべて失います。';
        pile.length = 0;
        pileContainer.innerHTML = '';
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
      } else {
        info.sound.play();
        pile.push(card);
        const cardElem = document.createElement('img');
        cardElem.src = info.image;
        cardElem.classList.add('pile-card', `card-${card.type}`);
        cardElem.style.left = `${(pile.length - 1) * 20}px`;
        pileContainer.appendChild(cardElem);
        const who = current === 'player' ? 'あなた' : 'CPU';
        message.innerHTML = `${who}は${info.label}を引きました！<br>${info.consequence}`;
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
