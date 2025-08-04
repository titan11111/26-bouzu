if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const deck = ['坊主', '姫', '殿', '殿', '殿', '殿', '殿', '殿', '殿', '殿'];
    let score = 0;

    const message = document.getElementById('message');
    const cardImage = document.getElementById('card-image');
    const remaining = document.getElementById('remaining');
    const scoreEl = document.getElementById('score');
    const drawBtn = document.getElementById('draw');

    const bgm = document.getElementById('bgm');

    const flipSound = new Audio('audio/mekuru.mp3');
    const bouzuSound = new Audio('audio/bouzu.mp3');
    const himeSound = new Audio('audio/hime.mp3');
    const tonoSound = new Audio('audio/otoko.mp3');

    function updateDisplay() {
      remaining.textContent = `残り枚数: ${deck.length}`;
      scoreEl.textContent = `得点: ${score}`;
    }

    drawBtn.addEventListener('click', () => {
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

      if (card === '坊主') {
        bouzuSound.play();
        message.textContent = '坊主！ゲーム終了';
        drawBtn.disabled = true;
      } else {
        if (card === '姫') {
          himeSound.play();
          score += 2;
          message.textContent = '姫を引きました';
        } else {
          tonoSound.play();
          score++;
          message.textContent = `${card}を引きました`;
        }
        if (deck.length === 0) {
          message.textContent = 'すべての札をめくりました。勝利！';
          drawBtn.disabled = true;
        }
      }
      updateDisplay();
    });

    updateDisplay();
  });
}
