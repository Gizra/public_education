public_education
================

```
# Create new phonegap project and remove www folder
phonegap create test com.gizra.pubedu PubicEducation
cd test
rm -r www
cd ..

# Clone repo and move to phonegap project folder
git clone git@github.com:Gizra/public_education.git
cd public_education
cp -r . /var/test

# Install Phonegap plugins
cd ../test
git checkout 16
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git

# Install dependencies
bower install

# Build android platform
phonegap local build android

# Install the application
phonegap local install android

```

