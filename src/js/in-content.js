'use strict';
import StrategiesManager from "./strategies/StrategiesManager";
import OneLayerPopUpStrgy from "./strategies/OneLayerPopUpStrgy";
import MultipleLayerAndClassStrgy from "./strategies/MultipleLayerAndClassStrgy";
import ReplaceContentStrgy from "./strategies/ReplaceContentStrgy";

if (isAntiAdblockPaused()) {
    changeIcon(true);
} else {
    changeIcon(false)
    startBlock();
}

function startBlock() {
    let strategiesManager = new StrategiesManager();
    switch (window.location.host) {
        case "elpais.com":
        case "www.abc.es":
        case "sevilla.abc.es":
        case "okdiario.com":
        case "www.lavozdigital.es":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".fc-ab-root"
            });
            break;

            // Mediaset
        case "www.telecinco.es":
        case "www.cuatro.com":
        case "www.factoriadeficcion.com":
        case "www.energytv.es":
        case "www.divinity.es":
        case "www.bemad.es":
        case "www.eltiempohoy.es":
        case "www.mediaset.es":
        case "www.mtmad.es":
        case "www.yasss.es":
        case "www.uppers.es":
        case "www.niusdiario.es":
        case "www.cincomas.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".adsInfo__container-UiYg"
            });
            break;
        case "www.mitele.es":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".adsInfo__fullOpacity-1Kyc"
            });
            break;
        case "www.libertaddigital.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".jquery-modal.blocker.current"
            });
            break;
        case "www.elespanol.com":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: [".tp-modal", ".tp-backdrop"],
                removeClases: [{
                    elem: "body",
                    className: "tp-modal-open"
                }]
            });
            break;
        case "www.elconfidencial.com":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: [".adBlockMessage", ".abMessage"]
            });
            break;

            // Vocento
        case "www.larioja.com":
        case "www.hoy.es":
        case "www.elcorreo.com":
        case "www.elnortedecastilla.es":
        case "www.diariovasco.com":
        case "www.elcomercio.es":
        case "www.ideal.es":
        case "www.diariosur.es":
        case "www.lasprovincias.es":
        case "www.eldiariomontanes.es":
        case "www.laverdad.es":
        case "www.leonoticias.com":
        case "www.burgosconecta.es":
            strategiesManager.strategy = new ReplaceContentStrgy();
            strategiesManager.doAction({
                popupClass: "voc-landing-addblocker",
                contentLabel: "[data-voc-adbd-layer]",
                reloadLazyImages: true
            });
            break;
        case "es.investing.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: "#abPopup"
            });
            break;
        case "www.cnbc.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".fEy1Z2XT "
            });
            break;
        case "www.libremercado.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".blocker "
            });
            break;
    }
}

function isInUrl(stringArray) {
    return stringArray.some(string => window.location.href.indexOf(string) >= 0)
}

let lastRightClickElem;

document.addEventListener("contextmenu", (evt) => {
    lastRightClickElem = evt.target;
})

chrome.extension.onMessage.addListener((message, sender, callback) => {
    if (message.functiontoInvoke == "holacaracola") {
        while (lastRightClickElem.parentNode.nodeName != "BODY") {
            lastRightClickElem = lastRightClickElem.parentNode;
        };
        remove(lastRightClickElem);
        document.querySelector("body").style.overflow = "unset";
        document.querySelector("html").style.overflow = "unset";
    }
    if (message.functiontoInvoke == "playPause") {
        changeIconIfNeeded();
        setTimeout(() => {
            location.reload()
            window.location.reload();
        }, 100);
    }
    if (message.functiontoInvoke == "changeTab") {
        if (isAntiAdblockPaused()) {
            changeIcon(true);
        } else {
            changeIcon(false);
        }
    }
});

function remove(elem) {
    if (elem) {
        if (typeof elem.remove === 'function') {
            elem.remove();
        } else {
            elem.parentNode.removeChild(textField);
        }
    }
}

function changeIconIfNeeded() {
    if (!isAntiAdblockPaused()) {
        localStorage.setItem('pauseAntiAdblock', true);
        // callback({pause:true})
        changeIcon(true);
    } else {
        localStorage.setItem('pauseAntiAdblock', false);
        changeIcon(false);
    }
}

function changeIcon(pause) {
    chrome.runtime.sendMessage({
        type: "changeIcon",
        options: {
            pause: pause,
        }
    });
}

function isAntiAdblockPaused() {
    return localStorage.getItem('pauseAntiAdblock') === "true";
}