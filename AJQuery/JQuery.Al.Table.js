/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/
$.AJQuery.table = function () {
    return {
        init: function (options) {
            var _options = {
                title: "",
                ico: null,
                columns: [],
                data: [],
                where: [],
                panel: "show",
                value: "",
                style: "",
                info: "",
                page: {
                    show: false,
                    total: 0,
                    index: 0,
                    size: 10,
                    page: 0,
                },
                check: {
                    value: false,
                    click: null
                },
                showHead: false,
                sequence: true,
                target: null,
                searchHtml: "",
                id: "",
                primary: "Id",
                events: [],
                row: null,
                select: null,
                ui: {
                    bottom: function (html) {
                        _options.target.find(".table-panel > .b").html(html);
                    },
                    error: function (count) {
                        return "<td class='error' colspan='" + count + "'>无数据</td>";
                    },
                    create: function () {
                        var html = '<div class="table-panel ' + (_options.page.show ? "page" : "") + ' " id="' + _options.id + '" style="' + _options.style + '">';
                        html += '<div class="panel ' + _options.panel + '">';
                        html += '<div class="t"><div class="ico"><i class="fa fa-list" aria-hidden="true"></i></div>';
                        html += '<div class="txt">' + _options.title + '</div>';
                        html += '<div class="fn">';
                        var headHtml = this.getHead();
                        if (_options.events != null) {
                            for (var i in _options.events) {
                                html += '<div class="i">';
                                html += '<div class="ico"><i class="' + _options.events[i].ico + '" aria-hidden="true"></i></div>';
                                html += '<div value="' + (_options.events[i].value != null ? _options.events[i].value : _options.events[i].name) + '" id="' + _options.events[i].name + '" class="txt">' + _options.events[i].name + '</div>';
                                html += '</div>';
                            }
                        }
                        html += '</div></div></div>';
                        if (_options.info != "") {
                            html += '<div class="info">' + _options.info + '</div>';
                        }
                        if (_options.showHead) {
                            html += '<div class="h"><table class="table">' + headHtml + '</table></div>';
                        }
                        html += '<div class="t">';
                        html += '<table class="table">';
                        html += headHtml;
                        html += this.getBody();
                        html += '</table>';
                        html += '</div>';
                        if (_options.page.show) {
                            var pager = $.AJQuery.pager.init(_options.page);
                            html += '<div class="b">' + pager.getHtml() + '</div>';
                            html += '</div>';
                            _options.target.html(html);
                            pager.fn(_options.page.click);
                        } else {
                            _options.target.html(html);
                        }

                    },
                    getHead: function () {
                        var html = '<thead><tr>';
                        if (_options.sequence) {
                            html += '<td class="row">序号</td>';
                        }
                        if (_options.check.value) {
                            html += '<td class="check"><input type="checkbox"/></td>';
                        }
                        for (var index in _options.columns) {
                            var o = _options.columns[index];
                            var style = 'style="';
                            if (o.width != undefined && o.width != 0) {
                                style += 'width:' + o.width + "px;";
                            }
                            if (o.textAlign != undefined && o.textAlign != 0) {
                                style += 'text-align:' + o.textAlign + ";";
                            }
                            if (o.hide == true) {
                                style += 'display:none;';
                            }
                            style += o.style + ';"';
                            o.style = style;
                            html += '<td ' + style + '>' + o.name + '</td>';
                        }
                        var colspan = "";
                        if (_options.row != null) {
                            html += '<td style="width:' + _options.row.width + ';" colspan="' + _options.row.colspan + '">' + _options.row.name + '</td>';
                        }
                        html += '</tr></thead>';
                        return html;
                    },
                    getBody: function () {
                        var html = '<tbody>';
                        if (_options.data != null && _options.data.length != 0) {
                            $.each(_options.data, function (x, y) {
                                var whereClass = "";
                                $.each(_options.where, function (cx, cy) {
                                    if (y[cy.column] == cy.value) {
                                        whereClass += cy.cssClass;
                                    }
                                });
                                html += '<tr data-id="' + y[_options.primary] + '" class="' + whereClass + " " + (_options.select != null ? "click" : "") + '">';
                                if (_options.sequence) {
                                    if (_options.page.show) {
                                        html += '<td class="row">' + (parseInt(x) + 1 + (_options.page.index * _options.page.size)) + '</td>';
                                    } else {
                                        html += '<td class="row">' + (parseInt(x) + 1) + '</td>';
                                    }
                                }
                                if (_options.check.value) {
                                    html += '<td class="check"><input data-id="' + y[_options.primary] + '" type="checkbox"/></td>';
                                }
                                $.each(_options.columns, function (cx, cy) {
                                    var value = "";
                                    if (cy.value.indexOf(".") == -1) {
                                        value = ((y[cy.value] == null) ? "" : y[cy.value]);
                                    } else {
                                        value = ((y[cy.value.split(".")[0]] == null) ? "" : y[cy.value.split(".")[0]][cy.value.split(".")[1]]);
                                    }
                                    switch (cy.type) {
                                        case "input":
                                            html += '<td class="' + (cy.click != null ? "click" : "") + '" data-key="' + cy.name + '" data-id="' + y[_options.primary] + '"'
                                                + cy.style + '><input placeholder="' + (cy.tip != null ? cy.tip : "")
                                                + '" id="input_' + y[_options.primary] + "_" + cy.name + '"  data-value="' + cy.value + '" value="' + value
                                                + '" class="input ' + (cy["class"] != null ? cy["class"] : "") + '" ' + cy.style + ' /></td>';
                                            break;
                                        case "img":
                                            html += '<td class="' + (cy.click != null ? "click" : "") + '" data-key="' + cy.name + '" data-id="' + y[_options.primary] + '"'
                                                + cy.style + '><img data-value="" /></td>';
                                            break;
                                        default:
                                            html += '<td class="' + (cy.click != null ? "click" : "") + '" data-key="' + cy.name
                                                + '" data-id="' + y[_options.primary] + '" '
                                                + cy.style + '><span title="' + value + '" ' + (cy.style != null ? cy.style : "") + ' class="txt ' + (cy["class"] != null ? cy["class"] : "") + '">' + value + '</span></td>';
                                            break;
                                    }
                                });
                                if (_options.row != null) {
                                    if (_options.row.events != null) {
                                        $.each(_options.row.events, function (ex, ey) {
                                            html += '<td class="fn" style="width:' + parseInt(_options.row.width) / _options.row.colspan + 'px;"> <a data-id="' + y[_options.primary]
                                                + '" data-name="' + ey.name + '" href="javascript:void(0)">'
                                                + (ey["where"] == null ? ey.name : (y[ey.where.column.name] == ey.where.column.value ? ey.where.name : ey.name)) + '</a></td>';
                                        });
                                    }
                                }
                                html += '</tr>';
                            });
                        } else {
                            html += this.error(_options.columns.length + 3);
                        }
                        html += '</tbody>';
                        return html;
                    },
                    fn: function () {
                        _options.target.find(".table-panel > .t > .table > thead > tr > td.check > input").unbind("click").click(function (e) {
                            var isCheck = $(this).is(":checked");
                            _options.target.find(".table-panel > .t > .table > tbody > tr > td.check > input").prop("checked", isCheck);
                            if (_options.check.click != null) {
                                _options.check.click(_options.getCheck(), $(this), _options);
                            }
                        });
                        _options.target.find(".table-panel > .t > .table > tbody > tr > td.check > input").unbind("click").click(function (e) {
                            if (_options.check.click != null) {
                                _options.check.click(_options.getCheck(), $(this), _options);
                            }
                        });
                        _options.target.find(".table-panel > .t >.table > tbody > tr").data("bind", 1).unbind("click").click(function (e) {
                            var $this = $(this);
                            if ($this.data("bind") == 1) {
                                _options.target.find(".table-panel > .t > .table > tbody > tr").removeClass("select").data("bind", 1);
                                $this.addClass("select").data("bind", 2);
                            } else {
                                $this.removeClass("select").data("bind", 1);
                            }
                            var value = $this.attr("data-id");
                            if (_options.select != null) {
                                if (_options.data != null) {
                                    $.each(_options.data, function (x1, y1) {
                                        if (y1[_options.primary] == value) {
                                            _options.select(y1, $this, _options);
                                            return false;
                                        }
                                    });
                                }
                            }
                        });
                        _options.target.find(".table-panel > .panel > .t >.fn > .i > .txt").unbind("click").click(function () {
                            var $this = $(this);
                            $.each(_options.events, function (x, y) {
                                if (y.name == $this.attr("value")) {
                                    y.click(_options, $this);
                                }
                            });
                        });
                        _options.target.find(".table-panel > .t > .table > tbody > tr > td.fn > a").unbind("click").click(function () {
                            var $this = $(this);
                            var value = $this.attr("data-id");
                            $.each(_options.row.events, function (x, y) {
                                if (y.name == $this.attr("data-name")) {
                                    $.each(_options.data, function (x1, y1) {
                                        if (y1[_options.primary] == value) {
                                            y.click(y1, $this);
                                            return false;
                                        }
                                    });
                                }
                            });
                        });

                        _options.target.find(".table-panel > .t > .table > tbody > tr > td.click").unbind("click").click(function () {
                            var $this = $(this);
                            var value = $this.attr("data-id");
                            $.each(_options.columns, function (x, y) {
                                if (y.name == $this.attr("data-key")) {
                                    var row = _options.search.byId(value)
                                    y.click(value, $this, row);
                                }
                            });
                        });

                        _options.target.find(".table-panel > .t").unbind("scroll").scroll(function (e) {
                            //var st = $(this).scrollTop();
                            //if (st > 2) {
                            //    _options.target.find(".table-panel > .h").show();
                            //} else {
                            //    _options.target.find(".table-panel > .h").hide();
                            //}
                        });
                        _options.target.find(".table-panel > .t > .table > tbody > tr > td > .input").bind('input propertychange', function () {
                            var $this = $(this);
                            var value = $this.parent().parent().attr("data-id");
                            var column = $this.attr("data-value");
                            $.each(_options.data, function (x1, y1) {
                                if (y1[_options.primary] == value) {
                                    y1[column] = $this.val();
                                    return false;
                                }
                            });
                        });
                    },
                    resize: function () {
                        _options.target.find(".table-panel > .t").height(_options.target.height() - (_options.panel == "show" ? 40 : 0));
                    }
                },
                create: function () {
                    this.ui.create();
                    this.ui.fn();
                    return _options;
                },
                getCheck: function () {
                    var list = [];
                    _options.target.find(".table-panel > .t > .table > tbody > tr > td.check > input:checked ").each(function () {
                        var $this = $(this);
                        $.each(_options.data, function (x1, y1) {
                            if (y1[_options.primary] == $this.attr("data-id")) {
                                list.push(y1);
                            }
                        });
                    });
                    return list;
                },
                getSelect: function () {
                    var list = [];
                    _options.target.find(".table-panel > .t > .table > tbody > tr.select").each(function () {
                        var $this = $(this);
                        $.each(_options.data, function (x1, y1) {
                            if (y1[_options.primary] == $this.attr("data-id")) {
                                list.push(y1);
                            }
                        });
                    });
                    return list;
                },
                setSelect: function (id) {
                    options.target.find(".table-panel > .t > .table > tbody > tr[data-id='" + id + "']").addClass("select");
                    if (_options.select != null) {
                        if (_options.data != null) {
                            $.each(_options.data, function (x1, y1) {
                                if (y1[_options.primary] == id) {
                                    _options.select(y1, null, _options);
                                    return false;
                                }
                            });
                        }
                    }
                },
                checkAll: function () {
                    _options.target.find(".table-panel > .t > .table > thead > tr > td.check > input").prop("checked", true);
                    _options.target.find(".table-panel > .t > .table > tbody > tr > td.check > input").prop("checked", true);
                },
                search: {
                    byId: function (value) {
                        var data = null;
                        $.each(_options.data, function (x1, y1) {
                            if (y1[_options.primary] == value) {
                                data = y1;
                                return false;
                            }
                        });
                        return data;
                    }
                }
            }
            $.extend(_options, options);
            return _options;
        }
    }
}();
