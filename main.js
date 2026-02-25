
document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // 테마 설정 함수
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // 초기 테마 설정
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // 테마 토글 이벤트
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function generateLottoNumbers() {
        lottoNumbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('lotto-number');
                numberElement.textContent = number;
                lottoNumbersContainer.appendChild(numberElement);
            }, index * 200); // 숫자가 순차적으로 나타나는 애니메이션
        });
    }

    generateBtn.addEventListener('click', generateLottoNumbers);

    // 페이지 로드 시 초기 번호 생성
    generateLottoNumbers();
});
