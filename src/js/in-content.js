'use strict';
import StrategiesManager from "./strategies/StrategiesManager";
import OneLayerPopUpStrgy from "./strategies/OneLayerPopUpStrgy";
import MultipleLayerAndClassStrgy from "./strategies/MultipleLayerAndClassStrgy";
import ReplaceContentStrgy from "./strategies/ReplaceContentStrgy";
import MagicPopUpStrgy from "./strategies/MagicPopUpStrgy";
import ManualStrgy from "./strategies/ManualStrgy";
import IconCtrl from "./controllers/IconCtrl";

let strategiesManager = new StrategiesManager();
let iconCtrl = new IconCtrl();

!iconCtrl.isAntiAdblockPaused() ? startBlock() : null;
iconCtrl.changeIcon(iconCtrl.isAntiAdblockPaused());

localStorage.removeItem('popUpWasRemoved');
chrome.runtime.sendMessage({ type: "removeBadge" });


function startBlock() {
    switch (window.location.host) {
        case "elpais.com":
        case "www.abc.es":
        case "sevilla.abc.es":
        case "okdiario.com":
        case "www.lavozdigital.es":
        case "www.ojogo.pt":
        case "www.dn.pt":
        case "www.heraldo.es":
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
                popupClass: ".voc-landing-addblocker",
                contentLabel: "[data-voc-adbd-layer]",
                reloadLazyImages: true
            });
            break;
        case "www.soy502.com":
            strategiesManager.strategy = new ReplaceContentStrgy();
            strategiesManager.doAction({
                popupClass: ".adBlocker",
                contentLabel: ".home"
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
        case "www.washingtonpost.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".k_tati_pbu__qbl_n__"
            });
            break;
        case "www.thetimes.co.uk":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: "#sp_message_container_101175"
            });
            break;


        case "www.libremercado.com":
        case "www.libertaddigital.com":
        case "esradio.libertaddigital.com":
        case "tv.libertaddigital.com":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".jquery-modal.blocker.current"
            });
            break;
        case "www.dailymail.co.uk":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".wrapper-3AzfF",
                goToTop: true
            });
            break;
        case "www.independent.co.uk":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: [".tp-iframe-wrapper.tp-active", ".tp-backdrop.tp-active"],
                goToTop: true
            });
            break;
        case "andaluciainformacion.es":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: ["#modal-adblock", ".modal-overlay"],
            });
            break;
        default:
            strategiesManager.strategy = new MagicPopUpStrgy();
            strategiesManager.doAction();
            break;

    }
}


//listeners
let lastRightClickElem;

document.addEventListener("contextmenu", (evt) => {
    lastRightClickElem = evt.target;
})

chrome.extension.onMessage.addListener((message, sender, callback) => {
    if (message.functiontoInvoke == "holacaracola") {
        strategiesManager.strategy = new ManualStrgy();
        strategiesManager.doAction({ elem: lastRightClickElem });
    }
    if (message.functiontoInvoke == "playPause") {
        iconCtrl.changeIconIfNeeded();
    }
    if (message.functiontoInvoke == "isPause") {
        callback(iconCtrl.isAntiAdblockPaused());
    }
    if (message.functiontoInvoke == "changeTab") {
        iconCtrl.changeIcon(iconCtrl.isAntiAdblockPaused());
        callback(localStorage.getItem('popUpWasRemoved'));
    }
});