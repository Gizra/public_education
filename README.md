Public Education - Client side
================

Copy Grunt file configuration:

```cp Gruntfile.example.js Gruntfile.js```

To enable Foursquare functionality, replace ```client_id``` and ```client_secret``` in Gruntfile.js with your Foursquare client ID/secret.

Run build script:

```sh build.sh```

Once installed, there are several ways to run PE:

1. iPhone emulator (requires ios-sim - "brew install ios-sim" if not there):

```phonegap run ios```


2. Android emulator (requires Android dev tools):

```phonegap run android```

3. XCode (enables running on iPhone/iPad emulators as well as connected devices):

```phonegap build ios```
Start XCode, browse to the <src>/platforms/ios and open PublicEducation.xcodeproj

4. Browser
```grunt server```
