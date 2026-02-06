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

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    let position = 1;
    slidesContainer.style.transform = `translateX(-${position * 100}%)`;

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        position = index + 1; 
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

    slidesContainer.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        if (position === totalSlides + 1) {
            slidesContainer.style.transition = 'none';
            position = 1;
            slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        }
        
        if (position === 0) {
            slidesContainer.style.transition = 'none';
            position = totalSlides;
            slidesContainer.style.transform = `translateX(-${position * 100}%)`;
        }
    });

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

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

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

    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', stopAutoPlay);
    slideshow.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
});
