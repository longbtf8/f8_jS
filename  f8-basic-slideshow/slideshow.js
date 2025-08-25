const preBtn = document.querySelector("#pre");
const nextBtn = document.querySelector("#next");
const slides = Array.from(document.querySelectorAll(".slide-item"));
const track = document.querySelector(".track");

let currentIndex = 1;
let canControl = true;

const NEXT = 1;
const PREV = -1;
setPosition(true);
function setPosition(instant = false) {
  if (!instant) {
    canControl = false;
  }
  track.style.transition = instant ? "none" : "all 0.5s ease";
  track.style.transform = `translate(${currentIndex * 100 * -1}%)`;
  if (!instant) {
    updatePagination();
  }
}

const length = slides.length;
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides.at(-1).cloneNode(true);

slides.unshift(lastSlide);
slides.push(firstSlide);

track.appendChild(firstSlide);
track.prepend(lastSlide);

function calNewIndex(step) {
  currentIndex = (currentIndex + step + slides.length) % slides.length;
  track.ontransitionend = () => {
    if (currentIndex > length) {
      currentIndex = currentIndex - length;
      setPosition(true);
    }
    if (currentIndex === 0) {
      currentIndex = currentIndex + length;
      setPosition(true);
    }
    canControl = true;
  };
  setPosition();
}
preBtn.addEventListener("click", () => {
  if (!canControl) {
    return;
  }
  calNewIndex(PREV);
});
nextBtn.addEventListener("click", () => {
  if (!canControl) {
    return;
  }
  calNewIndex(NEXT);
});

let autoPlayId;
function enableAutoPlay() {
  autoPlayId = setInterval(() => {
    calNewIndex(NEXT);
  }, 5000);
}
function stopAutoPlay() {
  clearInterval(autoPlayId);
}
enableAutoPlay();
const slideShow = document.querySelector(".slideshow");
slideShow.addEventListener("mouseenter", () => {
  stopAutoPlay();
});
slideShow.addEventListener("mouseleave", () => {
  enableAutoPlay();
});
// dot
const paginationContainer = document.querySelector(".pagination");

function createPagination() {
  for (let i = 0; i < length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    dot.onclick = () => {
      goToSlide(i + 1);
    };
    paginationContainer.appendChild(dot);
  }
}
createPagination();
updatePagination();
function updatePagination() {
  const dots = document.querySelectorAll(".pagination-dot");

  dots.forEach((dot, index) => {
    dot.classList.remove("active");

    let activeIndex = currentIndex - 1;
    if (currentIndex === 0) {
      activeIndex = length - 1;
    }
    if (currentIndex > length) {
      activeIndex = 0;
    }
    if (index === activeIndex) {
      dot.classList.add("active");
    }
  });
}

function goToSlide(index) {
  if (!canControl) return;
  currentIndex = index;
  canControl = false;

  track.style.transition = "all 0.5s ease";
  track.style.transform = `translate(${currentIndex * 100 * -1}%)`;
  track.ontransitionend = () => {
    canControl = true;
    updatePagination();
  };
  updatePagination();
}
// 1 2 3 4 5 6 7
// 0 1 2 3 4 5 6
