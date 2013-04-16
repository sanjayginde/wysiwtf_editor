if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

(function($) {

  var insert_video = function() {
    var embed = '<iframe width="640" height="360" src="' + $('#redactor_remote_video_url').val() + '" frameborder="0" allowfullscreen></iframe>'
    this.insertHtml(embed)
  };

  var on_popup = function() {
    // var $form = $('#insert_remote_video_form');
    // var callback = $.proxy(insert_video, this);
    // $('#insert_remote_video_btn').click($.proxy(insert_video, this));

    this.insertHtml('<iframe width="640" height="360" src="http://www.youtube.com/watch?v=YDqdEiQm2XU" frameborder="0" allowfullscreen></iframe>');

    // $('#redactor_modal .redactor_clip_link').each($.proxy(function(i,s) {
    //   $(s).click($.proxy(function()
    //   {
    //     this.insertClip($(s).next().html());
        
    //     return false;
        
    //   }, this));
        
    // }, this));
    
    
    // this.saveSelection();
    // this.setBuffer();
  };


RedactorPlugins.remotevideo = {
 


  init: function() {
    // var callback = $.proxy(, this);
    // var callback = $.proxy(on_popup, this);
    this.addBtnAfter('image', 'remotevideo', 'Insert Video', function(obj) {
      obj.modalInit('Insert Video', '#remotevideomodal', 500, $.proxy(on_popup, obj));
    });
  },

}

})(jQuery);
