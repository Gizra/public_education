Public Education - Client side
================

Installation and deployment on Android Emulator.
----------------
```
# Create a phonegap project inside the Public education project.
phonegap create . com.gizra.pubedu PubicEducation

# Install Phonegap plugins.
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

# Install dependencies.
npm install
bower install

# Copy Grunt file configuration.
cp Gruntfile.example.js Gruntfile.js

# Create a FourSquare app in https://foursquare.com/developers/apps
# And add the app's client ID and secret to your Gruntfile.js under the
# "FOURSQUARE" constant.
#
# Build into www folder.
grunt build

# Run android platform.
phonegap run android

#
# OR
#

# Run ios platform.
# You may need to install ios-sim by "brew install ios-sim"
phonegap run ios

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

