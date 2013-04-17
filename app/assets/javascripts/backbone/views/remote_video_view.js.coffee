class WysiwtfEditor.Views.RemoteVideoView extends Backbone.View

  template: JST['backbone/templates/remote_video']

  initialize: (options) ->
    @editor = options.editor
    @editor.modalInit('Insert Video', @template(), 500, @_on_popup)

  insert_video: (embed_video_url) ->
    embed_html = "<iframe width=\"640\" height=\"360\" src=\"#{embed_video_url}\" frameborder=\"0\" allowfullscreen></iframe>"
    @editor.insertHtml(embed_html)
    @editor.modalClose()

  _on_popup: (arg1, arg2, arg3, arg4) =>
    @form = @el = @editor.modal.find('.js-remote-video')
    @url_input = @form.find('.js-url')
    @form.submit(@_on_insert)

  _on_insert: (event) =>
    event.preventDefault()
    embed_video_url = @url_input.val().replace('watch?v=', 'embed/')
    @insert_video(embed_video_url)


