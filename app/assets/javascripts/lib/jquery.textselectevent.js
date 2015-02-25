/* jQuery plugin textselect
 * version: 1.0
 * tested on jQuery 1.3.2, 1.5
 * author: josef.moravec@gmail.com, duane.johnson@gmail.com
 *
 * usage:
 * $(function() {
 *		$(document).bind('textselect', function(e) {
 *			Do stuff with e.text
 *		});
 *	 });
 * --OR--
 * $('#textdiv').selectText();
 */
(function($) {
  // Taken from http://stackoverflow.com/questions/985272/jquery-selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
  $.fn.selectText = function() {
    var obj = this[0];
    if ($.browser.msie) {
      var range = obj.offsetParent.createTextRange();
      range.moveToElementText(obj);
      range.select();
    } else if ($.browser.mozilla || $.browser.opera || $.browser.chrome) {
      var selection = obj.ownerDocument.defaultView.getSelection();
      var range = obj.ownerDocument.createRange();
      range.selectNodeContents(obj);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if ($.browser.safari) {
      var selection = obj.ownerDocument.defaultView.getSelection();
      selection.setBaseAndExtent(obj, 0, obj, 1);
    }
    return this;
  };

  $.event.special.textselect = {
    setup: function(data, namespaces) {
      $(this).data("textselected",false);
      $(this).bind('mouseup', $.event.special.textselect.handler);
    },
    teardown: function(data) {
      $(this).unbind('mouseup', $.event.special.textselect.handler);
    },
    handler: function(event) {
      var text = $.event.special.textselect.getSelectedText().toString();
      if (text != '') {
        $(this).data("textselected",true);
        event.type = "textselect";
        event.text = text;
        $.event.handle.apply(this, arguments);
      }
    },
    getSelectedText: function() {
      var text = '';
        if (window.getSelection) {
         text = window.getSelection();
        } else if (document.getSelection) {
          text = document.getSelection();
          } else if (document.selection) {
          text = document.selection.createRange().text;
        }
      return text;
    }
  };

  $.event.special.textunselect = {
    setup: function(data, namespaces) {
      $(this).data("textselected",false);
      $(this).bind('mouseup', $.event.special.textunselect.handler);
      $(this).bind('keyup', $.event.special.textunselect.handlerKey)
    },
    teardown: function(data) {
      $(this).unbind('mouseup', $.event.special.textunselect.handler);
    },
    handler: function(event) {
      if($(this).data("textselected")) {
        var text = $.event.special.textselect.getSelectedText().toString();
        if(text=='') {
          $(this).data("textselected",false);
          event.type = "textunselect";
          $.event.handle.apply(this, arguments);
        }
      }
    },
    handlerKey: function(event) {
      if ($(this).data("textselected")) {
        var text = $.event.special.textselect.getSelectedText().toString();
        if ((event.keyCode == 27) && (text=='')) {
          $(this).data("textselected",false);
          event.type = "textunselect";
          $.event.handle.apply(this, arguments);
        }
      }
    }
  };

})(jQuery);
