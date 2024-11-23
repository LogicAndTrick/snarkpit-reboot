window.addEventListener('DOMContentLoaded', function () {
    const isChristmas = document.body.classList.contains('snow');
    if (!isChristmas) return;

    const imgSnark = '/images/xmassnark.gif';
    const imgBang = '/images/anibang.gif';

    // preload the explosion
    const preload = new Image();
    preload.src = imgBang;

    const averageHspeed = 10;
    const averageVspeed = 0.75;
    const averageDrift = 50;
    const minScale = 0.7;
    const maxScale = 1.5;
    const horizontalPaddingPx = 100;
    const minSnarks = 8;
    const maxSnarks = 12;

    // It's raining snarks!

    const snowContainer = document.createElement('div');
    snowContainer.classList.add('snowfield');

    const flakes = [];

    function repositionSnowflake(flake, initial) {
        if (initial) flake.top = -60 - (Math.random() * window.innerHeight * 0.5);
        else flake.top = -60;
        flake.left = (horizontalPaddingPx / 2) + Math.random() * (window.innerWidth - horizontalPaddingPx);
        flake.drift = Math.random() * averageDrift;
        flake.vspeed = averageVspeed + Math.random() * averageVspeed;
        flake.hspeed = averageHspeed + Math.random() * averageHspeed;
        flake.direction = Math.random() < 0.5 ? -1 : 1;
        flake.element.opacity = '' + Math.random();
        flake.element.style.transform = 'scale(' + (Math.random() * (maxScale-minScale) + minScale) + ')';
    }

    let last = 0;
    function animateSnowflakes(timestamp) {
        const elapsed = (timestamp - last) / 1000;
        last = timestamp;

        for (let i = 0; i < flakes.length; i++) {
            const flake = flakes[i];

            if (flake.exploding) {
                if (flake.explodeTimeout <= 0) {
                    flake.exploding = false;
                    flake.explodeTimeout = 0;
                    flake.element.src = imgSnark;
                    repositionSnowflake(flake);
                } else {
                    flake.explodeTimeout -= elapsed;
                }
                continue;
            }

            flake.top += flake.vspeed * elapsed * 60;
            if (flake.top > window.innerHeight) {
                // If the tab is in the background or hasn't got animation frames for a while,
                // all the snowflakes will get reset to the top of the container, and it looks
                // bad. So retain the top value so flakes respawn in a nice random position.
                repositionSnowflake(flake);
            } else {
                const distance = flake.hspeed * elapsed;
                flake.left += distance * flake.direction;
                flake.drift -= distance;
                if (flake.drift < 0) {
                    flake.drift = Math.random() * averageDrift;
                    flake.direction = Math.random() < 0.5 ? -1 : 1;
                    flake.hspeed = averageHspeed + Math.random() * averageHspeed;
                }
            }

            flake.element.style.top = flake.top + 'px';
            flake.element.style.left = flake.left + 'px';
        }
        window.requestAnimationFrame(animateSnowflakes);
    }

    function explodeSnark(flake) {
        if (flake.exploding) return;
        flake.exploding = true;
        flake.explodeTimeout = 1.7;
        flake.element.src = imgBang;
    }

    const numFlakes = minSnarks + Math.floor(Math.random() * (maxSnarks - minSnarks));

    for (let i = 0; i < numFlakes; i++) {
        const el = document.createElement('img');
        el.src = imgSnark;
        el.classList.add('snowflake')
        const flake = {
            element: el,
            top: 0,
            left: 0,
            drift: 0,
            hspeed: 0,
            vspeed: 0,
            direction: 0,
            exploding: false,
            explodeTimeout: 0
        };
        flakes.push(flake);
        snowContainer.append(flake.element);
        repositionSnowflake(flake, true);
        flake.element.addEventListener('mousedown', () => explodeSnark(flake));
    }
    document.body.prepend(snowContainer);
    window.requestAnimationFrame(animateSnowflakes);
});
