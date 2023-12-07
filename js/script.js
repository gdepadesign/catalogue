function imageReveal() {
  const elements = document.querySelectorAll(".element");

  elements.forEach((el) => {
    const image = el.querySelector("img");

    el.addEventListener("mouseenter", (e) => {
      gsap.to(image, { delay: 0, autoAlpha: 1, scale: 1 });
    });

    el.addEventListener("mouseleave", (e) => {
      gsap.to(image, { autoAlpha: 0, scale: 0.75 });
    });

    el.addEventListener("mousemove", (e) => {
      gsap.set(image, {
        delay: 0,
        duration: 0.1,
        x: e.offsetX,
        y: e.offsetY,
      });
    });
  });
}

function openCloseSidebar() {
  $(document.body).on("click", "button", function () {
    $(".project-container").hide();

    $(this).toggleClass("open-active");

    $("#" + $(this).data("target")).show();

    if ($(".is-shift-sidebar").length == 0) {
      $(".wrapper").toggleClass("is-shift-content");
      $(".nav").toggleClass("is-shift-content");
      $(".main").toggleClass("is-shift-content");
      $(".headline").toggleClass("is-shift-content");
      $(".sidebar").toggleClass("is-shift-sidebar");
      $(".wrapper.is-shift-sidebar").on("click", "button", function (event) {
        event.stopPropagation();
      });

      document
        .querySelector(".sidebar")
        .addEventListener("scroll", addProgressBar($(this).data("target")));
    } else {
      document
        .querySelector(".sidebar")
        .removeEventListener("scroll", addProgressBar, true);
    }

    let that = this;
    if ($(that).hasClass("btn-close")) {
      $(".wrapper").removeClass("is-shift-content");
      $(".nav").removeClass("is-shift-content");
      $(".main").removeClass("is-shift-content");
      $(".headline").removeClass("is-shift-content");
      $(".sidebar").removeClass("is-shift-sidebar");
      $(".open").removeClass("open-active");
      $(".project").removeClass("project-active");
      $(".project-name").removeClass("open-active");
    }
  });
}

function openProject() {
  $(document.body).on("click", ".project", function () {
    $(".project-container").hide();

    $(this).toggleClass("project-active");

    $("#" + $(this).data("target")).show();

    if ($(".is-shift-sidebar").length == 0) {
      $(".wrapper").toggleClass("is-shift-content");
      $(".nav").toggleClass("is-shift-content");
      $(".main").toggleClass("is-shift-content");
      $(".headline").toggleClass("is-shift-content");
      $(".sidebar").toggleClass("is-shift-sidebar");
      $(".wrapper.is-shift-sidebar").on("click", function (event) {
        event.stopPropagation();
      });
      $(this).find(".open").addClass("open-active");

      document
        .querySelector(".sidebar")
        .addEventListener("scroll", addProgressBar($(this).data("target")));
    } else {
      document
        .querySelector(".sidebar")
        .removeEventListener("scroll", addProgressBar, true);
    }

    let that = this;
    if ($(that).hasClass("btn-close")) {
      $(".wrapper").removeClass("is-shift-content");
      $(".nav").removeClass("is-shift-content");
      $(".main").removeClass("is-shift-content");
      $(".headline").removeClass("is-shift-content");
      $(".sidebar").removeClass("is-shift-sidebar");
      $(".project").removeClass("project-active");
      $(".project-name").removeClass("open-active");
      $(".open").removeClass("open-active");
    }
  });
}

function closeProject() {
  $(document.body).on(
    "click",
    ".wrapper.is-shift-content, .nav.is-shift-content",
    function () {
      $(".wrapper").removeClass("is-shift-content");
      $(".nav").removeClass("is-shift-content");
      $(".main").removeClass("is-shift-content");
      $(".headline").removeClass("is-shift-content");
      $(".sidebar").removeClass("is-shift-sidebar");
      $(".open").removeClass("open-active");
      $(".project").removeClass("project-active");
      $(".project-name").removeClass("open-active");
      $(".open").removeClass("nohover");
    }
  );
}

function changeProject() {
  const open = Array.from(document.getElementsByClassName("open"));

  open.forEach(function (mov) {
    mov.addEventListener("click", handleClick);
  });

  function handleClick(event) {
    open.forEach(function (val) {
      if (val == event.target) {
        val.classList.add("open-active");
      } else {
        val.classList.remove("open-active");
      }
    });
  }
}

function swipeRight() {
  $(document.body).on(
    "swiperight", function (e) {
    $(".wrapper").removeClass("is-shift-content");
    $(".nav").removeClass("is-shift-content");
    $(".main").removeClass("is-shift-content");
    $(".headline").removeClass("is-shift-content");
    $(".sidebar").removeClass("is-shift-sidebar");
    $(".open").removeClass("open-active");
    $(".project").removeClass("project-active");
    $(".project-name").removeClass("open-active");
    $(".open").removeClass("nohover");
  });
}

function selectByFilter() {
  var filterActive;

  function filterCategory(cat1) {
    $(".items-results .project").removeClass("active");

    var selector = ".filtering .project";
    if (cat1 !== "*") {
      selector = "[data-cat=" + cat1 + "]";
    }

    $(selector).addClass("active");

    filterActive == cat1;
  }

  $(".filtering .project").addClass("active");

  $(".filtering select").change(function () {
    filterCategory($(".filtering select.cat1").val());
    highlightCategory();
  });
}

function selectOnchange(value) {
  if (value == "brand-design") {
    $("#filterCategory").addClass("select-active");
  }
  if (value == "data-visualisation") {
    $("#filterCategory").addClass("select-active");
  }
  if (value == "web-design") {
    $("#filterCategory").addClass("select-active");
  }
  if (value == "visual-journalism") {
    $("#filterCategory").addClass("select-active");
  }
  if (value == "*") {
    $("#filterCategory").removeClass("select-active");
  }
}

function initCategory() {
  $(".project-category").each(function (index) {
    $(this).on("click", () => {
      const anchorClass = createClassFilter($(this).text());
      const categoryElt = $("#filterCategory");

      var projectParentExist = $(this).parents(".project").length;

      if (categoryElt.val() === "*" || categoryElt.val() !== anchorClass) {
        categoryElt.val(anchorClass).change();
      } else {
        categoryElt.val("*").change();
      }
      if (projectParentExist > 0) {
        return false;
      }
    });
  });
}

function highlightCategory() {
  $(".project-category").each(function (index) {
    const anchorClass = createClassFilter($(this).text());
    if ($("#filterCategory").val() === anchorClass) {
      $(this).addClass("selected");
    } else {
      $(this).removeClass("selected");
    }
  });
}

function createClassFilter(data) {
  var filterString = "";
  var regex = /([^a-zA-Z0-9À-ÿ])/gi;
  filterString = data.toLowerCase().replace(/&amp/gi, "").replace(regex, "-");
  return filterString;
}

function disableContextmenu() {
  $("img").mousedown(function (e) {
    e.preventDefault();
  });

  $("body").on("contextmenu", function (e) {
    return false;
  });
}

function galleryAutoplay() {
  $(function () {
    $(".gallery-autoplay").each(function () {
      $(this).children().not(":nth-child(2)").hide();
    });

    setInterval(function () {
      $(".gallery-autoplay").each(function () {
        $(this)
          .children(":first")
          .fadeOut(500)
          .next()
          .fadeIn(500)
          .end()
          .appendTo($(this));
      });
    }, 1000);
  });
}

function imageFullScreen() {
  $("img[data-enlargable]")
    .addClass("img-enlargable")
    .click(function () {
      var backgroundSizeValue = window.innerWidth < 768 ? "90% auto" : "70% auto";
      var src = $(this).attr("src");
      $("<div>")
        .css({
          background: "RGBA(0,0,0,.9) url(" + src + ") no-repeat center",
          backgroundSize: backgroundSizeValue,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: "10000",
          top: "0",
          left: "0",
          cursor: "zoom-out",
        })
        .click(function () {
          $(this).remove();
        })
        .appendTo("body");
    });
}

function addFadeIn() {
  $(window).on("load", function () {
    $(".sidebar")
      .scroll(function () {
        var windowBottom = $(this).offset().top + $(this).height();

        $(".fade").each(function () {
          var objectBottom = $(this).offset().top;

          if (objectBottom < windowBottom) {
            if ($(this).css("opacity") == 0) {
              $(this).animate(
                { opacity: "1", "margin-top": "0" },
                300,
                "swing"
              );
            }
          } else {
            if ($(this).css("opacity") == 1) {
              $(this).animate(
                { opacity: "0", "margin-top": "50" },
                600,
                "swing"
              );
            }
          }
        });
      })
      .scroll();
  });
}

$(document).ready(function () {
  [].forEach.call(document.querySelectorAll("img[data-src]"), function (img) {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = function () {
      img.removeAttribute("data-src");
    };
  });
});

function carouselDrag() {
  const sliders = document.querySelectorAll(".carousel");
  let isDown = false;
  let startX;
  let scrollLeft;

  sliders.forEach((slider) => {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      // console.log(walk);
    });
  });
}

function carouselNav() {
  const imgWidth = window.innerWidth < 768 ? 300:475;
  const imgGap = 20;
  const duration = 500;

  const sliders = document.querySelectorAll(".carousel");

  sliders.forEach((slider) => {
    let currentIndex = 0;

    let isSlideAnimating = false;

    const slides = slider.querySelectorAll(".carousel-item");

    const btnPrev = slider.querySelector(".btn-prev");
    const btnNext = slider.querySelector(".btn-next");

    if (btnPrev && btnNext) {
      btnNext.addEventListener("click", (el) => changeSlide(el, 1));
      btnPrev.addEventListener("click", (el) => changeSlide(el, -1));

      function changeSlide(el, amount) {
        if (isSlideAnimating) {
          return;
        }

        isSlideAnimating = true;

        currentIndex = currentIndex + amount;

        if (currentIndex == slides.length) {
          currentIndex = 0;
        } else if (currentIndex < 0) {
          currentIndex = slides.length - 1;
        }

        const carousel = el.target.closest(".carousel");

        carousel.scrollTo({
          top: 0,
          left: currentIndex * (imgWidth + imgGap),
          behavior: "smooth",
        });

        setTimeout(() => {
          isSlideAnimating = false;
        }, duration);
      }
    }
  });
}

function playVideo() {
  $(".video-container").on("click", function () {
    $(this).find(".video-cover").addClass("hide");
  });
}

function addStickyNav() {
  $(".sidebar").scroll(function () {
    if ($(this).scrollTop() >= 1) {
      $(".project-title").addClass("sticky-header");
      $(".project-header").addClass("sticky-header");
      $(".project-content").addClass("sticky-header");
    } else {
      $(".project-title").removeClass("sticky-header");
      $(".project-header").removeClass("sticky-header");
      $(".project-content").removeClass("sticky-header");
    }
  });
}

function addStickyHeader() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".nav").addClass("sticky");
    } else {
      $(".nav").removeClass("sticky");
    }
  });
}

function addProgressBar(dataTarget) {
  //console.log(dataTarget);
  var windowHeight = $(".sidebar").height(),
    scrollPercent;

  $(".sidebar").scroll(function () {
    var docHeight = $("#" + dataTarget).outerHeight();
    scrollPercent = Number(
      (($(".sidebar").scrollTop() / (docHeight - windowHeight)) * 100).toFixed(
        1
      )
    );

    //console.log({ scrollPercent, docHeight, windowHeight });

    $(".progress").width(scrollPercent + "%");
  });
}

// Open preventDefault fix

const eventListenerOptionsSupported = () => {
  let supported = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
      }
    });

    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch (e) {}

  return supported;
}

const defaultOptions = {
  passive: false,
  capture: false
};
const supportedPassiveTypes = [
  'scroll', 'wheel',
  'touchstart', 'touchmove', 'touchenter', 'touchend', 'touchleave',
  'mouseout', 'mouseleave', 'mouseup', 'mousedown', 'mousemove', 'mouseenter', 'mousewheel', 'mouseover'
];
const getDefaultPassiveOption = (passive, eventName) => {
  if (passive !== undefined) return passive;

  return supportedPassiveTypes.indexOf(eventName) === -1 ? false : defaultOptions.passive;
};

const getWritableOptions = (options) => {
  const passiveDescriptor = Object.getOwnPropertyDescriptor(options, 'passive');

  return passiveDescriptor && passiveDescriptor.writable !== true && passiveDescriptor.set === undefined
    ? Object.assign({}, options)
    : options;
};

const overwriteAddEvent = (superMethod) => {
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const usesListenerOptions = typeof options === 'object' && options !== null;
    const useCapture          = usesListenerOptions ? options.capture : options;

    options         = usesListenerOptions ? getWritableOptions(options) : {};
    options.passive = getDefaultPassiveOption(options.passive, type);
    options.capture = useCapture === undefined ? defaultOptions.capture : useCapture;

    superMethod.call(this, type, listener, options);
  };

  EventTarget.prototype.addEventListener._original = superMethod;
};

const supportsPassive = eventListenerOptionsSupported();

if (supportsPassive) {
  const addEvent = EventTarget.prototype.addEventListener;
  overwriteAddEvent(addEvent);
}

// Close preventDefault fix

document.addEventListener("DOMContentLoaded", () => {
  addStickyHeader();
  imageReveal();
  openCloseSidebar();
  openProject();
  closeProject();
  changeProject();
  swipeRight();
  disableContextmenu();
  selectByFilter();
  initCategory();
  highlightCategory();
  galleryAutoplay();
  imageFullScreen();
  addFadeIn();
  carouselDrag();
  carouselNav();
  playVideo();

  // Scroll
  document.querySelector(".sidebar").addEventListener("scroll", () => {
    addStickyNav();
  });
});
