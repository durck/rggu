// ==UserScript==
// @name         rggu_//TODO
// @namespace    rggu_helper
// @version      0.0.1
// @updateURL
// @dowloadURL
// @description  plugin can automatic get update of raspis when changed some parametrs
// @author       Durck
// @match        https://*.rsuh.ru/raspis*
// @require      https://code.jquery.com/jquery-3.4.1.slim.min.js
// @grant        none
// ==/UserScript==

function wrapper(plugin_info) {
  if (window.plugin !== 'function') window.plugin = function() {};

  window.plugin.{name_of_plugin} = function() {};

  var setup = function() {

  }

  setup.info = plugin_info;
  if (!window.bootPlugins) window.bootPlugins = [];
  // if IITC has already booted, immediately run the 'setup' function
  if (window.rgguLoaded && typeof setup === 'function') setup();
  else window.bootPlugins.push(setup);
}


var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
