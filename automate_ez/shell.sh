#!/bin/sh

: '
- A shell script to convert an ejs view for fast prototyping using live-server
- Uses render_script.js as dependency [Can be eliminated if ejs is installed globally]
'

source="$HOME/WAD-Group-15/views/sharepage"
destination="$HOME/WAD-Group-15/testinglive_frontend"

while inotifywait --recursive --event close_write "$source"
do
	sass "$source/scss/style.scss" "$source/css/style.css"
	cp -rf "$source/css" "$destination/"
	cp -rf "$source/js" "$destination/"
	cp -rf "$source/assets" "$destination/"
	node render_script.js > "$destination/index.html"
	grep -rl '/sharepage' "$destination" | xargs sed -i 's|/sharepage|\.|g'
done
