
if grep -q client_id Gruntfile.js
then
	echo "In order for Foursquare to work you need to enter the real client_id and client_secret in Gruntfile.js"
else
	echo "Foursquare ID OK"
fi

# Create a phonegap project inside the Public education project.
phonegap create . com.gizra.publiceducation PublicEducation

# Install Phonegap plugins.
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

# Install dependencies.
npm install
bower install

# Build into www folder.
grunt build

echo "use 'phonegap run ios' or 'phonegap run android'