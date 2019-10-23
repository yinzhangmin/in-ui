/* 
*
    *   http://jquery.alawliet.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALAWLIET.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/

$.AJQuery.tree = function () {
    return {
        init: function (options) {
            var _options = {
                ui: {
                    fn: function (node) {
                        var html = "";
                        if (node.Add)
                            html += '<span class="fn add"><i class="fa fa-plus" aria-hidden="true"></i></span>';
                        if (node.Edit)
                            html += '<span class="fn edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>';
                        if (node.Del)
                            html += '<span class="fn del"><i class="fa fa-times" aria-hidden="true"></i></span>';
                        if (node.Ofn != "")
                            html += node.Ofn;
                        if (node.Search)
                            html += '<span class="fn search"><i class="fa fa-search" aria-hidden="true"></i></span>';
                        return html;
                    },
                    get: function () {
                        var o = _options.data;
                        if (o != null) {
                            o.Level = 0;
                            var html = '<div class="altree" id="' + _options.id + '"><ul>';
                            html += '<li id="node_' + o.Id + '" key="' + o.Id + '" class="' + (o.Open ? "open" : "hide") + '"><div class="t">';
                            html += '<span class="i" ajax="' + o.Ajax + '"><i class="fa ' + (o.Open ? "fa-angle-down" : "fa-angle-right") + '"></i></span>';
                            if (o.Check) {
                                html += '<span class="ck"></span>';
                            }
                            if (!o.HideIco) {
                                html += '<span class="state"><i class="fa ' + o.Ico + '"></i></span>';
                            } else {
                                html += '<span class="state"></span>';
                            }
                            html += '<span class="txt" data-is-select="' + o.IsSelect + '" data-click="' + o.IsClick + '">' + o.Text + '</span>';
                            html += this.fn(o);
                            html += '</div>';
                            html += this.sub(o);
                            html += '</li></ul></div>';
                            _options.html = html;
                            return html;
                        }
                    },
                    create: function () {
                        if (_options.target != null)
                            _options.target.html(this.get());
                        return _options;
                    },
                    sub: function (o) {
                        var html = "";
                        if (o.Nodes != null && o.Nodes.length > 0) {
                            html += '<div class="sub"><ul>';
                            $.each(o.Nodes, function (x, y) {
                                y.Level = o.Level + 1;
                                y.parent = {};
                                $.extend(y.parent, o);
                                y.parent.Nodes = null;
                                node = y;
                                html += '<li id="node_' + node.Id + '" key="' + node.Id + '" class="' + (x == o.Nodes.length - 1 ? "last" : "") + (node.Open ? " open" : " hide") + '"><div class="t ' + (x == o.Nodes.length - 1 ? "last" : "") + '"><span class="l"></span>';
                                if ((node.Nodes != null && node.Nodes.length != 0) || node.Ajax) {
                                    html += '<span class="i" ajax="' + node.Ajax + '"><i class="fa ' + (node.Open ? "fa-angle-down" : "fa-angle-right") + '"></i></span>';
                                    if (node.Check)
                                        html += '<span class="ck"></span>';
                                    if (!node.HideIco)
                                        html += '<span class="state"><i class="fa ' + node.Ico + '"></i></span>';
                                    else
                                        html += '<span class="state"></span>';
                                } else {
                                    html += '<span class="i-n"></span>';
                                    if (node.Check)
                                        html += '<span ' + (node["IsCheck"] ? "check='check'" : "") + ' class="ck ' + (node["IsCheck"] ? "check" : "") + '"></span>';
                                    if (!node.HideIco)
                                        html += '<span class="state"><i class="fa ' + node.Ico + '"></i></span>';
                                    else
                                        html += '<span class="state"></span>';
                                }
                                html += '<span data-is-select="' + y.IsSelect + '" data-click="' + y.IsClick + '" class="txt">' + node.Text + '</span>' + _options.ui.fn(node) + '</div>' + _options.ui.sub(node) + '</li>';
                            });
                            html += '</ul></div>';
                        }
                        return html;
                    },
                    select: function (p) {
                        if (p.attr("data-is-select") == "true") {
                            $(".altree#" + _options.id + " ul li div.t span.txt.select").removeClass("select");
                            p.addClass("select");
                        }
                    },
                    click: function () {
                        var t = _options.target.find(".altree ul li .t");
                        var _time = null;
                        var ajax = function ($this) {
                            if (($this.attr("ajax") == "true" || $this.parent().parent().hasClass("hide")) || _options.ajax.state == true) {
                                $this.find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
                                $this.parent().parent().removeClass("hide").addClass("open");
                                if ($this.attr("ajax") == "true" || _options.ajax.state == true) {
                                    if (_options.event.ajax != null) {
                                        var node = _options.search.id($this.parent().parent().attr("key"));
                                        node.Ajax = false;
                                        _options.loding(node, true);
                                        _options.event.ajax(node, _options, $this);
                                    }
                                }
                                $this.attr("ajax", false);
                            } else {
                                $this.parent().parent().removeClass("open").addClass("hide");
                                $this.find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
                            }
                        };
                        t.find(".txt").unbind("dblclick").dblclick(function () {
                            clearTimeout(_time);
                            ajax($(this).parent().find(".i"));
                            _options.ui.select($(this));
                            if (_options.event.dblclick != null) {
                                var node = _options.search.id($(this).parent().parent().attr("key"));
                                _options.event.dblclick(node, _options, $(this));
                            }
                        });
                        t.find(".i").unbind("click").click(function (e) {
                            ajax($(this));
                        });
                        t.find(".ck").unbind("click").click(function () {
                            if ($(this).attr("check") == "" || $(this).attr("check") == null) {
                                $(this).attr("check", "check").addClass("check").parent().parent().find(".t >.ck").addClass("check");
                                $(this).parent().parent().find(".t>.ck").each(function (i) {
                                    $(this).attr("check", "check");
                                    var node = _options.search.id($(this).parent().parent().attr("key"));
                                    node.IsCheck = true;
                                });
                            } else {
                                $(this).attr("check", "").removeClass("check").parent().parent().find(".t >.ck").removeClass("check");
                                $(this).parent().parent().find(".t>.ck").each(function (i) {
                                    $(this).attr("check", "");
                                    var node = _options.search.id($(this).parent().parent().attr("key"));
                                    node.IsCheck = false;
                                });
                            }
                        });
                        t.find(".add").unbind("click").click(function () {
                            if (_options.event.add != null) {
                                _options.ui.select($(this).parent().find(".txt"));
                                var node = _options.search.id($(this).parent().parent().attr("key"));
                                _options.event.add(node, _options, $(this));
                            }
                        });
                        t.find(".edit").unbind("click").click(function () {
                            if (_options.event.edit != null) {
                                _options.ui.select($(this).parent().find(".txt"));
                                var node = _options.search.id($(this).parent().parent().attr("key"));
                                _options.event.edit(node, _options, $(this));
                            }
                        });
                        t.find(".del").unbind("click").click(function () {
                            if (_options.event.del != null) {
                                var node = _options.search.id($(this).parent().parent().attr("key"));
                                if (node != null)
                                    _options.event.del(node, _options, $(this));
                            }
                        });
                        t.find(".ofn").unbind("click").click(function () {
                            if (_options.event.ofn != null) {
                                _options.ui.select($(this).parent().find(".txt"));
                                var node = _options.search.id($(this).parent().parent().attr("key"));
                                _options.event.ofn(node, _options, $(this));
                            }
                        });
                        t.find(".search").unbind("click").click(function (e, x, y) {
                            var $this = $(this);
                            if (_options.event.search != null) {
                                var node = _options.search.id($this.parent().parent().attr("key"));
                                _options.ui.select($this.parent().find(">.txt"));
                                var html = "<div class='al-tree-search'><input type='text' value='" + _options.search.value + "' />";
                                html += "<div class='move'><i class='fa fa-arrows'/></div><div class='close'><i class='fa fa-close'/></div><div class='ok'><i class='fa fa-check'/></div></div>";
                                _options.target.find(".al-tree-search").remove()
                                _options.target.append(html);
                                _options.target.find(".al-tree-search").css({
                                    left: (e.pageX / 2),
                                    top: e.pageY - 60
                                });
                                _options.target.find(".al-tree-search > .ok").unbind("click").click(function () {
                                    if (_options.event.search != null) {
                                        _options.search.value = $(".altree + .al-tree-search > input").val();
                                        if (_options.event.search(_options.search.value, node, _options, $(this))) {
                                            _options.ajax.state = true;
                                            _options.ajax.auto(node);
                                        }
                                    }
                                });
                                _options.target.find(".al-tree-search > input").unbind("keydown").keydown(function (e) {
                                    if (e.keyCode == 13) {
                                        if (_options.event.search != null) {
                                            _options.search.value = $(this).val();
                                            if (_options.event.search(_options.search.value, node, _options, $(this))) {
                                                _options.ajax.state = true;
                                                _options.ajax.auto(node);
                                            }
                                        }
                                    }
                                });
                                _options.target.find(".al-tree-search > .close").unbind("click").click(function () {
                                    _options.ajax.state = false;
                                    _options.target.find(".al-tree-search").remove()
                                });
                                _options.target.find(".al-tree-search > .move").unbind("mousedown").mousedown(function (event) {
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
                                    });
                                    return false;
                                }).mouseup(function () {
                                    $("body").unbind("mousemove");
                                    return false;
                                });
                            }
                        });
                        t.find(".txt").unbind("click").click(function () {
                            var $this = $(this);
                            clearTimeout(_time);
                            _time = setTimeout(function () {
                                if ($this.attr("data-is-select") == "true" & $this.attr("data-click") == "true" & $this.attr("class").indexOf("select") == -1) {
                                    $(".altree#" + _options.id + " ul li div.t span.txt.select").removeClass("select");
                                    _options.ui.select($this);
                                    if (_options.event.select != null) {
                                        var node = _options.search.id($this.parent().parent().attr("key"));
                                        _options.event.select(node, _options, $this);
                                    }
                                }
                            }, 200);
                        });
                    }
                },
                html: "",
                target: null,
                add: function (node, nodes) {
                    if (nodes != undefined || nodes != null) {
                        var t = _options.target.find("#node_" + node.Id);
                        var pn = _options.search.id(node.Id);
                        if (pn != null) {
                            pn.Nodes = nodes;
                            t.removeClass("hide").addClass("open");
                            t.find(".sub").remove();
                            if (t.find(">.t > .i").length == 0) {
                                t.find(">.t>.state").before('<span class="i" ajax="false"><i class="fa fa-angle-right"></i></span>');
                            } else {
                                t.find(">.t > .i > i").removeClass("fa-angle-right").addClass("fa-angle-down");
                            }
                            t.find(">.t>.i").attr("ajax", false);
                            if (t.find(">.t>.state>i").length == 0) {
                                t.find(">.t>.state").removeClass("file").addClass("folder");
                            }
                            if (nodes.length > 0) {
                                t.find(">.t>.i-n").remove();
                            }
                            var html = _options.ui.sub(pn);
                            t.append(html);
                            _options.ui.click();
                        }
                    }
                    _options.loding(pn, false);
                },
                event: [],
                ajax: {
                    state: false,
                    auto: function (node) {
                        _options.target.find("ul > li #node_" + node.Id).find(" >.sub").remove()
                        _options.target.find("ul > li #node_" + node.Id).find("> .t > .i").trigger("click");
                    }
                },
                loding: function (node, x) {
                    var t = _options.target.find("#node_" + node.Id);
                    if (x) {
                        t.find(".t > .state > i").hide();
                        t.find(".t > .state").eq(0).addClass("loding");
                    } else {
                        t.find(".t > .state > i").show();
                        t.find(".t > .state").eq(0).removeClass("loding");
                    }
                },
                create: function () {
                    this.ui.create();
                    this.ui.click();
                    return _options;
                },
                remove: function (node) {
                    var tn = _options.target.find("#node_" + node.Id);
                    if (tn.parent().find("li").length == 1) {
                        tn.parent().parent().remove();
                    } else {
                        tn.remove();
                    }
                },
                select: function (node) {
                    $(".altree#" + _options.id + " ul li#node_" + node.Id + " > div.t > span.txt").addClass("select");
                },
                search: {
                    select: function () {
                        var id = _options.target.find(".altree ul li div.t span.txt.select").parent().parent().attr("key");
                        return this.id(id);
                    },
                    check: function () {
                        var list = { Nodes: [] };
                        var t = function (node, o) {
                            $.each(node.Nodes, function (x, y) {
                                if (y.IsCheck) {
                                    var c = {};
                                    $.extend(c, y);
                                    c.Nodes = [];
                                    o.Nodes.push(c);
                                    t(y, c);
                                } else {
                                    t(y, o);
                                }
                            });
                        }
                        t(_options.data, list);
                        return list;
                    },
                    list: function (p, value) {
                        var reault = {};
                        var t = function (node) {
                            $.each(node.Nodes, function (x, y) {
                                if (y[p] == value) {
                                    reault.push(y);
                                }
                                t(y);
                            });
                        }
                        t(_options.data);
                        return reault;
                    },
                    get: function (p, value) {
                        var reault = null;
                        var t = function (node) {
                            $.each(node.Nodes, function (x, y) {
                                if (y[p] == value) {
                                    reault = y;
                                    return false;
                                } else {
                                    t(y);
                                }
                            });
                        }
                        t(_options.data);
                        return reault;
                    },
                    id: function (id) {
                        if (_options.data.Id == id) {
                            return _options.data;
                        } else {
                            return this.get("Id", id);
                        }
                    },
                    value: ""
                }
            };
            $.extend(_options, options);
            return _options;
        }
    };
}();