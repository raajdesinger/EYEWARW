      
    const tabs = document.querySelectorAll('#galleryTab .nav-link');
    const galleryItems = document.querySelectorAll('.gallery-item');

    tabs.forEach(tab => {

        tab.addEventListener('click', function () {

            // Active Tab
            tabs.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {

                const category = item.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }

            });

        });

    });
