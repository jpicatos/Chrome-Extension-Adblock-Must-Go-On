import StrategiesManager from "./StrategiesManager";

class MultipleLayerAndClassStrgy extends StrategiesManager{
    doAction(opts) {
        setTimeout(() => {
            opts.popupClases.map(popupClass => {
                var elem = document.querySelector(popupClass);
                this.remove(elem)
            })
            opts.removeClases.map(classToRemove => {
                document.querySelector(classToRemove.elem).classList.remove(classToRemove.className)
            })
        }, 2000);
    }
}
export default MultipleLayerAndClassStrgy;