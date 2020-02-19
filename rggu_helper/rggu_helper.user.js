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
// @include      https://code.jquery.com/jquery-3.4.1.slim.min.js
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
                    console.log('plugin must provide setup function');
                    return;
                }
                try {
                    setup.call(this);
                } catch (err) {
                    var name = info.script && info.script.name || info.pluginId;
                    console.log('error starting plugin:', name, ', error:', err);
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
