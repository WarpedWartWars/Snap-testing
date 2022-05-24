var cacheName = 'snap-pwa',
    filesToCache = [
        'index.html',
        'snap.html',
        'manifest.json',

        // img
        'snap-icon-72.png',
        'snap-icon-96.png',
        'snap-icon-120.png',
        'snap-icon-128.png',
        'snap-icon-144.png',
        'snap-icon-152.png',
        'snap-icon-192.png',
        'snap-icon-256.png',
        'snap-icon-384.png',
        'snap-icon-512.png',

        // program
        'src/morphic.js',
        'src/symbols.js',
        'src/widgets.js',
        'src/blocks.js',
        'src/threads.js',
        'src/objects.js',
        'src/scenes.js',
        'src/gui.js',
        'src/paint.js',
        'src/lists.js',
        'src/byob.js',
        'src/tables.js',
        'src/sketch.js',
        'src/video.js',
        'src/maps.js',
        'src/extensions.js',
        'src/xml.js',
        'src/store.js',
        'src/locale.js',
        'src/cloud.js',
        'src/api.js',
        'src/sha512.js',
        'src/FileSaver.min.js',

        // translations
        'locale/lang-ar.js',
        'locale/lang-bg.js',
        'locale/lang-bn.js',
        'locale/lang-ca.js',
        'locale/lang-ca_VA.js',
        'locale/lang-cs.js',
        'locale/lang-de.js',
        'locale/lang-dk.js',
        'locale/lang-el.js',
        'locale/lang-eo.js',
        'locale/lang-es.js',
        'locale/lang-et.js',
        'locale/lang-eu.js',
        'locale/lang-fi.js',
        'locale/lang-fr.js',
        'locale/lang-gl.js',
        'locale/lang-he.js',
        'locale/lang-hi.js',
        'locale/lang-hr.js',
        'locale/lang-hu.js',
        'locale/lang-ia.js',
        'locale/lang-id.js',
        'locale/lang-it.js',
        'locale/lang-ja_HIRA.js',
        'locale/lang-ja.js',
        'locale/lang-kn.js',
        'locale/lang-ko.js',
        'locale/lang-ml.js',
        'locale/lang-nl.js',
        'locale/lang-no.js',
        'locale/lang-pl.js',
        'locale/lang-pt_BR.js',
        'locale/lang-pt.js',
        'locale/lang-ro.js',
        'locale/lang-ru.js',
        'locale/lang-si.js',
        'locale/lang-sk.js',
        'locale/lang-sv.js',
        'locale/lang-ta.js',
        'locale/lang-te.js',
        'locale/lang-tr.js',
        'locale/lang-ua.js',
        'locale/lang-zh_CN.js',
        'locale/lang-zh_TW.js',

        //libraries
        'libraries/LIBRARIES',

        'libraries/animation_module.xml',
        'libraries/apl.xml',
        'libraries/audioComp_module.xml',
        'libraries/bar-charts.xml',
        'libraries/biginteger.js',
        'libraries/bignumbers.xml',
        'libraries/bignums.js',
        'libraries/bbtSnapExtension.js',
        'libraries/cases.xml',
        'libraries/colors.xml',
        'libraries/Eisenbergification.xml',
        'libraries/frequency_distribution_module.xml',
        'libraries/httpBlocks.xml',
        'libraries/HummingbirdBlocks.xml',
        'libraries/iteration-composition.xml',
        'libraries/leap-library.xml',
        'libraries/list-utilities.xml',
        'libraries/localstorage_module.xml',
        'libraries/make-variables.xml',
        'libraries/maps_module.xml',
        'libraries/parallel_module.xml',
        'libraries/pixel_module.xml',
        'libraries/schemeNumber.js',
        'libraries/serial_module.xml',
        'libraries/speech_module.xml',
        'libraries/stream-tools.xml',
        'libraries/strings.xml',
        'libraries/textCostumes_module.xml',
        'libraries/try-catch.xml',
        'libraries/variadic-reporters.xml',
        'libraries/word-sentence.xml',
        
        // Examples
        'Examples/EXAMPLES',

        'Examples/animal-game.xml',
        'Examples/Codification.xml',
        'Examples/copter.xml',
        'Examples/count-change.xml',
        'Examples/icecream-visual.xml',
        'Examples/JSfunctions.xml',
        'Examples/live-tree.xml',
        'Examples/swimmer.xml',
        'Examples/tree.xml',
        'Examples/vee.xml',
    ];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
