class CreateImage < ActiveRecord::Migration

  def change
    create_table :images do |t|
      t.timestamps
      t.attachment :image
    end
  end

end
