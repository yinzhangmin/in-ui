/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/
$.AJQuery.panel = function () {
    return {
        init: function (options) {
            var _options = {
                id: "",
                title: "",
                load: null,
                ico: null,
                info: true,
                fold: {
                    show: false,
                    value: false,
                    click: null
                },
                css: "",
                angle: false,
                target: null,
                events: [],
                content: "",
                obj: function () {
                    return $("#" + _options.id + ">.panel>.c");
                },
                clear: function () {
                    if (_options.info) {
                        _options.obj().html("<p class='no-data'>暂无数据</p>");
                    } else {
                        _options.obj().html("");
                    }
                },
                add: function (html) {
                    _options.obj().html(html);
                },
                get: function () {
                    _options.obj().find("p.no-data").remove();
                    return _options.obj();
                },
                create: function () {
                    var html = '<div class="al-panel ' + (_options.fold.value == true ? "fold " : " ") + _options.fold.show + ' " style="' + _options.css + '" id="' + _options.id + '">';
                    html += '<div class="panel">';
                    html += '<div class="t"><div class="ico"><i class="fa fa-tag" aria-hidden="true"></i></div>';
                    html += '<div class="txt">' + _options.title + '</div>';
                    html += '<div class="fn">';
                    if (_options.events != null) {
                        for (var i in _options.events) {
                            html += '<div class="i">';
                            html += '<div class="ico"><i class="' + _options.events[i].ico + '" aria-hidden="true"></i></div>';
                            html += '<div id="' + _options.id + "-" + _options.events[i].name + '" class="txt">' + _options.events[i].name + '</div>';
                            html += '</div>';
                        }
                    }
                    if (_options.angle) {
                        html += '<div class="i angle">';
                        html += '<div class="ico"><i class="fa fa-angle-up" aria-hidden="true"></i></div>';
                        html += '</div>';
                    }
                    if (_options.fold.value) {
                        html += '<div class="i fold" show="' + _options.fold.show + '">';
                        html += '<div class="ico"><i class="fa fa-angle-double-' + (_options.fold.show ? "left" : "right") + '" aria-hidden="true"></i></div>';
                        html += '</div>';
                    }
                    html += '</div></div>';
                    html += '<div class="c">';
                    if (_options.content == "" || _options.content == null) {
                        if (_options.info) {
                            html += "<p class='no-data'>暂无数据</p>";
                        }
                    } else {
                        html += _options.content;
                    }
                    html += '</div>';
                    html += '</div></div>';
                    _options.target.html(html);
                    this.click();
                    if (this.load != null)
                        this.load(_options);
                    return _options;
                },
                click: function () {
                    _options.target.find(".al-panel > .panel > .t >.fn > .i > .txt").click(function () {
                        var $this = $(this);
                        $.each(_options.events, function (x, y) {
                            if (y != null) {
                                if (y.name == $this.text()) {
                                    if (y.click != null)
                                        y.click(_options, $this);
                                }
                            }
                        });
                    });
                    _options.target.find(".al-panel > .panel > .t >.fn > .i.angle").click(function () {
                        var $this = $(this);
                        if ($this.attr("bind") == undefined || $this.attr("bind") == 2) {
                            $this.attr("bind", 1);
                            $this.find(">.ico > i").removeClass("fa-angle-up").addClass("fa-angle-down");
                            $this.parent().parent().parent().find(">.c").animate({
                                height: 'hide'
                            }, 500);

                        } else {
                            $this.attr("bind", 2);
                            $this.find(">.ico>i").removeClass("fa-angle-down").addClass("fa-angle-up");
                            $this.parent().parent().parent().find(">.c").animate({
                                height: 'show'
                            }, 500);
                        }
                    });

                    _options.target.find(".al-panel > .panel > .t >.fn > .i.fold").click(function () {
                        var $this = $(this);
                        var show = $this.attr("show");
                        if (show == "false") {
                            $this.attr("show", true);
                            $this.find("i").removeClass("fa-angle-double-right").addClass("fa-angle-double-left")
                            _options.target.find(".al-panel").removeClass("false");
                        } else {
                            $this.attr("show", false);
                            $this.find("i").removeClass("fa-angle-double-left").addClass("fa-angle-double-right")
                            _options.target.find(".al-panel").addClass("false");
                        }
                        if (_options.fold.click != null) {
                            _options.fold.click(show, _options)
                        }

                    });
                }
            }
            $.extend(_options, options);
            return _options;
        }
    }
}();