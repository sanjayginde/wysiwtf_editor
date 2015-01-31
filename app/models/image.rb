class Image < ActiveRecord::Base

  # Probably need to change this
  IMAGE_URL_TO_ID_REGEX = /\/system\/images\/(\d+)\//i

  has_attached_file :image, :styles => { :thumb => "50x50#", :small => "100x100", :medium => "300x300" },
      :convert_options => {
      :thumb => "-background white -gravity center -extent 80x80",
      :medium => "-background white -gravity center -extent 140x140"
    }

  validates_attachment :image,
    :presence => true,
    :content_type => { :content_type => ['image/jpeg', 'image/png', 'image/pjpeg', 'image/gif'] }, #  :message => "Image must be either a JPEG, PNG, or GIF"
    :size => { :in => 0..1.megabytes, :message => "Image must be less than 10 megabytes" }

  def self.find_from_image_url(url)
    id = self.parse_id_from_url(url)

    id.present? ? find_by_id(id) : nil
  end

  def self.parse_id_from_url(url)
    matchdata = IMAGE_URL_TO_ID_REGEX.match(url)
    matchdata.present? ? matchdata[1].to_i : nil
  end

end
