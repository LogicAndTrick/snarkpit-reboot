import hljs from './highlight';
import { init_all_image_cyclers } from './image-cycler';

// All side-effects are done here:
import './bbcode-preview';
import './embed';
import './snowsnarks';
import './images-form';

document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();
    init_all_image_cyclers(document);
});
