import BaseStrgy from "./BaseStrgy";

class OneLayerPopUpStrgy extends BaseStrgy{
    doAction(opts) {
        let maxTimes = 0;
        let intervalo = setInterval(() => {
            var popUp = document.querySelector(opts.popupClass);
            this.remove(popUp)
            document.querySelector("body").style.overflow = "unset";
            document.querySelector("html").style.overflow = "unset";
            document.querySelector("body").style.position = "unset";
            document.querySelector("html").style.position = "unset";
            console.log(maxTimes)
            if (maxTimes >= 2) {
                clearInterval(intervalo)
            }
            maxTimes++;
        }, 2000);
    }
}
export default OneLayerPopUpStrgy;