class BaseStrgy {

    doAction() {}

    // Common function to remove html element 
    remove(elem, removeRoot) {
        if (elem) {
            if (removeRoot) {
                elem = this.getTopElement(elem)
            }
            elem.remove();
            chrome.runtime.sendMessage({ type: "popupremoved" });
        }
    }

    getTopElement(element) {
        var topElem = element;
        while (topElem.parentNode.nodeName != "BODY") {
            topElem = topElem.parentNode;
        };
        return topElem
    }
}

export default BaseStrgy;