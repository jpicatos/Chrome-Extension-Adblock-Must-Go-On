import BaseStrgy from "./BaseStrgy";

class MultipleLayerAndClassStrgy extends BaseStrgy {
    doAction(opts) {
        var maxTimes = 0;
        var interval = setInterval(() => {
            opts.popupClases.map(popupClass => {
                var elem = document.querySelector(popupClass);
                this.remove(elem, opts.goToTop)
            })
            if (opts.removeClases) {
                opts.removeClases.map(classToRemove => {
                    document.querySelector(classToRemove.elem).classList.remove(classToRemove.className)
                })
            }
            maxTimes++;
            if (maxTimes >= 5) {
                clearInterval(interval)
            }
            maxTimes++;
        }, 2000);
    }
}
export default MultipleLayerAndClassStrgy;