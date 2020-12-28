'use strict';
import StrategiesManager from "./strategies/StrategiesManager";
import OneLayerPopUpStrgy from "./strategies/OneLayerPopUpStrgy";
import MultipleLayerAndClassStrgy from "./strategies/MultipleLayerAndClassStrgy";
import ReplaceContentStrgy from "./strategies/ReplaceContentStrgy";
import MagicPopUpStrgy from "./strategies/MagicPopUpStrgy";
import ManualStrgy from "./strategies/ManualStrgy";
import IconCtrl from "./controllers/IconCtrl";
import { parseDomain, fromUrl } from "parse-domain";
import { toUnicode } from "punycode";

const whitelist = ["google", 'youtube'];
let strategiesManager = new StrategiesManager();
let iconCtrl = new IconCtrl();

const { subDomains, domain, topLevelDomains } = parseDomain(
    fromUrl(window.location.host),
);
if (domain) {
    const parsedDomain = toUnicode(domain);

    !iconCtrl.isAntiAdblockPaused() ? startBlock(parsedDomain) : null;
    iconCtrl.changeIcon(iconCtrl.isAntiAdblockPaused());

    localStorage.removeItem('popUpWasRemoved');
    chrome.runtime.sendMessage({ type: "removeBadge" });
}


function startBlock(parsedDomain) {
    switch (parsedDomain) {
        case "elpais":
        case "abc":
        case "okdiario":
        case "lavozdigital":
        case "ojogo":
        case "dn":
        case "heraldo":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".fc-ab-root"
            });
            break;

        // Mediaset
        case "telecinco":
        case "cuatro":
        case "factoriadeficcion":
        case "energytv":
        case "divinity":
        case "bemad":
        case "eltiempohoy":
        case "mediaset":
        case "mtmad":
        case "yasss":
        case "uppers":
        case "niusdiario":
        case "cincomas":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".adsInfo__container-UiYg"
            });
            break;
        case "mitele":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".adsInfo__fullOpacity-1Kyc"
            });
            break;
        case "elespanol":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: [".tp-modal", ".tp-backdrop"],
                removeClases: [{
                    elem: "body",
                    className: "tp-modal-open"
                }]
            });
            break;
        case "elconfidencial":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: [".adBlockMessage", ".abMessage"]
            });
            break;

        // Vocento
        case "larioja":
        case "hoy":
        case "elcorreo":
        case "elnortedecastilla":
        case "diariovasco":
        case "elcomercio":
        case "ideal":
        case "diariosur":
        case "lasprovincias":
        case "eldiariomontanes":
        case "laverdad":
        case "leonoticias":
        case "burgosconecta":
            strategiesManager.strategy = new ReplaceContentStrgy();
            strategiesManager.doAction({
                popupClass: ".voc-landing-addblocker",
                contentLabel: "[data-voc-adbd-layer]",
                reloadLazyImages: true
            });
            break;
        case "soy502":
            strategiesManager.strategy = new ReplaceContentStrgy();
            strategiesManager.doAction({
                popupClass: ".adBlocker",
                contentLabel: ".home"
            });
            break;
        case "es.investing":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: "#abPopup"
            });
            break;
        case "cnbc":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".fEy1Z2XT "
            });
            break;
        case "washingtonpost":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".k_tati_pbu__qbl_n__"
            });
            break;
        case "thetimes":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: "#sp_message_container_101175"
            });
            break;


        case "libremercado":
        case "libertaddigital":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".jquery-modal.blocker.current"
            });
            break;
        case "dailymail":
            strategiesManager.strategy = new OneLayerPopUpStrgy();
            strategiesManager.doAction({
                popupClass: ".wrapper-3AzfF",
                goToTop: true
            });
            break;
        case "independent":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: [".tp-iframe-wrapper.tp-active", ".tp-backdrop.tp-active"],
                goToTop: true
            });
            break;
        case "andaluciainformacion":
            strategiesManager.strategy = new MultipleLayerAndClassStrgy();
            strategiesManager.doAction({
                popupClases: ["#modal-adblock", ".modal-overlay"],
            });
            break;
        default:
            if (isInWhitelist(parsedDomain)) {
                console.log(`[AMGN] Domain "${parsedDomain}" is whitelisted`);
                break;
            }
            //known working fernava.com and all before
            strategiesManager.strategy = new MagicPopUpStrgy();
            strategiesManager.doAction();
            break;

    }
}

function isInWhitelist(domain) {
    return whitelist.includes(domain);
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