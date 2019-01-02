

# cordova-plugin-wechat-v3
https://www.npmjs.com/package/cordova-plugin-wechat-v3

A cordova plugin 

> 支持微信支付、授权、分享等

> 支持微信小程序的分享与打开 

# Warning

插件fork from https://github.com/xu-li/cordova-plugin-wechat
在此基础上进行修改的版本
- 1、新增小程序方面的修改
- 2、andorid 读写缓存文件避免授权等修改
- 3、其他小问题


# Example

See [cordova-plugin-wechat-example](https://github.com/xu-li/cordova-plugin-wechat-example)

# Install

1. ```ionic cordova plugin add cordova-plugin-wechat-v3  --variable wechatappid=YOUR_WECHAT_APPID```, or using [plugman](https://npmjs.org/package/plugman), [phonegap](https://npmjs.org/package/phonegap), [ionic](http://ionicframework.com/)

2. ```ionic cordova build ios``` or ```cordova build android```

3. (iOS only) if your cordova version <5.1.1,check the URL Type using XCode

# Usage

## Check if wechat is installed
```Javascript
Wechat.isInstalled(function (installed) {
    alert("Wechat installed: " + (installed ? "Yes" : "No"));
}, function (reason) {
    alert("Failed: " + reason);
});
```

## Authenticate using Wechat
```Javascript
var scope = "snsapi_userinfo",
    state = "_" + (+new Date());
Wechat.auth(scope, state, function (response) {
    // you may use response.code to get the access token.
    alert(JSON.stringify(response));
}, function (reason) {
    alert("Failed: " + reason);
});
```

## Share text
```Javascript
Wechat.share({
    text: "This is just a plain string",
    scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
```

## Share media(e.g. link, photo, music, video etc)
```Javascript
Wechat.share({
    message: {
        title: "Hi, there",
        description: "This is description.",
        thumb: "www/img/thumbnail.png",
        mediaTagName: "TEST-TAG-001",
        messageExt: "这是第三方带的测试字段",
        messageAction: "<action>dotalist</action>",
        media: "YOUR_MEDIA_OBJECT_HERE"
    },
    scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
```

### Share link
```Javascript
Wechat.share({
    message: {
        ...
        media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm"
        }
    },
    scene: Wechat.Scene.TIMELINE   // share to Timeline
}, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
```

## Send payment request
```Javascript
// See https://github.com/xu-li/cordova-plugin-wechat-example/blob/master/server/payment_demo.php for php demo
var params = {
    partnerid: '10000100', // merchant id
    prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
    noncestr: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
    timestamp: '1439531364', // timestamp
    sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
};

Wechat.sendPaymentRequest(params, function () {
    alert("Success");
}, function (reason) {
    alert("Failed: " + reason);
});
```

## Choose invoices from card list
```Javascript
//offical doc https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1496561749_f7T6D
var params = {
    timeStamp: '1510198391', // timeStamp
    signType: 'SHA1', // sign type
    cardSign: 'dff450eeeed08120159d285e79737173aec3df94', // cardSign
    nonceStr: '5598190f-5fb3-4bff-8314-fd189ab4e4b8', // nonce
};

Wechat.chooseInvoiceFromWX(data,function(data){
    console.log(data);
},function(){
    alert('error');
})
```

## openMiniPrograme
```Javascript
    let params = {
        scene: 0,
        message: {}
      };
      params.message.username = 'xxxxx';
      params.message.path = '/pages/index/index';
      params.message.programType = window.Wechat.ProgramType.dev;
  Wechat.openMiniPrograme(data,function(data){
    console.log(data);
},function(){
    alert('error');
})
```

# LICENSE

[MIT LICENSE](http://opensource.org/licenses/MIT)
