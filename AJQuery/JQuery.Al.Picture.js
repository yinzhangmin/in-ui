/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/

var AlPicture = function () {
    // 初始化参数
    var InitOptions = function (o) {
        o.Id = _oalData.length;
        o.Obj.data("index", o.index);
        o.Width = o.Obj.width();
        o.isNext = true;
        o.Item = o.Obj.find(".i");
        o.ItemClass = ".i";
        o.Item.css({ "width": o.Width }).parent().css({ "width": o.Item.length * o.Width });
        o.Item.removeClass("select").eq(0).addClass("select", true);
        _oalData.push(o);
        SetNumber(o);
        InitEvent(o);
        InitTime(o);
        SetNumberAction(o, 0);
    };
    // 设置参数
    var SetOptions = function (options) {
        var o = {
            IsAuto: { IsEnable: true, Time: 5000 },
            FadeInTime: 800,
            Effect: "slide", //slide,fadeOut
            IsMouseStop: true,
            Cycle: false,
            Button: true,
            NButton: true
        };
        $.extend(o, options);
        InitOptions(o);
    };
    var Execut = function (e, index, event) {
        switch (e.Effect) {
            case "fadeOut":
                e.Item.eq(index).css({ " opacity:": 0.3 }).stop().fadeOut(function () {
                    _oal.Item.removeClass("select").eq(index + 1).addClass("select");
                    _oal.Item.eq(index + 1).fadeIn();
                    if (event != undefined)
                        event();
                });
                break;
            case "slide":
                e.Item.parent().stop().animate({ "margin-left": -(index * e.Width) }, e.FadeInTime, function () {
                    e.Item.removeClass("select").eq(index).addClass("select");
                    if (event != undefined)
                        event();
                });
                break;
        }
    };
    var SetNumber = function (o) {
        var html = '<div class="i-c"><div class="n-i"></div></div>';
        o.Number = o.Obj.append(html).find(".i-c .n-i").data("index", o.index)
        o.Item.each(function () {
            o.Number.append(" <span></span>");
        });
        o.Number.width(o.Item.length * 15);
        if (!o.NButton) {
            o.Number.hide();
        }
    };
    var SetNumberAction = function (o, i) {
        o.Number.find("span").removeClass("action").eq(i).addClass("action");
        if (o.Button) {
            switch (i) {
                case 0:
                    o.PrevBtn.hide();
                    o.NextBtn.show();
                    break;
                case o.Item.length - 1:
                    o.PrevBtn.show();
                    o.NextBtn.hide();
                    break;
                default:
                    o.PrevBtn.show();
                    o.NextBtn.show();
                    break;
            }
        }
    };
    var GetEffect = function () {
        var k = ["fold", "slice", "slide", "shutter", "grow"]
        return k[Math.floor(Math.random() * (k.length))];
    };
    var GetSelectIndex = function (o) {
        return o.Item.parent().find(o.ItemClass + ".select").index();
    };
    var InitEvent = function (o) {
        var html = '<div class="prev btn"><</div><div class="next btn">></div>';
        o.Obj.append(html);
        o.PrevBtn = o.Obj.find(".prev").hide();
        o.NextBtn = o.Obj.find(".next");
        if (!o.Button) {
            o.NextBtn.hide();
            o.PrevBtn.hide();
        }
        o.NextBtn.click(function () {
            var index = GetSelectIndex(o) + 1;
            SetNumberAction(o, index)
            CloseTime(o);
            Execut(o, index, function () {
                InitTime(o);
            });
        });
        o.PrevBtn.click(function () {
            var index = GetSelectIndex(o) - 1;
            SetNumberAction(o, index)
            CloseTime(o);
            Execut(o, index, function () {
                InitTime(o);
            });
        });
        o.Number.find("span").on("tap", function () {
            CloseTime(o);
            var index = $(this).index();
            SetNumberAction(o, index);
            Execut(o, index, function () {
                InitTime(o);
            });
        });
        if (o.IsMouseStop) {
            o.Obj.find(o.ItemClass).hover(function () {
                CloseTime(o);
            }, function () {
                InitTime(o);
            });
        }
    };
    var InitTime = function (o) {
        if (o.Item.length == 1)
            return;
        if (o.IsAuto.IsEnable) {
            CloseTime(o);
            o.Interval = setInterval(function () {
                var index = GetSelectIndex(o);
                if (o.isNext) {
                    ++index;
                    if (index == o.Item.length - 1) {
                        o.isNext = false;
                    }
                } else {
                    --index;
                    if (index == 0) {
                        o.isNext = true;
                    }
                }
                SetNumberAction(o, index)
                Execut(o, index, function () {
                    InitTime(o);
                });
            }, o.IsAuto.Time);
        }
    };
    var CloseTime = function (o) {
        clearInterval(o.Interval);
    };
    var InitObject = function () {
        if (typeof (_oalData) == "undefined")
            _oalData = [];
    };
    return {
        Init: function (options) {
            InitObject();
            SetOptions(options);
        },
        Get: function () {
            return _oalData;
        }
    }
}();