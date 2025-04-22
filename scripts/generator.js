function generate() {
    const count = parseInt(document.getElementById('count').value);
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const unique = document.getElementById('unique').checked;
    const sort = document.getElementById('sort').checked;
    const output = document.getElementById('output');

    if (isNaN(count) || isNaN(min) || isNaN(max) || min > max || count < 1) {
        output.textContent = 'Введите корректные значения.';
        return;
    }

    const rangeSize = max - min + 1;
    if (unique && count > rangeSize) {
        output.textContent = `Невозможно сгенерировать ${count} уникальных чисел от ${min} до ${max}.`;
        return;
    }

    const numbers = [];
    const used = new Set();

    while (numbers.length < count) {
        const rand = Math.floor(Math.random() * rangeSize) + min;
        if (unique) {
            if (!used.has(rand)) {
                used.add(rand);
                numbers.push(rand);
            }
        } else {
            numbers.push(rand);
        }
    }

    if (sort) {
        numbers.sort((a, b) => a - b);
    }

    output.textContent = 'Результат:\n' + numbers.join(', ');
}

function copyToClipboard() {
    const output = document.getElementById('output');
    const text = output.textContent.replace('Результат:\n', '');
    if (text.trim() !== '') {
        navigator.clipboard.writeText(text).then(() => {
            alert('Скопировано!');
        });
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
})();