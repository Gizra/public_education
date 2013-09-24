public_education
================

```
phonegap create test com.gizra.pubedu PubicEducation
cd test
# Install Phonegap plugins
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git
# Build android platform
phonegap local build android
cd platforms/android
sudo rm -r assets
git clone git@github.com:Gizra/public_education.git assets
cd assets
git checkout 16
bower install
# Update config.xml to allow access to other domains
cd ../res/xml
cp -f /var/config.xml config.xml

```

```
sudo npm install -g yo
npm install
bower install
grunt server
```

