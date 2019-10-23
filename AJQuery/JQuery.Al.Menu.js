/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/

$.AJQuery.menu = function () {
    return {
        create: function (options) {
            var _options = {
                target: null,
                events: null,
                layout: null,
                ui: {
                    html: function (item) {
                        var html = "";
                        $.each(item, function (x1, y1) {
                            $.each(y1, function (x, y) {
                                html += "<div class='i " + ((y1.length - 1) == x ? "class" : "") + "'>";
                                if (y.sub != null) {
                                    html += "<div class='t' data-name='" + y.name + "' data-sub='true'> ";
                                    html += "<i class='fa fa-angle-right' aria-hidden='true'></i><span class='txt'>" + y.text + "</span>";
                                    html += "</div>";
                                    //html += "<div class='sub'>";
                                    //html += _options.ui.sub(y.sub);
                                    //html += "</div>"
                                } else {
                                    html += "<div class='t' data-name='" + y.name + "'> ";
                                    html += "<span class='txt no'>" + y.text + "</span>";
                                    html += "</div>";
                                }
                                html += "</div>";
                            });
                        });
                        return html;
                    },
                    create: function () {
                        $(".al-menus-l").remove();
                        var html = "<div id='" + _options.id + "' class='al-menus-l'>";
                        if (_options.events != null) {
                            html += this.html(_options.events);
                        }
                        html += "</div>";
                        _options.target.parent().append(html);
                        _options.layout = $("#" + _options.id);
                        var left = parseInt(_options.target.css("margin-left"));
                        var top = parseInt(_options.target.css("margin-top"));
                        var topBoder = parseInt(_options.target.css("border-top-width"));
                        var bottomBoder = parseInt(_options.target.css("border-bottom-width"));
                        _options.layout.css({
                            left: _options.target.position().left + left + _options.left,
                            top: _options.target.position().top + top + _options.target.height() + topBoder + bottomBoder + _options.top,
                            width: _options.width
                        });
                        _options.layout.hover(null, function (e) {
                            options.target.parent().find("#" + _options.id).remove();
                        });
                        this.click();
                    },
                    sub: function (items) {
                        return this.html(items);
                    },
                    click: function () {
                        _options.target.parent().find("#" + _options.id).find(".i >.t").unbind("click").click(function () {
                            var $this = $(this);
                            $.each(_options.events, function (x1, y1) {
                                $.each(y1, function (x, y) {
                                    if ($this.attr("data-name") == y.name) {
                                        y.click(_options, $this);
                                    }
                                });
                            });
                            if ($this.attr("data-sub") == "true") {
                                if ($this.parent().find(".sub").is(":hidden")) {
                                    $(this).find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
                                    $this.parent().find(".sub").addClass("open");
                                } else {
                                    $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
                                    $this.parent().find(".sub").removeClass("open");
                                }
                            } else {
                                options.target.parent().find("#" + _options.id).remove();
                            }
                        });
                    }
                },
                width: 200,
                left: 0,
                init: function () {
                    this.ui.create();
                }
            };
            $.extend(_options, options);
            _options.init();
            return _options;
        }
    }
}();