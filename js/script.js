// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 3000; // 3 seconds
    let isTransitioning = false;

    // Clone first and last slides for infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    // Adjust initial position (start at index 1 because of prepended clone)
    let position = 1;
    slidesContainer.style.transform = `translateX(-${position * 100}%)`;

    // Go to slide by index
    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        position = index + 1; // +1 because of prepended clone
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Handle transition end for infinite loop
    slidesContainer.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        // If at first clone (end), jump to real first slide
        if (position === totalSlides + 1) {
            slidesContainer.style.transition = 'none';
            position = 1;
            slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        }
        
        // If at last clone (start), jump to real last slide
        if (position === 0) {
            slidesContainer.style.transition = 'none';
            position = totalSlides;
            slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        }
    });

    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        position++;
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        
        currentIndex = (currentIndex + 1) % totalSlides;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        isTransitioning = true;
    }

    // Previous slide
    function prevSlide() {
        if (isTransitioning) return;
        position--;
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        isTransitioning = true;
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
