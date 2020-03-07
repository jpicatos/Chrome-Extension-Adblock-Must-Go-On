import BaseStrgy from "./BaseStrgy";
import $ from "jquery";

class ReplaceContentStrgy extends BaseStrgy {
    doAction(opts) {
        let maxTimes = 0;
        let contentPage
        var intervall = setInterval(() => {
            if (document.getElementsByClassName(opts.popupClass)[0]) {
                $(opts.contentLabel).html() ? $(opts.contentLabel).html(contentPage) : null;
                opts.reloadLazyImages ? this.reloadImages(opts.contentLabel) : null;
                clearInterval(intervall);
                return;
            } else {
                $(opts.contentLabel).html() ? contentPage = $(opts.contentLabel).html() : null
            }
            if (maxTimes >= 26) {
                clearInterval(intervall);
                return;
            }
            maxTimes++;
        }, 250);
    }

    reloadImages(contentLabel) {
        $(`${contentLabel} img.lazy`).css("opacity", "1");
        $(`${contentLabel} img.lazy`).each(function () {
            var $t = $(this);
            $t.attr({
                src: $t.attr('data-original')
            }).removeAttr('data-original');
        });
    }
}
export default ReplaceContentStrgy;