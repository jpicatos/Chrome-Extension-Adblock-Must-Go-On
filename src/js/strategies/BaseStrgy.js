class BaseStrgy {

    doAction() {}

    // Common function to remove html element 
    remove(elem, removeRoot) {
        if (elem) {
            if (removeRoot) {
                elem = this.getTopElement(elem)
            }
            elem.remove();
            document.querySelector("body").setAttribute("style", "overflow: unset !important; position: unset !important");
            document.querySelector("html").setAttribute("style", "overflow: unset !important; position: unset !important");
            this.notifyToBadgeText();
        }
    }

    getTopElement(element) {
        var topElem = element;
        while (topElem.parentNode.nodeName != "BODY") {
            topElem = topElem.parentNode;
        };
        return topElem
    }

    notifyToBadgeText() {
        chrome.runtime.sendMessage({ type: "popupremoved" });
        localStorage.setItem('popUpWasRemoved', true);
    }
}

export default BaseStrgy;