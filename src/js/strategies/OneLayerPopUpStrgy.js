import BaseStrgy from "./BaseStrgy";

class OneLayerPopUpStrgy extends BaseStrgy {
    doAction(opts) {
        let maxTimes = 0;
        let intervalo = setInterval(() => {
            var popUp = document.querySelector(opts.popupClass);
            this.remove(popUp, opts.goToTop)
            console.log(maxTimes)
            if (maxTimes >= 5) {
                clearInterval(intervalo)
            }
            maxTimes++;
        }, 2000);
    }
}
export default OneLayerPopUpStrgy;