import BaseStrgy from "./BaseStrgy";

class MultipleLayerAndClassStrgy extends BaseStrgy{
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