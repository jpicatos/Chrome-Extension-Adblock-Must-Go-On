import BaseStrgy from "./BaseStrgy";

class OneLayerPopUpStrgy extends BaseStrgy{
    doAction(opts) {
        let maxTimes = 0;
        let interval = setInterval(() => {
            var popUp = document.querySelector(opts.popupClass);
            this.remove(popUp)
            document.querySelector("body").style.overflow = "unset";
            document.querySelector("html").style.overflow = "unset";
            if (maxTimes >= 2) {
                clearInterval(interval)
            }
        }, 2000);
    }
}
export default OneLayerPopUpStrgy;