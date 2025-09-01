module Jekyll
  class PhotoGalleryGenerator < Generator
    safe true
    priority :high

    def generate(site)
      # Create a hash to store photos by game date
      photos_by_date = {}
      
      # Process all static files in the games directory
      site.static_files.each do |file|
        # Check if file is in games directory and is an image
        if file.relative_path.match?(/^\/assets\/images\/games\/(\d{4}-\d{2}-\d{2})\/.*\.(jpg|jpeg|png|gif)$/i)
          match = file.relative_path.match(/^\/assets\/images\/games\/(\d{4}-\d{2}-\d{2})\/(.*)$/i)
          if match
            date = match[1]
            filename = match[2]
            
            photos_by_date[date] ||= []
            photos_by_date[date] << {
              'path' => file.relative_path,
              'filename' => filename,
              'basename' => File.basename(filename, File.extname(filename))
            }
          end
        end
      end
      
      # Sort photos within each date by filename
      photos_by_date.each do |date, photos|
        photos.sort_by! { |photo| photo['filename'] }
      end
      
      # Make this data available to templates
      site.data['game_photos'] = photos_by_date
    end
  end
end
