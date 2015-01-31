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
      if (this.utils.browser('mozilla')) {
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

      $editor.on('keyup', function(event) {
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

      $editor.on('keydown', function(event) {
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
