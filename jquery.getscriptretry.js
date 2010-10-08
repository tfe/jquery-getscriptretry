/*!
 * getScriptRetry v1.0 (2010-10-08)
 * http://github.com/tfe/jquery-getscriptretry
 * 
 * Extended version of jQuery.getScript() that retries failed requests and (bonus!) allows responses to be cached.
 * 
 * © 2010 Todd Eichel (http://toddeichel.com/)
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Inspiration:
 *  - http://harrybailey.com/2010/03/more-powerful-jquery-getscript-with-cache-control/
 *  - http://zeroedandnoughted.com/defensive-ajax-and-ajax-retries-in-jquery/
 *  - http://github.com/execjosh/jquery-ajax-retry/
 */
(function ($) {
$.getScriptRetry = function (url, callback, options) {
  
  // default settings; may be overridden by passing options
  var settings = {
    'cache': true,
    'timeout': 5000,
    'tryCount': 0,
    'retryLimit': 4,
    'warning': false,
    'warningMessage': 'There seems to be a problem communicating with the server. Please try reloading the page.'
  }
  
  if (options) { 
    $.extend(settings, options);
  }
  
  $.ajax($.extend({
    url: url,
    type: 'get',
    dataType: 'script',
    success: callback,
    error: function () {
      if (this.tryCount < this.retryLimit) {
        this.tryCount++;
        $.ajax(this);
      } else {
        if (this.warning) {
          alert(this.warningMessage);
        } else {
          // fail quietly
        }
      }
    }
  }, settings));
};
})(jQuery);
