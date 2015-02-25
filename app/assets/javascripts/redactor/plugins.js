if (!RedactorPlugins) var RedactorPlugins = {};


RedactorPlugins.emdash = function()
{
  var EM_DASH = "—", DOUBLE_HYPHEN = "--",
      HYPHEN_KEY_CODE = 189, BACKSPACE_KEY_CODE = 8,
      REPLACE_DOUBLE_HYPHEN_REGEX = /--[\u200B]?$/,
      REPLACE_EM_DASH_REGEX = /—$/;

  var lastKeyCode = null,
      replacedWithEmdash = false;

  return {
    init: function() {
      if (this.utils.browser("mozilla")) {
        HYPHEN_KEY_CODE = 173;
      }

      var replaceTextBeforeCaret =  $.proxy(function(expectedTextBeforeCaret, updatedText) {
        this.selection.get();
        var startOffset = this.range.startOffset - expectedTextBeforeCaret.length;
        this.range.setStart(this.range.startContainer, startOffset);
        if (this.range.toString() != expectedTextBeforeCaret){
          return false;
        }

        this.selection.addRange();
        this.insert.text(updatedText);

        return true;
      }, this);


      var $editor = this.core.getEditor()

      $editor.on("keyup", function(event) {
        if (!!lastKeyCode && lastKeyCode == HYPHEN_KEY_CODE && event.which == HYPHEN_KEY_CODE) {
          if (replaceTextBeforeCaret(DOUBLE_HYPHEN, EM_DASH)) {
            replacedWithEmdash = true;
            lastKeyCode = null;
            return;
          }
        }

        replacedWithEmdash = false;
        lastKeyCode = event.which;
      });

      $editor.on("keydown", function(event) {
        if (replacedWithEmdash && event.which == BACKSPACE_KEY_CODE) {
          if (replaceTextBeforeCaret(EM_DASH, DOUBLE_HYPHEN)) {
            event.preventDefault();
          }
        }

        replacedWithEmdash = false;
      });
    }
  };
};


RedactorPlugins.inline_commenting = function() {

  var BACKSPACE_KEYCODE = 8, DELETE_KEYCODE = 46;

  var $insertComment = $("#insert-comment");
  var nextCommentId = 1;

  return {
    init: function() {
      var $editor = this.core.getEditor()

      $editor.on("textselect textunselect", $.proxy(function(event) {
        if ($.trim(this.selection.getText()) == "") {
          $insertComment.attr("disabled", "disabled");
        } else {
          $insertComment.removeAttr("disabled");
        }
      }, this));

      // $editor.on("keydown keyup", $.proxy(function(event) {
      //   var key = event.which;
      //   if (key === BACKSPACE_KEYCODE || key === DELETE_KEYCODE)
      //   {
      //     var current = this.selection.getCurrent();
      //     if (current && current.tagName == "MARK") {
      //       // // var $current = $(current);
      //       // // if ($.trim($current.text()) == "") {
      //         event.preventDefault();
      //         this.caret.setBefore(current);
      //         this.caret.setOffset(this.caret.getOffset() - 1);
      //         return false;
      //       // }
      //     }
      //     // console.log(this.keydown.current.tagName || "NONE");
      //   }
      // }, this));

      $insertComment.on("click", $.proxy(function(event) {
        this.inline_commenting.highlightText();
      }, this));

      // $editor.on("DOMNodeRemoved", $.proxy(function(event) {
      //   var $target = $(event.target);
      //   if ($target.is("mark")) {
      //     // var $dup = $target.clone();
      //     // this.selection.get()
      //     // this.range.deleteContents();
      //     // this.range.insertNode($dup.get(0));
      //     // this.caret.setBefore($dup);
      //   }
      // }, this));
    },

    highlightText: function() {
      this.selection.get();
      var $wrapper = $(this.selection.wrap("mark")).attr("data-comment-id", nextCommentId);;
      // var $wrapper = $("<mark>\u200B</mark>").attr("comment-id", nextCommentId);
      // this.range.insertNode($wrapper.get(0));
      nextCommentId++;
    }
  };

};
