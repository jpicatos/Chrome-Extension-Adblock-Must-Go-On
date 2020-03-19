import BaseStrgy from "./BaseStrgy";

class MultipleLayerAndClassStrgy extends BaseStrgy {
    doAction(opts) {
        var maxTimes = 0;
        var interval = setInterval(() => {
            opts.popupClases.map(popupClass => {
                var elem = document.querySelector(popupClass);
                this.remove(elem)
            })
            if (opts.removeClases) {
                opts.removeClases.map(classToRemove => {
                    document.querySelector(classToRemove.elem).classList.remove(classToRemove.className)
                })
            }
            document.querySelector("body").style.overflow = "unset";
            document.querySelector("html").style.overflow = "unset";
            maxTimes++;
            if (maxTimes >= 2) {
                clearInterval(interval)
            }
            maxTimes++;
        }, 2000);
    }
}
export default MultipleLayerAndClassStrgy;