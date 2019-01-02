import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare let wx: any;
declare var require: any;
declare var Wechat: any;

var sha1 = require('sha1');

@Injectable()
export class WechatShareService {
    constructor(private http: HttpClient) { }

    // 后台获取signature
    public getWXSignature(date: number, nonce: String): any {
        var signatureString = 'jsapi_ticket=' + this.getJsapiTicket();
        signatureString = signatureString + '&noncestr='+nonce;
        signatureString = signatureString + '&timestamp='+date;
        signatureString = signatureString + '&url=http://127.0.0.1/';

        console.log ('The string for singature: ' + signatureString);
        
        const signature = sha1(signatureString);

        console.log ('The singature: ' + signature);

    }

    // 根据后台获取的数据注册config
    public configWXJs() {
        console.log ('Do Configure ... ');
        var date = parseInt(Date.now() / 1000 + '');
        var nonce = Date.now() + '';
        wx.config({
            debug: false,
            appId: "wxfa89ba9c147f198f",
            timestamp: date,
            nonceStr: nonce,
            signature: this.getWXSignature(date, nonce),
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        });

        return true;
    }
    // 对分享信息进行处理，并注册分享函数
    public getShareDataAndReady(title, imgUrl, desc, slug) {

        let shareTitle = title ? title : '自定义title';
        let shareImg = imgUrl ? imgUrl : "默认图片";
        let shareDesc = desc ? desc : '默认描述';
        let link = location.href;

        if (this.configWXJs()) {
            wx.ready(function () {
                console.log ('Share to wechat ... ');
                wx.updateAppMessageShareData({ title: shareTitle, desc: shareDesc, link: link , imgUrl: shareImg, sucess: function() {} });  // 分享微信
                wx.updateTimelineShareData({ title: shareTitle, desc: shareDesc, link: link , imgUrl: shareImg, sucess: function() {}});    // 分享到朋友圈
            });
        }
        
  }

  private shareIsReady(target: string) {
      console.log ("ready to share to " + target);
  }

  private getJsapiTicket() {
    var expireDate = localStorage.getItem('js_api_token_expireDate');
      
    if (expireDate == null || (Date.now() - parseInt(expireDate) <= 0) ) {
        var headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

        // const access_token_data = await this.http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxfa89ba9c147f198f&secret=eb0de94f65b35818b22313aa8b1b0877', {headers}).toPromise();
        // .then(result => {
        //     console.log('From Promise:', result);
        // });
        //const access_token = access_token_data['access_token'];
        const access_token = '16_x6zQIesUU5wmT2CkT2EmXUzRO8OMk2ON8qdvGsKlOJmUjVhyJ2yPLo6hnvBICPPBtR2ni6k1z7cuzrGsK96cyjmkJYzb12zf4F9AMiLXVr2HpKLp9ih7QuuA9VlK76KBdUl5HXDLxtyYDTO9KTAiAJATCJ';
        console.log('access_token = ' + access_token);

        headers = new HttpHeaders().set("Access-Control-Allow-Origin", "https://api.weixin.qq.com/cgi-bin/ticket/getticket");
        // const jsapi_ticket_data = await this.http.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi', {headers}).toPromise().then(result => {
        //    console.log('From Promise:', result);
        // });
        // console.log('jsapi_ticket_data = ' + jsapi_ticket_data['ticket']);

        // localStorage.setItem('jsapi_ticket', jsapi_ticket_data['ticket']);
        localStorage.setItem('jsapi_ticket', 'HoagFKDcsGMVCIY2vOjf9hj5NR9Yxy05ixHg-Fyff9S9SUEfjyu9IjEPY175P7ODdOlDsWweDfnVpcKJnhoP1Q');
        localStorage.setItem('jsapi_ticket_expireDate', Date.now() + 7200000 +'');
        
    }
      return localStorage.getItem('jsapi_ticket');
  }

  public doShare(title, imgUrl, desc, slug) {
    
        Wechat.share({
            text: "This is just a plain string",
            scene: Wechat.Scene.SESSION   // share to Timeline
        }, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
  }
  
}


