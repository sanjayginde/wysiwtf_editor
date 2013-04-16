module ImagesHelper

  def redactor_index_image_as_json(image)
    { :image => image.image.url, :thumb => image.image.url(:small), :title => image.image_file_name }
  end

  def redactor_upload_image_as_json(image)
    { :filelink => image.image.url }
  end

end