document.addEventListener('DOMContentLoaded', () => {
    init_all_image_cyclers(document);
});

window.init_all_image_cyclers = function(element) {
    element.querySelectorAll('.image-cycler').forEach(x => {
        init_image_cycler(x);
    });
}

function init_image_cycler(element) {
    if (element.getAttribute('data-stop')) return;
    element.setAttribute('data-stop', 'true');

    const images = Array.from(element.querySelectorAll('img'));
    const controls = element.querySelector('.controls');
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

    if (element.classList.contains('image-cycler-clickable')) {
        const containers = Array.from(element.parentElement.children);
        element.addEventListener('click', event => {
            if (event.target && (''+event.target.tagName).toUpperCase() == 'IMG') {
                containers.forEach(c => {
                    c.classList.toggle('col-md-12');
                    c.classList.toggle('enlarged');
                });
            }
        });
    }
}
