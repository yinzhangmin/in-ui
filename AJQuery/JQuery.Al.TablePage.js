/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/

//$.AJQuery.tablePage = function () {
//    return {
//        init: function (options) {
//            var _options = {

//            };
//            $.extend(_options, options);
//            return _options;
//        }
//    }
//}();

$.AJQuery.tablePage = function () {
    var InitOptions = function (o) {
        o.items = o.Obj.find(".i-t .i");
        o.Contents = o.Obj.find(".i-c .i");
        o.SelectClass = "select";
        SetSelect(o, 0);
        o.Select = function (index) {
            SetSelect(o, index);
        };
        if (o.ContextBorder)
            o.Obj.find(".i-c").addClass("border");
        o.Obj.addClass(o.Style);
        o.Obj.find(".i-t-c").addClass(o.Position);
        InitEvent(o);
        _oalData.push(o);
    };
    var SetSelect = function (o, index) {
        $(o.items[index]).addClass(o.SelectClass);
        $(o.Contents[index]).css({ display: "block" });
    };
    var SetOptions = function (options) {
        var o = {
            IsAuto: { IsEnable: true, Time: 5000 },
            SelectIndex: 0,
            Position: "left",
            Style: "tablepage",
            isHover: false,
            ContextBorder: true,
            click: null,
            load: null
        };
        $.extend(o, options);
        InitOptions(o);
    };
    var InitEvent = function (o) {
        o.items.click(function () {
            o.items.removeClass(o.SelectClass);
            o.Contents.hide();
            $(this).addClass(o.SelectClass);
            $(o.Contents[$(this).index()]).show()
            if (o.click != null)
                o.click($(this));
        });
        if (o.isHover) {
            o.items.hover(function () {
                o.items.removeClass(o.SelectClass);
                o.Contents.hide();
                $(this).addClass(o.SelectClass);
                $(o.Contents[$(this).index()]).show()
                if (o.click != null)
                    o.click($(this));
            });
        }
    };
    var InitObject = function () {
        if (typeof (_oalData) == "undefined")
            _oalData = [];
    };
    return {
        Init: function (options) {
            InitObject();
            SetOptions(options)
        },
        Get: function (id) {
            return _oalData;
        }
    }
}();