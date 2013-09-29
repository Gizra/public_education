Public Education - Client side
================

Installation and deployment on Android Emulator.
----------------
```
# Create new phonegap project.
cd ~
phonegap create pg-public-education com.gizra.pubedu PubicEducation
cd pg-public-education
# Remove www folder. Folder will be generated again git clone.
rm -r www
cd ..

# Clone repo and move to phonegap project folder.
git clone git@github.com:Gizra/public_education.git
cd public_education
cp -r . ~/pg-public-education

# Install Phonegap plugins.
cd ../pg-public-education
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

# Install dependencies.
npm install
bower install

# Copy Grunt file configuration.
cp Gruntfile.example.js Gruntfile.js

# Remove node modules folder as it breaks building process
rm -rf node_modules/

# Build android platform.
phonegap local build android

# Install the application.
phonegap local install android

```

Installation (without using the emulator).
----------------
```
# Install packages
npm install
bower install
# Copy Grunt file configuration.
cp Gruntfile.example.js Gruntfile.js
# Create a FourSquare app in https://foursquare.com/developers/apps
# And add the app's client ID and secret to your Gruntfile.js under the
# "FOURSQUARE" constant.
grunt server

```

