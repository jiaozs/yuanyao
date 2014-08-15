var hostUrl = "http://localhost:9000/music";
$(function () {
  hostUrl = $("#server_url").text();
    var list = new MusicList();
    $(".btn-share").bind("click",function(){
        list.shareClick(this);
    });
    $(".btn-play").bind("click",function(){
        list.playClick(this);
    });
    $(".btn-reg").bind("click",function(){
        list.subscribe(this);
    });
    
    $(".form-subscribe-container").each(function() {
    var $step1 = $(this).children('.step1');
    var $step2 = $(this).children('.step2');
    var $step1btn = $step1.find(".btn-info");
    var $step2btn = $step2.find(".btn-subscribe-submit");

    onInput($step1.find("input"), function(event) {
      showValid($step1[0], isCellphone(this))
    });

    $step1btn.on("click", function() {
      // invoke
      var mobile = $step1.find("input").val();
      var url1 = $step1.attr('data-url');
      doCommonReq(url1, "post", {
        mobile : mobile
      }, function() {
        alert("短信验证码已经发送，请注意查收");
        turnStep2(mobile, $step1, $step2);
      }, function() {
        alert("系统繁忙，请稍后再试");
      });
    });

    $step2btn.on("click", function() {
      var mobile = $step2.find("[name='phoneNum']").text();
      var validateCode = $step2.find("input").val();
      var musicId = $step1.attr('data-id');

      var url2 = $step2.attr('data-url');
      if (!validateCode || validateCode == '') {
        alert("请输入手机验证码");
        return;
      }
      doCommonReq(url2, "post", {
        musicId : musicId,
        code : validateCode,
        mobile : mobile
      }, function() {
        alert("恭喜您订购成功并为该歌曲投上一票");
        returnStep1($step1, $step2);
      }, function(data) {
        if (data.status == 2000002) {
          alert("订购失败，详情:" + data.message);
        } else {
          alert("系统繁忙，请稍后再试");
        }
      });
    })
  });
 // 重新获取验证码
  $(".btn-reget-validcode").click(function() {
    var $step2 = $(this).parent().parent();
    var mobile = $step2.find("[name='phoneNum']").text();
    var url1 = $(this).attr('data-url');
    doCommonReq(url1, "post", {
      mobile : mobile
    }, function() {
      alert("短信验证码已经发送，请注意查收");
    }, function() {
      alert("系统繁忙，请稍后再试");
    });
  });

  // 返回上一步
  $(".btn-subscribe-cancel").click(function() {
    var $step2 = $(this).parent().parent();
    var $step1 = $step2.parent().find(".step1");
    returnStep1($step1, $step2);
  })
});

var MusicList = function(){
    this.preNode = null;
}

MusicList.prototype = {
    shareClick:function(node){
       var self = this;
       var liNode = $(node).parent().parent().parent().parent();
       var songId = liNode.attr("song-id");
       var shareContainer = liNode.find(".share-content");
       var hide = false;
       if(!shareContainer.is(":hidden")){
           hide = false;
       }else{
           hide = true;
       }
       if(this.preNode != null && !this.preNode.is(":hidden")){
            this.preNode.hide();
       }
       var songName = liNode.find(".text").text();
        liNode.find(".sinaBtn").bind("click",function(){
          var txt = encodeURIComponent("我正在#天上西藏门户#听《" + songName + "》,快上www.ctibet.cn,和我一起来听听吧!(分享自@天上西藏网站) ");
           self.shareSina(hostUrl + songId,txt,"");
       });
        liNode.find(".qZoneBtn").bind("click",function(){
          var txt = encodeURIComponent("我正在#天上西藏门户#听《" + songName + "》,快上www.ctibet.cn,和我一起来听听吧!(分享自@天上西藏网站) ");
           self.shareQQZone(hostUrl + songId,txt,"")
       });
        liNode.find(".tecentBtn").bind("click",function(){
          var txt = encodeURIComponent("我正在#天上西藏门户#听《" + songName + "》,快上www.ctibet.cn,和我一起来听听吧!(分享自@天上西藏网站) ");
            self.shareTecent(hostUrl + songId,txt,"")
        });
        if(!hide){
            shareContainer.hide();
        }else{
            shareContainer.show();
        }
       this.preNode = shareContainer;
    },
    playClick:function(node){
        var self = this;
        var liNode = $(node).parent().parent().parent().parent();
        var songId = liNode.attr("song-id");
        window.open(songId);
    },
    shareContent:function(){
        var shareNode = $("");
        return shareNode;
    },
    shareSina:function(shareUrl,shareTitle,sharePic){
        var share = {
            url:shareUrl,
            title:shareTitle,
            pic:sharePic
        }
        var sinaLink = 'http://service.t.sina.com.cn/share/share.php?url='
            +encodeURIComponent(share.url)+'&title='+share.title+'&pic='+share.pic;
        this.openDialog(sinaLink,600,500);
    },
    shareQQZone:function(shareUrl,shareTitle,sharePic){
        var share = {
            url:shareUrl,
            title:shareTitle,
            pic:sharePic
        }
        var sinaLink = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+encodeURIComponent(share.url);
        this.openDialog(sinaLink,600,500);
    },
    shareTecent:function(shareUrl,shareTitle,sharePic){
        var share = {
            url:shareUrl,
            title:shareTitle,
            pic:sharePic
        }
        var sinaLink = 'http://v.t.qq.com/share/share.php?url='+encodeURIComponent(share.url)+'&title='+share.title;
        this.openDialog(sinaLink,600,500);
    },
    openDialog:function(url,width,height){
        return window.showModalDialog(url, window, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;resizable:no;scroll:no;status:no");
    },
    subscribe:function(node){
      var liNode = $(node).parent().parent().parent().parent();
        var songId = liNode.attr("dataprice");
      $("#myModal").modal({
        "backdrop" : "static",
        "show" : true
      });
      var preview = $("#mms-preview");      
      $(".mmsid", preview).text(liNode.attr('datammsid'));
      $(".name", preview).text(liNode.attr('dataname'));
      $(".singer", preview).text(liNode.attr('datasinger'));
      $(".price", preview).text(liNode.attr('dataprice'));

      $(".form-subscribe-container .step1").attr('data-id', liNode.attr('dataid'));
    }
}

function closeSubscribe() {
  $("#myModal").modal('hide');
}

function turnStep2(mobile, $step1, $step2) {
  $step2.find("[name='phoneNum']").text(mobile);
  $step1.hide();
  $step2.show();
}

function returnStep1($step1, $step2) {
  $step2.find("[name='phoneNum']").empty();
  $step2.find("input").val('');
  $step1.find("input").val('');
  $step1.show();
  $step2.hide();
}
var showValid = function(el, valid) {
  var $TmsgEl = $(el).find(".text-success"), $FmsgEl = $(el).find(
      ".text-error"), $btn = $(el).find(".btn-info");
  if (valid) {
    $TmsgEl.show();
    $FmsgEl.hide();
    $btn.removeAttr('disabled').removeClass('disabled');
  } else {
    $TmsgEl.hide();
    $FmsgEl.show();
    $btn.attr('disabled', 'disabled').addClass('disabled');
  }
}
var isCellphone = function(el) {
  return el ? (((/^1[3|4|5|8][0-9]\d{8}$/.test($(el).val()))) ? true : false)
      : false;
}
function onInput(target, fn) {
  $(target).on('input', fn);

  // for ie
  if (document.all) {
    $(target).each(function() {
      var that = this;
      if (this.attachEvent) {
        this.attachEvent('onpropertychange', function(e) {
          if (e.propertyName != 'value')
            return;
          $(that).trigger('input');
        });
      }
    })
  }
}

