import BaseStrgy from "./BaseStrgy";

const knownPopUpTexts = [
    "Hemos detectado que tiene instalado un bloqueador de anuncios (ad-blocker), pero si lo deshabilitas puedes beneficiarte.",
    "Para poder seguir navegando, permite que se te muestren anuncios o, si lo prefieres, suscríbete.",
    "Parece que estás usando una extensión o un antivirus para bloquear anuncios. Dependemos de la publicidad para financiar nuestro sitio web",
    "Estás utilizando un bloqueador de anuncios. La publicidad permite que podamos ofrecerte cada día información de calidad.",
    "Para seguir navegando necesitarás desactivar tu bloqueador de anuncios o, si lo prefieres, suscribirte a ABC en Kiosko y Más.",
    "Permite los anuncios en nuestro sitio web o compra un bono de navegación sin anuncios",
    "Parece que estás usando un bloqueador de anuncios. Dependemos de la publicidad para financiar nuestro sitio web.",
    "Desactiva tu adblocker en nuestra web para disfrutar el contenido",
    "Desactiva tu ‘adblocker’ en nuestra web para disfrutar del contenido",
    "Añádenos a la whitelist para que podamos seguir ofreciéndote un servicio de calidad.",
    "TIENES ACTIVADO EL BLOQUEADOR DE PUBLICIDAD",
    "Desactivar tu bloqueador es sencillo.",
    "Tu navegador utiliza un bloqueador que impide el correcto funcionamiento de esta página",
    "Nos hemos dado cuenta de que utiliza un bloqueo de publicidad",
    "Puede apoyarnos gratuitamente permitiendo anuncios",
    "DESACTIVAR ADBLOCK / DISABLE ADBLOCK"
];

const knownPopUpTextsEN = [
    "We have detected that you have installed an ad-blocker, but if you disable it you can benefit from it.",
    "In order to continue browsing, please allow ads to be shown to you or, if you prefer, subscribe.",
    "It looks like you're using an extension or an anti-virus to block ads. We depend on advertising to fund our website",
    "You're using an ad blocker. Advertising allows us to provide you with quality information every day.",
    "To continue browsing you will need to deactivate your ad blocker or, if you prefer, subscribe to ABC on Kiosk and More.",
    "Looks like you're using an ad blocker. We depend on advertising to fund our website.",
    "Disable your adblocker on our website to enjoy the content.",
    "Add us to the whitelist so we can continue to offer you quality service.",
    "YOU HAVE THE AD BLOCKER ACTIVATED.",
    "Deactivating your blocker is simple.",
    "Your browser uses a blocker that prevents this page from working properly.",
    "We've noticed that you're using an ad block",
    "You can support us for free by allowing ads.",
    " DESACTIVAR ADBLOCK / DISABLE ADBLOCK"
]

let lang = "es";

class MagicPopUpStrgy extends BaseStrgy {

    doAction() {
        let maxTimes = 0;
        let intervalo = setInterval(() => {
            if (this.potentialSimilarity(document.body.innerHTML)) {
                var popUp = this.searchPopUp(document.body);
                if (popUp) {
                    this.brotherOverlay();
                    this.remove(popUp);
                    clearInterval(intervalo)
                }
            }
            if (maxTimes >= 3) {
                clearInterval(intervalo)
            }
            maxTimes++;
        }, 2000);
    }

    searchPopUp(element) {
        if (element.innerText && !element.children.length &&
            this.potentialSimilarity(element.innerText) &&
            this.isPotentialPopUp(element) &&
            this.checkSimilarity(element.innerText)
        ) {
            return this.getTopElement(element);
        } else if (element.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = this.searchPopUp(element.children[i]);
            }
            return result;
        }
        return null;
    }

    potentialSimilarity(text) {
        text = text.toLowerCase();
        var isPoten = text.includes("publicidad") || text.includes("anuncios") || text.includes("bloqueador") || text.includes("adblocker") || text.includes("adblock");
        var isPotenEN = text.includes("advertising") || text.includes("ads") || text.includes("blocker") || text.includes("adblocker") || text.includes("adblock");
        isPoten ? lang = "es" : null;
        isPotenEN ? lang = "en" : null;
        return isPoten || isPotenEN;
    }

    checkSimilarity(text) {
        var stringSimilarity = require('string-similarity');
        var similarity
        if (lang === "es") {
            similarity = stringSimilarity.findBestMatch(text, knownPopUpTexts)
        } else {
            similarity = stringSimilarity.findBestMatch(text, knownPopUpTextsEN)
        }
        return similarity.bestMatch.rating > 0.35;
    }

    isPotentialPopUp(element) {
        var potentialPopUp = this.getTopElement(element);
        return potentialPopUp.style.position === "absolute" || potentialPopUp.style.position === "fixed" ||
            getComputedStyle(potentialPopUp).position === "absolute" || getComputedStyle(potentialPopUp).position === "fixed";
    }

    brotherOverlay() {
        let bodyChildrens = Array.from(document.body.children);
        bodyChildrens = bodyChildrens.filter(children =>
            children.children.length <= 0 &&
            (children.style.opacity < 1 || getComputedStyle(children).opacity < 1) &&
            (children.tagName == "DIV" || children.tagName == "SPAN") &&
            ((children.style.display && children.style.display != "none") || (getComputedStyle(children).display && getComputedStyle(children).display != "none")) &&
            children.offsetHeight >= window.innerHeight);

        bodyChildrens.map(children => this.remove(children));
    }
}
export default MagicPopUpStrgy;