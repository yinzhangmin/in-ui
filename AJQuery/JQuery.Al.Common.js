/* 
*
    *   http://jquery.alawliet.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALAWLIET.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/

$.extend(function () {
    return {
        AJQuery: {
            popBox: function (html, width, height, title, load, confirm, id, displayTitle, isModel, loadComplete, cancel) {
                if (isModel == null) {
                    isModel = true;
                }
                var albox = this.box.show({
                    id: (id == null ? ("AJQuery-Box-" + Math.floor(Math.random() * 99999999)) : id),
                    width: width,
                    height: height,
                    title: title,
                    displayTitle: ((displayTitle == null || displayTitle == undefined) ? true : displayTitle),
                    isDrag: true,
                    model: isModel,
                    content: html,
                    position: "center",
                    cancelTxt: "关闭",
                    effects: "",
                    autoClose: false,
                    cancelTxt: "取消",
                    loadComplete: loadComplete,
                    cancel: function () {
                        if (cancel != null) {
                            cancel();
                        }
                    },
                    confirmTxt: "确定",
                    confirm: confirm
                });
                if (load != undefined) {
                    load(albox);
                }
            },
            extend: function (o) {
                $.each(o, function (i) {
                    $.AJQuery[i] = o[i];
                });
            },
            post: function (url, data, event, type, info) {
                $.post(url, data, function (e) {
                    switch (type) {
                        case "html":
                            event(e);
                            break;
                        default:
                            if (info == true) {
                                if (e.IsError) {
                                    $.AJQuery.tip('失败' + (e.Content == null ? "" : "," + e.Content), '系统提示', 'warning');
                                } else {
                                    $.AJQuery.tip(e.Content == null ? '成功' : e.Content, '系统提示', "success");
                                    event(e.Data);
                                }
                            } else {
                                if (!e.IsError)
                                    event(e.Data);
                            }
                            break;
                    }
                }, type);
            },
            jsonp: function (url, data, event, callback, async, timeout) {
                if (timeout == null)
                    timeout = 0;
                $.ajax({
                    url: url,
                    dataType: "JSONP",
                    type: "GET",
                    jsonpCallback: callback,
                    async: async,
                    data: data,
                    timeout: timeout,
                    success: function (data, e) {
                        event(data, e);
                    },
                    error: function (data, e) {
                        event(data, e);
                    }
                });
            },
            upload: function (formId, action, type, dataType, success, error) {
                $("#" + formId).ajaxSubmit({
                    success: function (str) {
                        success(str);
                    },
                    error: function (error) {
                        error(error);
                    },
                    url: action,
                    type: type,
                    dataType: dataType
                });
            },
            tip: function (text, title, ico) {
                $.toast({
                    heading: title,
                    text: text,
                    showHideTransition: 'slide',
                    icon: ico,
                    position: 'bottom-right'
                })
            },
            convertTime: function (jsonTime, format) {
                if (jsonTime != null) {
                    var date = new Date(parseInt(jsonTime.replace("/Date(", "").replace(")/", ""), 10));
                    var formatDate = date.format(format);
                    return formatDate;
                } else {
                    return "";
                }
            },
            search: function (target, tip, ok, e, h) {
                var html = "<div class='al-search'>";
                html += "<div class='input'>";
                if (h == null) {
                    html += "<input type='text' placeholder='" + tip + "' />";
                } else {
                    html += h;
                }
                html += "</div>"
                html += "<div class='move'><i class='fa fa-arrows'/></div><div class='close'><i class='fa fa-close'/></div><div class='ok'><i class='fa fa-check'/></div></div>";
                target.find(".al-tree-search").remove()
                target.append(html);
                target.find(".al-search > .ok").unbind("click").click(function () {
                    ok($(this).parent().find("input").val());
                });
                target.find(".al-search > input").unbind("keydown").keydown(function (e) {
                    if (e.keyCode == 13) {
                        ok($(this).val());
                    }
                });
                target.find(".al-search > .close").unbind("click").click(function () {
                    target.find(".al-search").remove()
                });
                target.find(".al-search > .move").unbind("mousedown").mousedown(function (event) {
                    var $this = $(this).parent();
                    var offset = $this.offset();
                    if (!window.XMLHttpRequest) {
                        dialogX = event.clientX - offset.left;
                        dialogY = event.clientY - offset.top;
                    } else {
                        dialogX = event.pageX - offset.left;
                        dialogY = event.pageY - offset.top;
                    }
                    $("body").bind("mousemove", function (event) {
                        $this.css({
                            "top": event.clientY - dialogY + $(document).scrollTop(),
                            "left": event.clientX - dialogX,
                            "margin": 0
                        });
                    }).mouseup(function () {
                        $("body").unbind("mousemove");
                        return false;
                    });
                    return false;
                });
            }
        }
    }
}());

(function ($) {
    $.fn.drag = function ($this) {
        var $this = this;
        $this.mousedown(function (event) {
            var offset = $this.offset();
            if (!window.XMLHttpRequest) {
                dialogX = event.clientX - offset.left;
                dialogY = event.clientY - offset.top;
            } else {
                dialogX = event.pageX - offset.left;
                dialogY = event.pageY - offset.top;
            }
            $(document).mousemove(function (event) {
                $this.parent().css({ "opacity": 0.6 });
                $this.parent().css({
                    "top": event.clientY - dialogY + $(document).scrollTop(),
                    "left": event.clientX - dialogX,
                    "margin": 0
                });
            }).mouseup(function () {
                $this.parent().css({ "opacity": 1 });
                $(document).unbind("mousemove");
                return false;
            });
        });
    };
    $.fn.onlyNumber = function () {
        this.keydown(function (e) {
            this.value = this.value.replace(/\D/g, '');
        });
    };
    $.fn.loading = function (style) {
        var $this = $(this);
        $this.html("");
        if (style == null || style == "") {
            style = "margin:15px";
        }
        setTimeout(function () {
            if ($this.html() == "") {
                $this.html("<i style='font-size:22px; " + style + "' class='fa fa-spinner fa-spin'/>");
            }
        }, 200);
    };
    Date.prototype.format = function (format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };

        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }

        return format;
    }
})(jQuery);
