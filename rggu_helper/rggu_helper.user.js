// ==UserScript==
// @name         rggu_helper
// @namespace    rggu_helper
// @version      0.0.1
// @updateURL
// @dowloadURL
// @description  try to take over the world!
// @author       Durck
// @match        https://*.rsuh.ru/*
// @match        https://*.rggu.ru/*
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @include      https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js
// @include      https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        none
// ==/UserScript==

function wrapper(plugin_info) {
    if (typeof window.plugin !== 'function') window.plugin = function() {};

    window.plugin.rggu = function() {};

    //*** module: boot.js
    (function() {
        function prepPluginsToLoad() {
            function safeSetup(setup) {
                if (!setup) {
                    alert('plugin must provide setup function');
                    return;
                }
                try {
                    setup.call(this);
                } catch (err) {
                    var name = info.script && info.script.name || info.pluginId;
                    alert('error starting plugin:', name, ', error:', err);
                }
            }

            if (!window.bootPlugins) {
                window.bootPlugins = [];
            }

            return function() {
                while (window.bootPlugins[0]) {
                    safeSetup(window.bootPlugins.shift());
                }
            }
        }

        function boot() {
            var loadPlugins = prepPluginsToLoad();
            loadPlugins();

            window.rgguLoaded = true;
        }

        $(boot);
     })();
}


var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
