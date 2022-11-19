// Section 2
// Dropdown on click
const setupMainMenuBtns = () => {
  const mainMenuBtns = document.querySelectorAll(".section-2 .main-menu-btn");

  mainMenuBtns.forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();

      clearSelected();

      const target = e.target;

      if (target.classList.contains("selected")) {
        target.classList.toggle("selected");
      } else {
        mainMenuBtns.forEach((btn) => btn.classList.remove("selected"));

        target.classList.add("selected");
      }
    });
  });
};

const setupSubMenu1Btns = () => {
  const subMenu1Btns = document.querySelectorAll(".section-2 .sub-menu-1-btn");

  subMenu1Btns.forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();

      const target = e.target;

      if (target.classList.contains("selected")) {
        target.classList.toggle("selected");
      } else {
        subMenu1Btns.forEach((btn) => btn.classList.remove("selected"));

        target.classList.add("selected");
      }
    });
  });
};

const setupSubMenu2Btns = () => {
  const subMenu2Btns = document.querySelectorAll(".section-2 .sub-menu-2-btn");

  subMenu2Btns.forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();

      clearSelected();
    });
  });
};

const clearSelected = () => {
  const mainMenuBtns = document.querySelectorAll(".section-2 .main-menu-btn");
  const subMenu1Btns = document.querySelectorAll(".section-2 .sub-menu-1-btn");
  const subMenu2Btns = document.querySelectorAll(".section-2 .sub-menu-2-btn");

  [...mainMenuBtns, ...subMenu1Btns, ...subMenu2Btns].forEach((e) =>
    e.classList.remove("selected")
  );
};

setupMainMenuBtns();
setupSubMenu1Btns();
setupSubMenu2Btns();

// Section 3
// Responsive mobile menu
const setupHamburgerIcon = () => {
  const hamburgerIcon = document.querySelector(".hamburger");
  const hamburgerDivs = document.querySelectorAll(".hamburger-div");
  const mainMenuBtns = document.querySelectorAll(".section-3 .main-menu-btn");
  const nav3 = document.querySelector(".nav-3");

  hamburgerIcon.addEventListener("pointerdown", (e) => {
    e.stopPropagation();

    nav3.classList.toggle("expand");

    mainMenuBtns.forEach((e) => {
      e.classList.toggle("appear");
      e.classList.remove("selected");
    });

    hamburgerDivs.forEach((e) => e.classList.toggle("hamburger-transform"));
  });
};

const setupMainMenuBtns_2 = () => {
  const mainMenuBtns = document.querySelectorAll(".section-3 .main-menu-btn");

  mainMenuBtns.forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();

      if (e.target.classList.contains("selected")) {
        e.target.classList.toggle("selected");
      } else {
        clearSelected_2();
        e.target.classList.add("selected");
      }
    });
  });
};

const setupSubMenu1Btns_2 = () => {
  const subMenu1Btns = document.querySelectorAll(".section-3 .sub-menu-1-btn");

  subMenu1Btns.forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();

      if (window.innerWidth >= 650) {
        clearSelected_2();
        return;
      }

      subMenu1Btns.forEach((btn) => btn.classList.remove("selected"));

      e.target.classList.add("selected");
    });
  });
};

const clearSelected_2 = () => {
  const mainMenuBtns = document.querySelectorAll(".section-3 .main-menu-btn");
  const subMenu1Btns = document.querySelectorAll(".section-3 .sub-menu-1-btn");

  [...mainMenuBtns, ...subMenu1Btns].forEach((btn) =>
    btn.classList.remove("selected")
  );
};

const handleResize = () => {
  const mainMenuBtns = Array.from(
    document.querySelectorAll(".section-3 .main-menu-btn")
  );
  const nav3 = document.querySelector(".nav-3");
  const hamburgerDivs = document.querySelectorAll(".hamburger-div");

  if (window.innerWidth < 650) {
    if (mainMenuBtns.some((btn) => btn.classList.contains("selected"))) {
      nav3.classList.add("expand");

      mainMenuBtns.forEach((e) => {
        e.classList.add("appear");
      });

      hamburgerDivs.forEach((e) => e.classList.add("hamburger-transform"));
    }
  }
};

setupHamburgerIcon();
setupMainMenuBtns_2();
setupSubMenu1Btns_2();

// Section 4
// Image slider
const setupImgSlider = (imgSliderObj) => {
  loadImg(imgSliderObj.imgArr[0]);
  setupSliderBtns(imgSliderObj);
  setupNavDots(imgSliderObj);
};

const loadImg = (img) => {
  const imgHolder = document.querySelector(".img-holder");

  imgHolder.src = `./assets/${img}`;
  imgHolder.alt = img;

  animateSlide(imgHolder);
};

const animateSlide = (imgHolder) => {
  imgHolder.classList.add("animate-img-holder");

  setTimeout(() => {
    imgHolder.classList.remove("animate-img-holder");
  }, 500);
};

const setupSliderBtns = (imgSliderObj) => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  [prevBtn, nextBtn].forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      const mode = e.target.dataset.mode;

      handleSliderBtnClick(mode, imgSliderObj);
    });
  });
};

const handleSliderBtnClick = (mode, imgSliderObj) => {
  const newIndex = getNewIndex(mode, imgSliderObj);
  const imgToLoad = imgSliderObj.imgArr[newIndex];

  loadImg(imgToLoad);
  updateNavDots(newIndex);

  imgSliderObj.currIndex = newIndex;
};

const getNewIndex = (mode, { currIndex, imgArr }) => {
  if (mode === "prev")
    return currIndex - 1 < 0 ? imgArr.length - 1 : currIndex - 1;

  if (mode === "next" || mode === "interval")
    return currIndex + 1 === imgArr.length ? 0 : currIndex + 1;
};

const setupNavDots = (imgSliderObj) => {
  const navDotsContainer = document.querySelector(".nav-dots-container");
  const imgArrLength = imgSliderObj.imgArr.length;

  for (let i = 0; i < imgArrLength; i++) {
    const navDot = document.createElement("div");

    navDot.classList.add("nav-dot");
    navDot.dataset.index = i;
    navDot.addEventListener("pointerdown", (e) => {
      handleNavDotClick(imgSliderObj, e.target);
    });

    navDotsContainer.append(navDot);
  }

  updateNavDots(imgSliderObj.currIndex);
};

const updateNavDots = (currIndex) => {
  const navDots = document.querySelectorAll(".nav-dot");

  navDots.forEach((dot) => dot.classList.remove("marked"));

  navDots[currIndex].classList.add("marked");
};

const handleNavDotClick = (imgSliderObj, navDot) => {
  const navDotIndex = Number(navDot.dataset.index);

  if (imgSliderObj.currIndex === navDotIndex) return;

  const imgToLoad = imgSliderObj.imgArr[navDotIndex];

  loadImg(imgToLoad);
  updateNavDots(navDotIndex);

  imgSliderObj.currIndex = navDotIndex;
};

const goToNextSlide = (imgSliderObj) => {
  const newIndex = getNewIndex("interval", imgSliderObj);
  const imgToLoad = imgSliderObj.imgArr[newIndex];

  loadImg(imgToLoad);
  updateNavDots(newIndex);

  imgSliderObj.currIndex = newIndex;
};

// To add image, save image in assets folder and add image name to imgArr
const imgSliderObj = {
  imgArr: ["w1.jpg", "w2.jpg", "w3.jpg", "w5.png", "w4.jpg"], // Add images here
  currIndex: 0,
};

setupImgSlider(imgSliderObj);
setInterval(() => goToNextSlide(imgSliderObj), 5000);

onpointerdown = () => {
  clearSelected();
  clearSelected_2();
};

onresize = handleResize;
