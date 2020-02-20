// ==UserScript==
// @name         rggu_raspis_autoUpdater
// @namespace    rggu_helper
// @version      0.0.1
// @updateURL
// @dowloadURL
// @description  plugin can automatic get update of raspis when changed some parametrs
// @author       Durck
// @match        https://*.rsuh.ru/raspis*
// @include      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @include      https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js
// @include      https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js
// ==/UserScript==

function wrapper(plugin_info) {
    if (window.plugin !== 'function') window.plugin = function() {};

    /*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

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

    window.plugin.rgguRaspisAutoUpdate.changedData = function (d) {
      $.cookie(d, $('#' + d).val(), {expires: 365, path: '/'});
      if (d == 'caf') {
        $.cookie('cafzn', $('#caf :selected').html(), {expires: 365, });
      }
      window.plugin.rgguRaspisAutoUpdate.getRaspis();
    }

    var setup = function () {
        $('select#formob').change(() => {window.plugin.rgguRaspisAutoUpdate.changedData('formob')});
        $('select#kyrs').change(() => {window.plugin.rgguRaspisAutoUpdate.changedData('kyrs')});
        $('select#srok').change(() => {window.plugin.rgguRaspisAutoUpdate.changedData('srok')});
        $('select#caf').change(() => {window.plugin.rgguRaspisAutoUpdate.changedData('caf')});
    };

    setup.info = plugin_info; //add the script info data to the function as a property
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
