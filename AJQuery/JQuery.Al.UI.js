$.AJQuery.UI = {
    form: {
        create: function (o, key) {
            if (key == null) {
                key = "Id";
            }
            var html = "<form id='" + o.id + "-form'><div class='alform' id='" + o.id + "'><ul>";
            $.each(o.items, function (index, t) {
                html += "<li style='" + (t["hide"] ? "display:none;" : "") + "'><span class='title' style='" + t.nStyle + "'>" + t.name + "：</span>";
                switch (t.type.toLowerCase()) {
                    case "password":
                    case "text":
                        html += "<input autocomplete='off'  data-type='text' " + (t["disabled"] == true ? "disabled='disabled' " : "") + (t["readonly"] == "readonly" ? "readonly='readonly' " : "") + " data-value='" + t.key + "' style='" + t["style"] + "' name='" + t.key + "' placeholder='" + (t.tip != null ? t.tip : "") + "'  id='"
                            + (t.id != null ? t.id : "input_" + t.key.toLowerCase()) + "' type='" + t.type.toLowerCase() + "' value='" + t.value + "' class='input textbox " + t["class"] + "'/>";
                        if (t.fn != null)
                            html += "<span class='fn' id='" + (t.id != null ? t.id : t.key.replace(".", "_").toLowerCase()) + "_fn'>" + t["fn"] + "</span>";
                        break;
                    case "checkbox":
                        html += " <input data-type='checkbox' data-value='" + t.key + "' name='" + t.key + "' id='" + (t.id != null ? t.id : "input_" + t.key.toLowerCase()) + "' type='checkbox' class='input checkbox " + t["class"] + "'  value='" + t.value + "' />";
                        break;
                    case "textarea":
                        html += "<textarea autocomplete='off' data-type='textarea' data-value='" + t.key + "'  name='" + t.key + "' id='" + (t.id != null ? t.id : "input_" + t.key.toLowerCase()) + "' class='input textarea " + t["class"] + "'  style='" + t["style"] + "'>" + t.value + "</textarea>";
                        break;
                    case "select":
                        html += "<input autocomplete='off' data-type='select' select='" + t.value + "' " + (t["readonly"] == "readonly" ? "readonly='readonly'" : "") + " data-value='" + t.key + "' style='" + t["style"] + "'  name='" + t.key + "' id='" + (t.id != null ? t.id : "select_" + t.key.toLowerCase()) + "' type='text' value='' class='input select " + t["class"] + "'/>";
                        break;
                    case "file":
                        html += "<input data-type='file'  data-value='" + t.key + "' style='" + t["style"] + "'  name='" + t.key + "' id='" + (t.id != null ? t.id : "input_" + t.key.toLowerCase()) + "' type='file' value='' class='input file " + t["class"] + "'/>";
                        break;
                    default:
                        break;
                }
                html += "</li>";
            });
            html += "<li class='data-id'><input name='" + key + "' data-value='" + key + "' type='text' class='input' value=''/> </li>";
            html += "</ul></div></form>";
            return html;
        },
        get: function (id) {
            var o = {};
            $("#" + id).find(".input").each(function () {
                switch ($(this).attr("data-type")) {
                    case "select":
                        o[$(this).attr("data-value")] = $(this).attr("select");
                        break;
                    default:
                        o[$(this).attr("data-value")] = $(this).val();
                        break;
                }
            });
            return o;
        },
        form: function (id) {
            return $("#" + id + "-form");
        },
        set: function (id, o) {
            this.setObject($("#" + id), o);
        },
        setObject: function (e, o) {
            if (o != null) {
                e.find(".input").each(function () {
                    var $this = $(this);
                    switch ($(this).attr("data-type")) {
                        case "select":
                            var x = $this.attr("data-value");
                            if (x.indexOf(".") == -1) {
                                $this.attr("select", o[x]);
                            } else {
                                var value = o[x.split(".")[0]] != null ? o[x.split(".")[0]][x.split(".")[1]] : "";
                                $this.attr("select", value);
                            }
                            break;
                        case "file":

                            break;
                        default:
                            var x = $this.attr("data-value");
                            if (x.indexOf(".") == -1) {
                                $this.val(o[x]);
                                $this.attr("select", o[x]);
                            } else {
                                var value = o[x.split(".")[0]][x.split(".")[1]];
                                $this.val(value);
                                $this.attr("select", value);
                            }
                            break;
                    }
                });
            }
        }
    }
};

