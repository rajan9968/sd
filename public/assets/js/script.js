const nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
    nav.classList.toggle("openSearch");
    nav.classList.remove("openNav");
    if (nav.classList.contains("openSearch")) {
        return searchIcon.classList.replace("uil-search", "uil-times");
    }
    searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
});


// Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + totalSlides) % totalSlides;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Arrow buttons
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto slide
let autoSlide = setInterval(nextSlide, 5000);

// Pause auto slide on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});


$(document).ready(function () {
    var owl = $("#history-carousel");
    var $contentText = $(".content-text");
    var $portfolioSection = $(".our-portfolio");
    var $bgLayer = $portfolioSection.find('.bg-layer');

    owl.owlCarousel({
        items: 3,
        loop: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 3000,
        nav: true,
        navText: ['<span class="prev">‹</span>', '<span class="next">›</span>'],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        center: true,
        responsive: {
            0: {
                items: 1, // Mobile
                center: false
            },
            576: {
                items: 2, // Small devices
                center: false
            },
            992: {
                items: 3, // Large screens
                center: true
            }
        }
    });


    var totalItems = owl.find('.owl-item:not(.cloned)').length;
    $('#total-slides').text(totalItems.toString().padStart(2, '0'));

    function updateContent(event) {
        var currentIndex = event.item.index;
        var $activeSlide = $(event.target).find(".owl-item").eq(currentIndex).find(".history-box");

        var title = $activeSlide.data("title");
        var description = $activeSlide.data("description");
        var image = $activeSlide.data("image");

        // Fade out text
        $contentText.addClass('fade-out');

        setTimeout(function () {
            // Update text
            $contentText.find("h3").html(title);
            $contentText.find("p").html(description);
            $contentText.removeClass('fade-out'); // fade in
        }, 300);

        // Fade background
        if (image) {
            $bgLayer.fadeOut(300, function () {
                $bgLayer.css('background-image', 'url(' + image + ')').fadeIn(300);
            });
        }
    }

    // Initialize first slide
    var firstSlide = owl.find(".owl-item.center .history-box");
    if (firstSlide.length) {
        $contentText.find("h3").html(firstSlide.data("title"));
        $contentText.find("p").html(firstSlide.data("description"));
        var firstImage = firstSlide.data("image");
        if (firstImage) {
            $bgLayer.css('background-image', 'url(' + firstImage + ')');
        }
    }

    // Update slide number & content on change
    owl.on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index - event.relatedTarget._clones.length / 2;
        if (currentIndex < 0) currentIndex = totalItems + currentIndex;
        currentIndex = (currentIndex % totalItems) + 1;

        $('#current-slide').text(currentIndex.toString().padStart(2, '0'));
        updateContent(event);
    });
});


$(document).ready(function () {
    $("#join-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1, // Mobile (1 item)
                center: false
            },
            576: {
                items: 2, // Tablets and up (2 items)
                center: false
            },
            992: {
                items: 2, // Large screens (2 items)
                center: false
            }
        }
    });
});

$(document).ready(function () {
    $("#new-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1, // Mobile (1 item)
                center: false,
                nav: false,
                dots: true,
            },
            576: {
                items: 2, // Tablets and up (2 items)
                center: false
            },
            992: {
                items: 3, // Large screens (2 items)
                center: false
            }
        }
    });
});


document.querySelectorAll('.submenu-toggle').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('data-target');
        const submenu = document.querySelector(targetSelector);

        // Show submenu offcanvas
        const bsOffcanvas = new bootstrap.Offcanvas(submenu);
        bsOffcanvas.show();

        // Shift main offcanvas smoothly
        const mainOffcanvas = document.getElementById('offcanvasRight');
        mainOffcanvas.style.marginRight = '21em';

        // Hide main offcanvas close button
        const mainCloseBtn = mainOffcanvas.querySelector('.btn-clos');
        if (mainCloseBtn) mainCloseBtn.style.display = 'none';

        // Reset main offcanvas when submenu closes
        submenu.addEventListener('hidden.bs.offcanvas', () => {
            mainOffcanvas.style.marginRight = ''; // smooth return
            if (mainCloseBtn) mainCloseBtn.style.display = 'block'; // show again
        });
    });
});


window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});
