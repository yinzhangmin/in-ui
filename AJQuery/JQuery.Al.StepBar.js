(function ($) {
    $.fn.extend({
        "Step": function (options) {
            var settings = {
                obj: this,
                step: 0,
                click: null,
                item: null,
                data: null
            };
            var InitSettings = function (options) {
                $.extend(settings, options);
                settings.item = settings.obj.find(".al-step > ul > li");
                settings.width = settings.obj.width();
            };
            var InitLayout = function () {
                var width = (settings.width - 10) / settings.item.length;
                settings.item.width(width);
                settings.obj.find(".l-step").width(settings.width - width).css("left", width / 2);
                SetStep(settings.step);
                settings.item.click(function () {
                    settings.click($(this));
                });
            };
            var SetStep = function (index) {
                var width = (settings.width - 10) / settings.item.length;
                var animate = function (i) {
                    if (i <= index) {
                        settings.obj.find(".l-step>.i").width(width * (i - 1)).stop().animate({ width: width * i }, 500, function () {
                            settings.item.eq(i).addClass("select");
                            settings.item.eq(i).find(".ico").css("background-color", settings.data[i].color);
                            settings.item.eq(i).find(".ico").attr("title", decodeURIComponent(settings.data[i].info).replace(/\+/g,' '));
                            animate(++i);
                        });
                    }
                };
                animate(0);
            };
            InitSettings(options);
            InitLayout();
        }
    });
})(jQuery);
