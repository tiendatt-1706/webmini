// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 4000; // 4 seconds

    // Go to slide by index
    function goToSlide(index) {
        // Handle wrap-around
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        currentIndex = index;

        // Move slides container
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Auto play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause on hover
    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', stopAutoPlay);
    slideshow.addEventListener('mouseleave', startAutoPlay);

    // Start autoplay
    startAutoPlay();
});
