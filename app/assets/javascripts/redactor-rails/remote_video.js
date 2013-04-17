if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

(function($) {

  RedactorPlugins.remote_video = {
    init: function() {
      this.addBtnAfter('image', 'remote_video', 'Insert Video', function(obj) {
        new WysiwtfEditor.Views.RemoteVideoView({editor: obj});
      });
    }
  };

})(jQuery);
