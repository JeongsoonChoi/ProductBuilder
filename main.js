
document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

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
