formEventHelper = {
    init: function (options) {
        var event = new formEvent(options);
        event.begin();
        return event;
    },
    uninit: function (id) {
        var event = formEvent.get(id);
        event.stop();
    }
}

formEvent = function (options) {
    var that = this;
    this.id = "formEvent";
    if (options)
        options = {};
    else {
        if (options.id)
            this.id = options.id;
    }
    var tmp = formEvent.get(this.id);
    if (tmp) {
        that = tmp;
        return that;
    }
        
    this.event = new controlevent(options);
    return that;
}

formEvent.prototype.begin = function () {
    this.event.begin();
}

formEvent.prototype.stop = function () {
    this.event.uninit();
    delete formEvent.list[this.id];
}

formEvent.get = function (id) {
    return id === undefined
    ? formEvent.list
    : formEvent.list[id];
}

formEvent.list = {};