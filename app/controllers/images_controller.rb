class ImagesController < ApplicationController
  include ImagesHelper

  def redactor_index
    render :json => Image.all.map{ |image| redactor_index_image_as_json(image) }
  end

  def redactor_upload
    @image = Image.new

    @image.image = params[:file]
    if @image.save
      render :json => redactor_upload_image_as_json(@image)
    else
      render :json => { :error => @image.errors.full_messages }
    end
  end

end
