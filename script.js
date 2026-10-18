(function () {
    var n = document.getElementById('name'), txt = 'Webovky Hudec';
    txt.split('').forEach(function (c, i) {
        var e = document.createElement('span');
        e.textContent = c === ' ' ? '\u00a0' : c;
        e.style.animationDelay = (0.3 + i * 0.12) + 's';
        n.appendChild(e);
    });

    var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) {
            if (x.isIntersecting) {
                x.target.classList.add('in');
                var b = x.target.querySelector('.bar i');
                if (b) b.style.width = b.dataset.w + '%';
                io.unobserve(x.target);
            }
        });
    }, { threshold: .2 });

    document.querySelectorAll('.rv').forEach(function (e) {
        io.observe(e);
    });

    var nav = document.getElementById('nav'),
        pg = document.getElementById('prog'),
        dial = document.getElementById('dial'),
        tl = document.getElementById('tl'),
        tline = document.getElementById('tline');

    var links = [].slice.call(document.querySelectorAll('nav ul a')),
        secs = links.map(function (a) {
            return document.querySelector(a.getAttribute('href'));
        });

    function onS() {
        var y = window.scrollY,
            h = document.documentElement.scrollHeight - innerHeight;

        pg.style.width = (y / h * 100) + '%';
        nav.classList.toggle('on', y > 60);

        dial.style.transform = 'translate(-50%,calc(-50% + ' + (y * .25) + 'px)) scale(' + (1 + y * .0003) + ')';
        dial.style.opacity = Math.max(0, 1 - y / 800);

        var r = tl.getBoundingClientRect(),
            p = Math.min(1, Math.max(0, (innerHeight * .7 - r.top) / r.height));
        tline.style.height = (p * 100) + '%';

        var cur = 0;
        secs.forEach(function (e, i) {
            if (e.getBoundingClientRect().top < innerHeight * .4) cur = i;
        });

        links.forEach(function (a, i) {
            a.classList.toggle('act', i === cur);
        });
    }

    addEventListener('scroll', function () {
        requestAnimationFrame(onS);
    }, { passive: true });
    
    onS();

    document.getElementById('send').onclick = function () {
        var b = encodeURIComponent(
            document.getElementById('f-m').value + '\n\n' +
            document.getElementById('f-n').value + ' (' + document.getElementById('f-e').value + ')'
        );
        location.href = 'mailto:damihudec@gmail.com?subject=' + encodeURIComponent('Poptávka webu') + '&body=' + b;
    };
})();