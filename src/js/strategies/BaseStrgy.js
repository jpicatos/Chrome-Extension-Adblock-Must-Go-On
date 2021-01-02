class BaseStrgy {

    doAction() {}

    // Common function to remove html element 
    remove(elem, removeRoot, popupSimilarity) {
        if (elem) {
            if (removeRoot) {
                elem = this.getTopElement(elem)
            }
            console.log(elem);
            elem.remove();
            document.querySelector("body").setAttribute("style", "overflow: unset !important; position: unset !important");
            document.querySelector("html").setAttribute("style", "overflow: unset !important; position: unset !important");
            this.notifyToBadgeText(popupSimilarity);
        }
    }

    getTopElement(element) {
        var topElem = element;
        while (topElem.parentNode.nodeName != "BODY") {
            topElem = topElem.parentNode;
        };
        return topElem
    }

    notifyToBadgeText(popupSimilarity) {
        chrome.runtime.sendMessage({ type: "popupremoved", options: {popupSimilarity} });
        localStorage.setItem('popUpWasRemoved', true);
    }
}

export default BaseStrgy;