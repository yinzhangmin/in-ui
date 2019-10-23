/* 
 *
 *   http://jquery.alyzm.com
 * *
 *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
 * *
 *   alawliet@msn.cn   
 *        
 */

$.AJQuery.box = function () {
    return {
        show: function (options, coptions) {
            var _options = {
                settings: {
                    alBoxStyle: "",
                    content: "",
                    id: "al-box",
                    className: "AlBox",
                    background: "#FFF",
                    width: "",
                    displayTitle: true,
                    height: "",
                    type: "",
                    title: "",
                    position: "center",
                    top: 0,
                    left: 0,
                    zIndex: 550,
                    dispaly: "block",
                    model: true,
                    isDrag: true,
                    autoClose: true,
                    cancelTxt: "取消",
                    cancel: null,
                    confirmTxt: "确定",
                    confirm: null,
                    closeStyle: "",
                    titleStyle: "",
                    buttomStyle: "",
                    Style: "",
                    close: null,
                    loadComplete: null,
                    opacity: 1,
                    time: null,
                    effects: "",
                    closeEffects: "",
                    cancelBtn: ".CancelBtn",
                    confirmBtn: ".ConfirmBtn",
                    closeBtn: ".AlBoxClose"
                },
                csettings: {
                    id: "Albg",
                    background: "#000",
                    height: $(document).height() + "px",
                    width: $(document).width() + "px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 500,
                    opacity: 0.5,
                    time: 1000,
                    close: false
                },
                init: function () {
                    if (this.settings.model) {
                        this.cover();
                    }
                    this.setHtml();
                    this.css();
                    this.event();
                    this.content();
                    this.effects();
                },
                setHtml: function () {
                    var html = "<div style='" + this.settings.alBoxStyle + "' class='"
                        + this.settings.className + "' id='" + this.settings.id + "'>";
                    if (this.settings.displayTitle) {
                        html += "<div class='AlBoxTitle' data-id='" + this.settings.id
                            + "'  style='" + this.settings.titleStyle + "'>";
                        html += "<div class='AlBoxTxt'><i class='fa fa-tag' aria-hidden='true'></i>" + this.settings.title
                            + "</div><div class='AlBoxClose AlBoxClose" + this.settings.id + "' style='"
                            + this.settings.closeStyle + "'></div></div>";
                    }
                    html += "<div class='AlBoxContent'></div>";
                    if (this.settings.cancel != null || this.settings.confirm != null) {
                        html += "<div class='AlBoxButtom' style='" + this.settings.buttomStyle + "'>";
                        if (this.settings.cancel != null) {
                            html += "<a data-id='" + this.settings.id
                                + "' class=' AlBoxBtn CancelBtn" + this.settings.id
                                + "'>" + this.settings.cancelTxt + "</a>"
                        }
                        if (this.settings.confirm != null) {
                            html += "<a data-id='" + this.settings.id
                                + "' class='AlBoxBtn ConfirmBtn" + this.settings.id
                                + "'>" + this.settings.confirmTxt + "</a>"
                        }
                        html += "</div>";
                    }
                    html += "</div>";
                    $(document.body).append(html);
                },
                event: function () {
                    $(this.settings.cancelBtn + this.settings.id).click(function () {
                        _options.settings.cancel();
                        _options.close();
                    });
                    var isclick = true;
                    $(this.settings.confirmBtn + this.settings.id).unbind("click").click(function () {
                        var $this = $(this);
                        if (isclick) {
                            isclick = false;
                            _options.settings.confirm(_options);
                            if (_options.settings.autoClose) {
                                _options.settings.close();
                            }
                            setTimeout(function () {
                                isclick = true;
                            }, 5000)
                        }
                    });
                    $(this.settings.closeBtn + this.settings.id).unbind("click").click(function () {
                        _options.close();
                    });
                    $(window).resize(function () {
                        _options.css();
                        $("#Albg").height($(window).height());
                    });
                },
                effects: function () {
                    if (this.settings.isDrag) {
                        $("#" + this.settings.id).find(".AlBoxTitle").css({
                            "cursor": "move"
                        });
                        _options.addDrag();
                    }
                    if (this.settings.time != null) {
                        AddTimeClose(this.settings.time);
                    }
                },
                load: function () {
                    if (_options.settings.loadComplete != null) {
                        _options.settings.loadComplete(_options);
                    }
                },
                time: function (time) {
                    setTimeout(function () {
                        $.AlBoxClose(this.settings.closeEffects);
                    }, time);
                },
                addDrag: function () {
                    $(".AlBoxTitle").mousedown(function (event) {
                        var offset = $(this).offset();
                        if (!window.XMLHttpRequest) {
                            dialogX = event.clientX - offset.left;
                            dialogY = event.clientY - offset.top;
                        } else {
                            dialogX = event.pageX - offset.left;
                            dialogY = event.pageY - offset.top;
                        }
                        $(document).mousemove(function (event) {
                            $("#" + _options.settings.id).css({
                                "top": event.clientY - dialogY + $(document).scrollTop(),
                                "left": event.clientX - dialogX,
                                "margin": 0
                            });
                        }).mouseup(function () {
                            $(document).unbind("mousemove");
                        });
                    });
                },
                content: function () {
                    switch (this.settings.type) {
                        case "image":
                            $("#" + this.settings.id).find(".AlBoxContent").html(
                                "<image src='" + this.settings.content + "'/>");
                            break
                        case "message":
                            $("#" + this.settings.id)
                                .find(".AlBoxContent")
                                .html(
                                "<div class='alBoxConfig_Content'><div class='alBox_Message_Alert'></div><div class='alBox_Message_Info'>"
                                + this.settings.content + "</div></div>");
                            break;
                        case "iframe":
                            $("#" + this.settings.id).find(".AlBoxContent").html(
                                "<iframe frameborder=0 width='" + this.settings.width
                                + "' height='" + this.settings.height + "' src='"
                                + this.settings.content + "'/>");
                            break;
                        default:
                            $("#" + this.settings.id).find(".AlBoxContent").html(options.content);
                    }
                },
                css: function () {
                    $("#" + this.settings.id).width(this.settings.width);
                    $("#" + this.settings.id).height(this.settings.height);
                    var h = this.settings.height;
                    if (this.settings.cancel != null || this.settings.confirm != null) {
                        h -= 40
                    }
                    if (this.settings.displayTitle == true) {
                        h -= 38;
                    }
                    $("#" + this.settings.id).find(".AlBoxContent").height(h);
                    $("#" + this.settings.id).css({
                        "background-color": this.settings.background,
                        "display": this.settings.dispaly
                    });
                    if (this.settings.model) {
                        $("#" + this.settings.id).css({
                            "opacity": this.settings.opacity,
                            "Alpha(opacity=": parseInt(this.settings.opacity) * 100
                        }, this.csettings.time);
                    }
                    var ww = $(window).width() - $("#" + this.settings.id).width();
                    $("#" + this.settings.id).offset({
                        left: this.settings.left + (ww > 0 ? ww : 0) / 2
                    });
                    switch (this.settings.effects) {
                        case "bottom":
                            $("#" + this.settings.id).css({
                                top: $(window).height()
                            });
                            break;
                        case "top":
                            $("#" + this.settings.id).css({
                                top: -this.settings.height
                            });
                            break;
                    }
                    switch (this.settings.position) {
                        default:
                        case "center":
                            if (this.settings.effects != "") {
                                $("#" + this.settings.id).animate({
                                    top: $(document).scrollTop() + this.settings.top
                                    + ($(window).height() - $("#" + this.settings.id).height()) / 2.5
                                }, function () {
                                    _options.load();
                                });
                            } else {
                                $("#" + this.settings.id).css({
                                    top: $(document).scrollTop() + this.settings.top
                                    + ($(window).height() - $("#" + this.settings.id).height()) / 2.5
                                });
                            }
                            break;
                        case "bottom":
                            if (this.settings.effects != "")
                                $("#" + this.settings.id)
                                    .animate({
                                        top: $(document).scrollTop()
                                        + this.settings.top
                                        + ($(window).height() - $("#" + this.settings.id).height() - this.settings.top)
                                    });
                            else
                                $("#" + this.settings.id)
                                    .css({
                                        top: $(document).scrollTop()
                                        + this.settings.top
                                        + ($(window).height() - $("#" + this.settings.id).height() - this.settings.top)
                                    });
                            break;
                        case "top":
                            if (this.settings.effects != "")
                                $("#" + this.settings.id).animate({
                                    top: $(document).scrollTop() + 0 + this.settings.top
                                }, function () {
                                    _options.load();
                                });
                            else
                                $("#" + this.settings.id).css({
                                    top: $(document).scrollTop() + 0 + this.settings.top
                                });
                            break;
                    }
                },
                close: function () {
                    switch (this.settings.effects) {
                        case undefined:
                        case "":
                            $("#" + this.settings.id).remove();
                            _options.clearCover();
                            break;
                        case "bottom":
                            $("#" + this.settings.id).animate({
                                top: $(document).height()
                            }, function () {
                                $(this).remove();
                                _options.clearCover();
                                if (_options.settings.close) {
                                    _options.close();
                                }
                            });
                            break;
                    }
                },
                cover: function () {
                    $("#" + this.csettings.id + "_" + this.settings.id).remove();
                    var AlBoxBk = document.createElement("div");
                    AlBoxBk.setAttribute("id", this.csettings.id + "_" + this.settings.id);
                    AlBoxBk.style.background = this.csettings.background;
                    AlBoxBk.style.width = this.csettings.width;
                    AlBoxBk.style.height = this.csettings.height;
                    AlBoxBk.style.position = this.csettings.position;
                    AlBoxBk.style.top = this.csettings.top;
                    AlBoxBk.style.left = this.csettings.left;
                    AlBoxBk.style.zIndex = this.csettings.zIndex;
                    AlBoxBk.style.opacity = "0";
                    AlBoxBk.style.filter = "Alpha(opacity= 0)";
                    document.body.appendChild(AlBoxBk);
                    $("#" + this.csettings.id + "_" + this.settings.id).animate({
                        "opacity": this.csettings.opacity,
                        "Alpha(opacity=": parseInt(this.csettings.opacity) * 100
                    }, this.csettings.time);
                    document.body.style.overflow = "hidden";
                    if (this.csettings.close) {
                        $("#" + this.csettings.id + "_" + this.settings.id).click(function () {
                            ClearCover();
                            AlBoxClose();
                        });
                    }
                },
                clearCover: function () {
                    if (this.settings.model) {
                        $("#" + this.csettings.id + "_" + this.settings.id).remove();
                        $("body").removeAttr("style");
                    }
                },
                mesageBox: function (title, Content, event) {
                    var options = {
                        title: title,
                        Content: Content,
                        event: event
                    }
                    AlBox.Show({
                        Width: "270",
                        Height: "128",
                        Title: options.title,
                        Top: 0,
                        Type: "message",
                        DisplayTitle: true,
                        Content: options.Content,
                        Position: "center",
                        Cancel: function () {
                        },
                        Confirm: options.event
                    });
                }
            }
            $.extend(_options.settings, options);
            $.extend(_options.csettings, coptions);
            _options.init();
            return _options;
        }
    }
}();
