document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animation du burger
        burger.classList.toggle('toggle');
    });
});

// Team photos transition
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.team-photo');
    let currentPhotoIndex = 0;
    
    function switchPhoto() {
        // Remove active class from all photos
        photos.forEach(photo => photo.classList.remove('active'));
        
        // Add active class to current photo
        photos[currentPhotoIndex].classList.add('active');
        
        // Calculate next photo index
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        
        // Set timeout for next switch - 3 seconds for both photos
        setTimeout(switchPhoto, 3000);
    }
    
    // Start the animation
    switchPhoto();
}); 