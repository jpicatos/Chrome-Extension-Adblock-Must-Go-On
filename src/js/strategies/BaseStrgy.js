class BaseStrgy {

    doAction(){}
    
    // Common function to remove html element 
    remove(elem) {
        if (elem) {
            if (typeof elem.remove === 'function') {
                elem.remove();
            } else {
                elem.parentNode.removeChild(textField);
            }
        }
    }
}

export default BaseStrgy;