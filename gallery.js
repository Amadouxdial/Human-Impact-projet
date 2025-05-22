// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Gestion des filtres de la galerie
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrage des médias
            const mediaItems = document.querySelectorAll('.gallery-item');
            mediaItems.forEach(item => {
                if (filter === 'all' || item.dataset.type === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialisation de lightbox pour les images
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
}); 