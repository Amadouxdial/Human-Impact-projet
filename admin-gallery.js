document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const mediaInput = document.getElementById('mediaInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const mediaGrid = document.getElementById('mediaGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Gestion de la prévisualisation des fichiers
    mediaInput.addEventListener('change', function(e) {
        uploadPreview.innerHTML = '';
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            const previewContainer = document.createElement('div');
            previewContainer.className = 'preview-item';

            reader.onload = function(e) {
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previewContainer.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = e.target.result;
                    video.controls = true;
                    previewContainer.appendChild(video);
                }

                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.className = 'remove-preview';
                removeBtn.onclick = function() {
                    previewContainer.remove();
                };
                previewContainer.appendChild(removeBtn);
            };

            reader.readAsDataURL(file);
            uploadPreview.appendChild(previewContainer);
        });
    });

    // Gestion du formulaire d'upload
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData();
        const files = mediaInput.files;
        const category = document.getElementById('mediaCategory').value;
        const description = document.getElementById('mediaDescription').value;

        for (let file of files) {
            formData.append('media[]', file);
        }
        formData.append('category', category);
        formData.append('description', description);

        try {
            // Ici, vous devrez implémenter l'appel à votre API pour l'upload
            // const response = await fetch('/api/upload', {
            //     method: 'POST',
            //     body: formData
            // });
            
            alert('Upload réussi !');
            uploadForm.reset();
            uploadPreview.innerHTML = '';
            loadMediaGrid(); // Recharger la grille des médias
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            alert('Une erreur est survenue lors de l\'upload');
        }
    });

    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const mediaItems = document.querySelectorAll('.media-item');
            mediaItems.forEach(item => {
                if (filter === 'all' || item.dataset.type === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Fonction pour charger la grille des médias existants
    async function loadMediaGrid() {
        try {
            // Ici, vous devrez implémenter l'appel à votre API pour récupérer les médias
            // const response = await fetch('/api/media');
            // const media = await response.json();
            
            // Exemple de structure de données
            const media = [
                { id: 1, type: 'image', url: 'path/to/image1.jpg', category: 'actions' },
                { id: 2, type: 'video', url: 'path/to/video1.mp4', category: 'evenements' }
            ];

            mediaGrid.innerHTML = '';
            media.forEach(item => {
                const mediaItem = createMediaItem(item);
                mediaGrid.appendChild(mediaItem);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des médias:', error);
        }
    }

    // Fonction pour créer un élément média
    function createMediaItem(item) {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.dataset.type = item.type;
        mediaItem.dataset.category = item.category;

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = item.description || '';
            mediaItem.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.url;
            video.controls = true;
            mediaItem.appendChild(video);
        }

        const actions = document.createElement('div');
        actions.className = 'media-item-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteMedia(item.id);
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editMedia(item.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        mediaItem.appendChild(actions);

        return mediaItem;
    }

    // Fonction pour supprimer un média
    async function deleteMedia(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
            try {
                // Ici, vous devrez implémenter l'appel à votre API pour la suppression
                // await fetch(`/api/media/${id}`, { method: 'DELETE' });
                loadMediaGrid(); // Recharger la grille
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Une erreur est survenue lors de la suppression');
            }
        }
    }

    // Fonction pour éditer un média
    function editMedia(id) {
        // Implémenter la logique d'édition ici
        console.log('Édition du média:', id);
    }

    // Charger les médias au chargement de la page
    loadMediaGrid();
}); 