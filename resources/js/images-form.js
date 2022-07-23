
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.images-form-container').forEach(form => {
        const btn = form.querySelector('button');
        if (!btn) return;

        const before = btn.closest('.text-center');

        // Set the event listeners for any existing remove buttons
        form.querySelectorAll('a').forEach(remove => {
            const div = remove.parentElement;
            remove.addEventListener('click', e => {
                e.preventDefault();
                div.remove();
                updateButtonVisibility();
            });
        });

        // Button visibility to limit maximum number of images to 10 (mandatory first image + 9 optional additional images)
        const updateButtonVisibility = () => {
            const num = form.querySelectorAll('input').length;
            before.classList.toggle('d-none', num >= 9);
        };
        updateButtonVisibility();

        // When the button is clicked add a new input for an image
        btn.addEventListener('click', event => {
            event.preventDefault();

            const num = form.querySelectorAll('input').length;
            if (num >= 9) return; // max. 10 images

            const div = document.createElement('div');
            const input = document.createElement('input');
            const remove = document.createElement('a');

            div.classList.add('d-flex', 'flex-row');

            input.classList.add('flex-fill', 'my-1');
            input.type = 'file';
            input.name = 'images[]';
            input.accept = '.jpg,.jpeg';

            remove.classList.add('align-self-center', 'px-2');
            remove.href = '#';
            remove.innerHTML = '<span class="fas fa-times"></span>';
            remove.addEventListener('click', e => {
                e.preventDefault();
                div.remove();
                updateButtonVisibility();
            });

            div.append(input, remove);
            form.insertBefore(div, before);
            updateButtonVisibility();
        });
    });
});
