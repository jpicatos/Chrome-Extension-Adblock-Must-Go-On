import BaseStrgy from "./BaseStrgy";
import $ from "jquery";

class ReplaceContentStrgy extends BaseStrgy {
    doAction(opts) {
        let maxTimes = 0;
        let contentPage

        $(opts.contentLabel).html() ? contentPage = $(opts.contentLabel).html() : null
        var intervall = setInterval(() => {
            if (document.querySelector(opts.popupClass)) {
                $(opts.contentLabel).html() ? $(opts.contentLabel).html(contentPage) : null;
                opts.reloadLazyImages ? this.reloadImages(opts.contentLabel) : null;
                chrome.runtime.sendMessage({ type: "popupremoved" });
                clearInterval(intervall);
                return;
            } else {
                $(opts.contentLabel).html() ? contentPage = $(opts.contentLabel).html() : null
            }
            if (maxTimes >= 200) {
                clearInterval(intervall);
                return;
            }
            maxTimes++;
        }, 50);
    }

    reloadImages(contentLabel) {
        $(`${contentLabel} img.lazy`).css("opacity", "1");
        $(`${contentLabel} img.lazy`).each(function() {
            var $t = $(this);
            $t.attr({
                src: $t.attr('data-original')
            }).removeAttr('data-original');
        });
    }
}
export default ReplaceContentStrgy;