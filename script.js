if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const deck = ['坊主', '殿', '殿', '殿', '殿', '殿', '殿', '殿', '殿', '殿'];
    let score = 0;

    const message = document.getElementById('message');
    const remaining = document.getElementById('remaining');
    const scoreEl = document.getElementById('score');
    const drawBtn = document.getElementById('draw');

    function updateDisplay() {
      remaining.textContent = `残り枚数: ${deck.length}`;
      scoreEl.textContent = `得点: ${score}`;
    }

    drawBtn.addEventListener('click', () => {
      const index = Math.floor(Math.random() * deck.length);
      const card = deck.splice(index, 1)[0];

      if (card === '坊主') {
        message.textContent = '坊主！ゲーム終了';
        drawBtn.disabled = true;
      } else {
        score++;
        message.textContent = `${card}を引きました`;
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
