import StrategiesManager from "./StrategiesManager";

class OneLayerPopUpStrgy extends StrategiesManager{
    doAction(opts) {
        setTimeout(() => {
            var popUp = document.querySelector(opts.popupClass);
            this.remove(popUp)
            document.querySelector("body").style.overflow = "unset";
            document.querySelector("html").style.overflow = "unset";
        }, 2000);
    }
}
export default OneLayerPopUpStrgy;