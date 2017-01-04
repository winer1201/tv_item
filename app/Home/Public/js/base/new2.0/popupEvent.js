var popupEvent = function (options) {
    controlevent.call(this, options);
    if (options.prototype)
        return;
}

popupEvent.prototype = new controlevent({ prototype: true });