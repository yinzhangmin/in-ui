/* 
*
    *   http://jquery.alyzm.com
    * *
    *   Copyright 2010-2014 © (A.lawliet)JQUERY.ALYZM.COM®. All rights reserved
    * *
    *   alawliet@msn.cn   
*        
*/
$.AJQuery.pager = function () {
    return {
        init: function (options) {
            var _options = {
                id: "al-pager-01",
                total: 0,
                index: 1,
                size: 10,
                page: 0,
                align: "center",
                target: null,
                fn: function (click) {
                    $("#" + _options.id + " a").click(function () {
                        click($(this).attr("index"));
                    });
                },
                getHtml: function () {
                    var html = "";
                    if (this.page <= 1)
                        return html;
                    this.index += 1;
                    html += "<div id='" + _options.id + "' class='al-pager pager " + _options.align + "'>";
                    if (this.index == 1) {
                        html += "<span class='disabled'> &lt; 上一页</span>";
                    } else {
                        html += "<a index='" + (this.index - 1) + "' herf='javascript:void(0)'> &lt; 上一页</a>";
                    }
                    var count = 0;
                    var sIndex = this.index - 2;
                    if (sIndex <= 0)
                        sIndex = 1;

                    for (var i = sIndex; i <= this.page; i++) {
                        count += 1;
                        if (i == this.index) {
                            html += "<span class='current'>" + i + "</span>";
                        }
                        else {
                            html += "<a  index='" + i + "' herf='javascript:void(0)'>" + i + "</a>";
                        }
                        if (count == 8) {
                            if (this.page > 10)
                                break;
                        }
                    }
                    if (this.page - this.index > 10) {
                        if (this.page != this.index) {
                            html += "...";
                            for (var i = this.page - 1; i <= this.page; i++) {
                                html += "<a index='" + i + "' herf='javascript:void(0)'>" + i + "</a>";
                            }
                        }
                    }
                    if (this.index == this.page)
                        html += " <span class='disabled'>下一页 &gt; </span>";
                    else
                        html += " <a index='" + (this.index + 1) + "' herf='javascript:void(0)'>下一页 &gt; </a>";
                    html += "</div>";
                    return html;
                },
                create: function () {
                    if (this.target != null) {
                        return this.target.html(this.getHtml());
                    }
                }
            }
            $.extend(_options, options);
            return _options;
        }
    }
}();