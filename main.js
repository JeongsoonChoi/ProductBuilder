const URL = "https://teachablemachine.withgoogle.com/models/4ZhfdBRTe/";

let model, labelContainer, maxPredictions;

document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const imageUpload = document.getElementById('image-upload');
    const previewContainer = document.getElementById('image-preview-container');
    const faceImage = document.getElementById('face-image');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const retryBtn = document.getElementById('retry-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Theme logic
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Load AI Model
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");
    }

    // File Handling
    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                faceImage.src = event.target.result;
                uploadArea.style.display = 'none';
                previewContainer.style.display = 'block';
                loading.style.display = 'block';
                resultContainer.style.display = 'none';
                
                if (!model) await init();
                await predict();
            };
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일만 업로드 가능합니다.');
        }
    }

    // Click to upload
    uploadArea.addEventListener('click', () => imageUpload.click());

    imageUpload.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });

    // Drag and Drop logic
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    ['dragleave', 'dragend'].forEach(type => {
        uploadArea.addEventListener(type, () => {
            uploadArea.classList.remove('drag-over');
        });
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    async function predict() {
        const prediction = await model.predict(faceImage);
        prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
        
        loading.style.display = 'none';
        resultContainer.style.display = 'block';
        
        const topResult = prediction[0].className;
        resultMessage.innerText = `당신은 ${topResult}상 입니다!`;

        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className;
            const probability = (prediction[i].probability * 100).toFixed(0);
            
            const barWrapper = document.createElement('div');
            barWrapper.className = 'result-bar-wrapper';
            barWrapper.innerHTML = `
                <div class="result-label">${classPrediction}</div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${probability}%">${probability}%</div>
                </div>
            `;
            labelContainer.appendChild(barWrapper);
        }
    }

    retryBtn.addEventListener('click', () => {
        uploadArea.style.display = 'block';
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        imageUpload.value = '';
    });
});
