// ==UserScript==
// @name         rggu_raspis_autoUpdater
// @namespace    rggu_helper
// @version      0.1
// @description  plugin can automatic get update of raspis when changed some parametrs
// @author       Durck
// @match        https://*.rsuh.ru/raspis*
// @include      https://code.jquery.com/jquery-3.4.1.slim.min.js
// @grant        none
// ==/UserScript==

function wrapper(plugin_info) {
    if (window.plugin !== 'function') window.plugin = function() {};

    window.plugin.rgguRaspisAutoUpdate = function() {};

    window.plugin.rgguRaspisAutoUpdate.getRaspis = function() {
        var formob = $('#formob :selected').val();
        var kyrs = $('#kyrs :selected').val();
        var srok = $('#srok :selected').val();
        var caf = $('#caf :selected').val();
        var cafzn = $('#caf :selected').html();

        var sdate_year = $('#sdate_year :selected').val();
        var sdate_month = $('#sdate_month :selected').val();
        var sdate_day = $('#sdate_day :selected').val();
        var fdate_year = $('#fdate_year :selected').val();
        var fdate_month = $('#fdate_month :selected').val();
        var fdate_day = $('#fdate_day :selected').val();

        $.post(
            '../rasp/3.php', { formob: formob, kyrs: kyrs, srok: srok, caf: caf, cafzn: cafzn, sdate_year: sdate_year, sdate_month: sdate_month, sdate_day: sdate_day, fdate_year: fdate_year, fdate_month: fdate_month, fdate_day: fdate_day },
            function (result1) {
                $('#dop2').html(result1);
            }
        );
    }

    var setup = function () {
        if (window.plugin.rggu === undefined) {
            alert("ERROR: 'raspis_helper' require 'rggu_helper'!!!");
            return;
        }

        $('select#formob').change(window.plugin.rgguRaspisAutoUpdate.getRaspis);
        $('select#kyrs').change(window.plugin.rgguRaspisAutoUpdate.getRaspis);
        $('select#srok').change(window.plugin.rgguRaspisAutoUpdate.getRaspis);
        $('select#caf').change(window.plugin.rgguRaspisAutoUpdate.getRaspis);
    };

    setup.info = plugin_info; //add the script info data to the function as a property
    if (!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if (window.rgguLoaded && typeof setup === 'function') setup();
}

var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ');'));
(document.body || document.head || document.documentElement).appendChild(script);
