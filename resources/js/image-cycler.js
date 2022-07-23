document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.image-cycler').forEach(x => {
        const images = Array.from(x.querySelectorAll('img'));
        const controls = x.querySelector('.controls');
        if (images.length <= 1 || !controls) return;

        const numImages = images.length;
        let curImage = 0;

        const prev = document.createElement('a');
        prev.href = "#";
        prev.innerHTML = '<span class="fas fa-chevron-left"></span>';

        const next = document.createElement('a');
        next.href = "#";
        next.innerHTML = '<span class="fas fa-chevron-right"></span>';

        const label = document.createElement('span');
        label.textContent = `${curImage + 1} / ${numImages}`;

        const cycle = (num) => {
            images[curImage].classList.add('d-none');
            curImage += num;
            while (curImage < 0) curImage += numImages;
            curImage = curImage % numImages;
            label.textContent = `${curImage + 1} / ${numImages}`;
            images[curImage].classList.remove('d-none');
        };

        prev.addEventListener('click', event => {
            event.preventDefault();
            cycle(-1);
        });

        next.addEventListener('click', event => {
            event.preventDefault();
            cycle(+1);
        });

        controls.append(prev, label, next);

        if (x.classList.contains('image-cycler-clickable')) {
            const containers = Array.from(x.parentElement.children);
            x.addEventListener('click', event => {
                if (event.target && event.target.tagName == 'IMG') {
                    containers.forEach(c => {
                        c.classList.toggle('col-md-12');
                        c.classList.toggle('enlarged');
                    });
                }
            });
        }
    });
});
