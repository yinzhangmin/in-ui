/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/

$.AJQuery.select = function () {
    return {
        create: function (options) {
            var _options = {
                data: null,
                target: null,
                search: true,
                content: "",
                class: "",
                load: null,
                selectIndex: -1,
                click: null,
                select: null,
                check: false,
                isKeydown: false,
                nodeClick: function (e) { return true; },
                open: null,
                layout: null,
                hide: function () {
                    $("#" + _options.id).addClass("hide");
                },
                show: function () {
                    $("#" + _options.id).removeClass("hide");
                },
                remove: function () {
                    $("#" + _options.id).remove();
                },
                isExist: function () {
                    if ($("#" + _options.id).length == 0)
                        return false;
                    else
                        return true;
                },
                index: function (e) {
                    var index = _options.layout.find(".i.select").index();
                    switch (e.keyCode) {
                        case 38:
                            index -= 1;
                            if (index < 0)
                                index = 0
                            _options.layout.find(".i").removeClass("select");
                            _options.layout.find(".i.show:eq(" + index + ")").addClass("select");
                            break;
                        case 40:
                            index += 1;
                            if (index >= _options.layout.find(".i").length)
                                index = _options.layout.find(".i").length - 1;
                            _options.layout.find(".i").removeClass("select");
                            _options.layout.find(".i.show:eq(" + index + ")").addClass("select");
                            break;
                        case 13:
                            var txt = _options.layout.find(".i.select:eq(0)").text();
                            var value = _options.layout.find(".i.select:eq(0)").attr("value");
                            _options.target.val(txt);
                            _options.target.attr("select", value);
                            _options.layout.remove();
                            _options.keydown();
                            _options.target.focus();
                            if (_options.click != null) {
                                _options.click(_options.getData(value), _options);
                            }
                            break;
                        default:
                            break;
                    }
                },
                event: function () {
                    var setValue = function ($this) {
                        if (_options.check) {
                            var txt = "";
                            var value = "";
                            $this.parent().find(".i>.check > input:checked").each(function (index) {
                                txt += (index == 0 ? "" : ",") + $(this).parent().parent().attr("txt");
                                value += (index == 0 ? "" : ",") + $(this).parent().parent().attr("value");
                            });
                            _options.target.val(txt);
                            _options.target.attr("select", value);
                        } else {
                            _options.target.val($this.text());
                            _options.target.attr("select", $this.attr("value"));
                            _options.layout.find(".i").removeClass("select");
                            $this.addClass("select");
                            _options.hide();
                        }
                        if (_options.click != null) {
                            _options.click(_options.getData($this.attr("value")), _options);
                        }
                    };
                    _options.layout.find(".i >.txt").unbind("click").click(function () {
                        setValue($(this).parent());
                    });
                    _options.layout.find(".i >.check > input").unbind("click").click(function () {
                        if ($(this).is(':checked')) {
                            $(this).prop("checked", true);
                        } else {
                            $(this).prop("checked", false);
                        }
                        setValue($(this).parent().parent());
                    });
                    $(".al-auto-input#" + _options.id).hover(null, function () {
                        _options.hide();
                    });
                    _options.target.unbind("keydown").keydown(function (e) {
                        _options.index(e);
                    });
                    _options.target.unbind("keyup").keyup(function (e) {
                        _options.keyup(e);
                    })
                    if (_options.search) {
                        _options.layout.find(".i-s > input").bind('input propertychange', function () {
                            var value = $(this).val();
                            if (value == "") {
                                _options.layout.find(".i").removeClass("hide");
                            } else {
                                _options.layout.find(".i").addClass("hide");
                                _options.layout.find(".i:contains('" + value + "')").removeClass("hide");
                            }
                        });
                    }
                    if (_options.open != null) {
                        _options.open(_options);
                    }
                },
                keydown: function () {
                    if (_options.isKeydown) {
                        _options.target.keydown(function (e) {
                            switch (e.keyCode) {
                                case 13:
                                    _options.target.trigger("click");
                                    break;
                            }
                        });
                    }
                },
                keyup: function (e) {
                    switch (e.keyCode) {
                        case 8:
                            _options.target.attr("select", "");
                            if (_options.target.val() == "") {
                                _options.remove();
                            }
                            break;
                    }
                },
                init: function () {
                    if (_options.isExist())
                        _options.remove();
                    _options.target.unbind("click").click(function (e, x, y) {
                        _options.html();
                        _options.ui.select();
                    });
                    if (_options.load != null)
                        _options.load(_options);
                    _options.ui.select();
                },
                html: function () {
                    if (!_options.isExist()) {
                        var html = "<div id='" + _options.id + "' class='al-auto-input " + _options.class + "'>";
                        if (_options.search)
                            html += "<div class='i-s'><input id='search_txt_select' autocomplete='off' type='text' class='text-box' value='' /></div>";
                        if (_options.data != null) {
                            $.each(_options.data, function (x, y) {
                                html += "<div class='i show " + (y.value == _options.target.attr("select") ? " select" : "")
                                    + (_options.class != null ? _options.class : "") + "' txt='" + y.name + "' value='" + y.value + "'>";
                                if (_options.check) {
                                    html += "<div class='check'><input type='checkbox' /></div>";
                                }
                                html += "<div class='txt'>" + y.name + "</div>";
                                html += "</div>";
                            });
                        }
                        html += "</div>";
                        $(_options.target.parent()).append(html);
                        _options.layout = $("#" + _options.id);
                        var left = parseInt(_options.target.css("margin-left"));
                        var top = parseInt(_options.target.css("margin-top"));
                        var topBoder = parseInt(_options.target.css("border-top-width"));
                        var bottomBoder = parseInt(_options.target.css("border-bottom-width"));
                        _options.layout.css({
                            left: _options.target.position().left + left,
                            top: _options.target.position().top + top + _options.target.height() + topBoder + bottomBoder,
                            width: _options.target.outerWidth() - 4
                        });
                        _options.event();
                    } else {
                        _options.show();
                    }
                },
                ui: {
                    select: function () {
                        if (_options.data != null) {
                            if (_options.target.attr("select") != "") {
                                _options.target.val("");
                                var value = "";
                                $.each(_options.data, function (x, y) {
                                    if (!_options.check) {
                                        if (y.value == _options.target.attr("select")) {
                                            _options.target.val(y.name);
                                            $("#" + _options.id).find(".i[value = '" + y.value + "']").addClass("select");
                                            if (_options.select != null) {
                                                _options.select(y, _options);
                                            }
                                            return false;
                                        }
                                    } else {
                                        if (_options.target.attr("select").indexOf(y.value) != -1) {
                                            value += y.name + ",";
                                            $("#" + _options.id).find(".i[value = '" + y.value + "'] > .check > input").prop("checked", true);
                                        }
                                    }
                                });
                                if (_options.check) {
                                    _options.target.val(value.substring(0, value.length - 1));
                                }
                            }
                        }
                    }
                },
                set: function (name, value) {
                    _options.target.val(name);
                    _options.target.attr("select", value);
                },
                getData: function (value) {
                    var op = null;
                    $.each(_options.data, function (x, y) {
                        if (y.value == value) {
                            op = y;
                        }
                    });
                    return op;
                },
                get: function () {
                    return { name: _options.target.val(), value: _options.target.attr("select") };
                }
            };
            $.extend(_options, options);
            _options.init();
            return _options;
        }
    }
}();