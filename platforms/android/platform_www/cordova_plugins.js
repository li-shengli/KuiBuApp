cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-camera.Camera",
    "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "Camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverOptions",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverOptions"
    ]
  },
  {
    "id": "cordova-plugin-camera.camera",
    "file": "plugins/cordova-plugin-camera/www/Camera.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "navigator.camera"
    ]
  },
  {
    "id": "cordova-plugin-camera.CameraPopoverHandle",
    "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
    "pluginId": "cordova-plugin-camera",
    "clobbers": [
      "CameraPopoverHandle"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-wechat-v3.Wechat",
    "file": "plugins/cordova-plugin-wechat-v3/www/wechat.js",
    "pluginId": "cordova-plugin-wechat-v3",
    "clobbers": [
      "Wechat"
    ]
  },
  {
    "id": "cordova-plugin-qrcodejs.QRCodeJS",
    "file": "plugins/cordova-plugin-qrcodejs/www/qrcodejsPlugin.js",
    "pluginId": "cordova-plugin-qrcodejs",
    "clobbers": [
      "cordova.plugins.qrcodejs"
    ]
  },
  {
    "id": "cordova-plugin-qrcodejs.QRCcodeJSImpl",
    "file": "plugins/cordova-plugin-qrcodejs/www/qrcode.js",
    "pluginId": "cordova-plugin-qrcodejs",
    "runs": true
  },
  {
    "id": "cordova-plugin-qrcodejs.QRCcodeJSProxy",
    "file": "plugins/cordova-plugin-qrcodejs/www/qrcodejsPluginProxy.js",
    "pluginId": "cordova-plugin-qrcodejs",
    "runs": true
  },
  {
    "id": "cordova-plugin-barcodescanner.BarcodeScanner",
    "file": "plugins/cordova-plugin-barcodescanner/www/barcodescanner.js",
    "pluginId": "cordova-plugin-barcodescanner",
    "clobbers": [
      "cordova.plugins.barcodeScanner"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-camera": "4.0.3",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-wechat-v3": "1.0.6",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-qrcodejs": "1.0.0",
  "cordova-plugin-barcodescanner": "0.7.4"
};
// BOTTOM OF METADATA
});