var RollTool = function(options)
{
    this.id = Guid.NewGuid().ToString();
    this.MyMar = null;
}

RollTool.prototype.ctr_start="d_roll_start";
RollTool.prototype.ctr_end = "d_roll_end";
RollTool.prototype.ctr_parent = "d_roll_parent";
RollTool.prototype.ctrStart=null;
RollTool.prototype.ctrEnd = null;
RollTool.prototype.ctrParent = null;
RollTool.prototype.speed=10;
RollTool.prototype.times = 3;

RollTool.prototype.init = function (options) {
    var that = this;
    if (options) {
        if (options.start)
            that.ctr_start = options.start;
        if (options.end)
            that.ctr_end = options.end;
        if (options.parent)
            that.ctr_parent = parent;

        if (options.speed)
            that.speed = options.speed;
        if (options.times)
            that.times = options.times;
    }
    that.ctrStart = document.all(that.ctr_start);
    that.ctrEnd = document.all(that.ctr_end);
    that.ctrParent = document.all(that.ctr_parent);
}

RollTool.prototype.Start=function(){
    var that = this;
    if (!that.ctrStart) {
        console.log("ctrStart not exists!");
        return;
    }
    if (!that.ctrEnd) {
        console.log("ctr_end not exists!");
        return;
    }

    that.ctrEnd.innerHTML = that.ctrStart.innerHTML;
    var len = that.ctrStart.offsetWidth;
    var ntimes = 0;

    function Marquee() {
        if (len > 0) {
            that.ctrParent.scrollLeft++;
            len--;
        }
        else {
            console.log("id :: " + that.id + " func - clearInterval");
            clearInterval(that.MyMar);
            that.ctrParent.scrollLeft = 0;
            len = that.ctrStart.offsetWidth;
            ntimes++;
            if (ntimes < that.times && that.MyMar != null) {
                setTimeout(function () {
                    console.log("id :: " + that.id + " func - setInterval");
                    that.MyMar = setInterval(Marquee, that.speed);
                }, 1000)
            }
            else {
                //MyMar = null;
            }

        }
    }
    console.log("id :: " + that.id + " func - setInterval");
    that.MyMar = setInterval(Marquee, that.speed);
}
RollTool.prototype.Stop=function(){
    var that = this;
    if (!that.MyMar) return;

    console.log("id :: " + that.id + " func - clearInterval");
    clearInterval(that.MyMar);
    //MyMar = null;
}
