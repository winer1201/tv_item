function androidKeyDown(key) {
    var e = {};
    e.keyCode = key;
    myvideoHelper.keyDownFn(e);
}

var myvideoHelper = {
    playObj:null,
    isPlay:false,
    init: function (player) {
        var that = this;
        this.playObj = player;
        document.onkeydown = function (e) {
            that.keyDownFn(e);
        }
    },
    keyDownFn:function(e){
        var e = e || event;
        var currKey = e.keyCode || e.which || e.charCode;

        if (currKey != 8 && currKey != 13 && currKey != 27 && currKey != 37 && currKey != 38 && currKey != 39 && currKey != 40)
            return;

        if(currKey >= 37 && currKey<=0){

            return;
        }
        else if (currKey == 8 || currKey == 27) {//后退&esc
            this.doEsc(currKey);
        }
        else if (currKey == 13) {//回车
            this.doEntry(currKey);
        }
    },
    doEntry: function (key) {
        if (!this.isPlay)
        {
            this.playObj.play();
            this.isPlay = true;
        }            
        else
        {
            this.playObj.pause();
            this.isPlay = false;
        }            
    },
    doEsc: function (key) {
        var backUrl = this.getBackUrl();
        if (backUrl != null && backUrl != "")
            tp.util.redirectUrl(backUrl);
    },
    play:function(file){
        this.playObj.src(file);
        this.playObj.play();
        this.isPlay = true;
    },
    getBackUrl: function () {
        var backUrl = tp.util.getQueryString('backUrl');
        return backUrl;
    }
}