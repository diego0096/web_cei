const main = document.getElementById('main');
const viewer = document.getElementById('viewer');
const fullImage = document.getElementById('full-image');
const captionElement = document.getElementById('viewer-caption');
const pictures = Array.from(document.querySelectorAll('.pictures'));
let currentIndex = 0;

const updateViewer = () => {
    const currentImage = pictures[currentIndex];
    const link = currentImage.querySelector('a.image');
    const imageUrl = link.getAttribute('href');
    const hiddenCaption = currentImage.getAttribute('data-caption');
    const visibleTitle = currentImage.querySelector('h2').innerText;
    captionElement.textContent = hiddenCaption ? hiddenCaption : visibleTitle;
    fullImage.src = imageUrl;
};

main.addEventListener('click', (e) => {
    const clickedArticle = e.target.closest('.pictures');
    if (clickedArticle) {
        e.preventDefault();
        currentIndex = pictures.indexOf(clickedArticle);
        updateViewer();
        viewer.classList.add('visible');
    }
});

const closeViewer = () => {
    viewer.classList.remove('visible');
    setTimeout(() => fullImage.src = "", 300);
};

const showNext = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % pictures.length;
    updateViewer();
};

const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
    updateViewer();
};

document.querySelector('.close-btn').addEventListener('click', closeViewer);
document.querySelector('.next-btn').addEventListener('click', showNext);
document.querySelector('.prev-btn').addEventListener('click', showPrev);
viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });

document.addEventListener('keydown', (e) => {
    if (!viewer.classList.contains('visible')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});