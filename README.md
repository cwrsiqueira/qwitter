# Qwitter (qwitter)

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


### DEPLOYING QUASAR

-- Mac Electron
quasar dev -m electron

-- Windowns Electron
quasar build -m electron
obs:
  Incluir:
  packager: {
    platform: 'win32'
  },

-- Android Cordova
quasar dev -m cordova -T android
