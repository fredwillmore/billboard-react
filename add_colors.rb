require 'json'

def get_color(d)
  # TODO: make this do something more interesting than random colors
  
  channel_min = 0x33
  channel_max = 0xCC

  # Define a method to generate a random channel value
  random_channel = -> { rand(channel_min..channel_max).to_s(16).rjust(2, '0') }

  # Generate random values for each channel
  red = random_channel.call
  green = random_channel.call
  blue = random_channel.call

  "#{red}#{green}#{blue}"
end

(1940..2015).each do |year|
  in_file_path = "./src/data/chart_tracks/#{year}.json"
  out_file_path = "./src/data/chart_tracks_color/#{year}.json"
  parsed_data = JSON.parse(File.read(in_file_path))

  parsed_data.each { |d| d['color'] = get_color(d)}
  File.write(out_file_path, JSON.dump(parsed_data))
end