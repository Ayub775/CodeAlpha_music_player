const filterBtns = document.querySelectorAll(".filter-btn");
const cards = Array.from(document.querySelectorAll(".card"));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const imgCounter = document.getElementById("imgCounter");
const downloadBtn = document.getElementById("downloadBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

let visibleCards = cards;
let currentIndex = 0;

// --------------------------------------------------
// FILTER BUTTONS
// --------------------------------------------------
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {
            const category = card.dataset.category;

            if (filter === "all" || filter === category) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });

        visibleCards = cards.filter(c => !c.classList.contains("hidden"));
    });
});

// --------------------------------------------------
// UPDATE LIGHTBOX INFO
// --------------------------------------------------
function updateImageInfo(card) {
    const img = card.querySelector(".gallery-img");
    const caption = card.querySelector(".caption").textContent;

    lightboxImage.src = img.src;
    lightboxCaption.textContent = caption;

    imgCounter.textContent = `Image ${currentIndex + 1} of ${visibleCards.length}`;

    downloadBtn.setAttribute("data-url", img.src);
}

// --------------------------------------------------
// OPEN LIGHTBOX
// --------------------------------------------------
cards.forEach(card => {
    card.addEventListener("click", () => {
        visibleCards = cards.filter(c => !c.classList.contains("hidden"));

        currentIndex = visibleCards.indexOf(card);
        updateImageInfo(card);

        lightbox.classList.add("open");
    });
});

// --------------------------------------------------
// CLOSE LIGHTBOX
// --------------------------------------------------
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("open");
});

// --------------------------------------------------
// NEXT / PREVIOUS
// --------------------------------------------------
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleCards.length;
    updateImageInfo(visibleCards[currentIndex]);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    updateImageInfo(visibleCards[currentIndex]);
});

// --------------------------------------------------
// KEYBOARD SUPPORT
// --------------------------------------------------
document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") lightbox.classList.remove("open");
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
});

// --------------------------------------------------
// DOWNLOAD BUTTON
// --------------------------------------------------
downloadBtn.addEventListener("click", () => {
    const url = downloadBtn.getAttribute("data-url");
    const a = document.createElement("a");

    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
});

// --------------------------------------------------
// FULLSCREEN MODE
// --------------------------------------------------
fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        lightboxImage.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
