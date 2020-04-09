import BaseStrgy from "./BaseStrgy";

class ManualStrgy extends BaseStrgy {
    doAction(opts) {
        this.remove(opts.elem, true);
    }
}
export default ManualStrgy;