'use strict';
import pagesInfo from "../data/pagesInfo";
import StrategiesManager from "./strategies/StrategiesManager";
import OneLayerPopUpStrgy from "./strategies/OneLayerPopUpStrgy";
import MultipleLayerAndClassStrgy from "./strategies/MultipleLayerAndClassStrgy";
import ReplaceContentStrgy from "./strategies/ReplaceContentStrgy";

let strategiesManager = new StrategiesManager();
switch(window.location.host) {
    case "elpais.com":
    case "www.abc.es":
        strategiesManager.strategy = new OneLayerPopUpStrgy();
        strategiesManager.doAction({popupClass: ".fc-ab-root"});
        break;
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
        strategiesManager.doAction({popupClass: ".adsInfo__container-UiYg"});
        break;
    case "www.mitele.es":
        strategiesManager.strategy = new OneLayerPopUpStrgy();
        strategiesManager.doAction({popupClass: ".adsInfo__fullOpacity-1Kyc"});
        break;
    case "www.elespanol.com":
        strategiesManager.strategy = new MultipleLayerAndClassStrgy();
        strategiesManager.doAction({
            popupClases: [".tp-modal", ".tp-backdrop"],
            removeClases: [{ elem: "body", lassName: "tp-modal-open" }]
        });
        break;
    case "www.larioja.com":
        strategiesManager.strategy = new ReplaceContentStrgy();
        strategiesManager.doAction({
            popupClass: "voc-landing-addblocker",
            contentLabel: "[data-voc-adbd-layer]",
            reloadLazyImages: true
        });
        break;
}

function isInUrl(stringArray) {
  return stringArray.some(string => window.location.href.indexOf(string) >= 0)
}

let lastRightClickElem;

document.addEventListener("contextmenu", (evt) => {
  lastRightClickElem = evt.target;
})

chrome.extension.onMessage.addListener(function (message, sender, callback) {
  if (message.functiontoInvoke == "holacaracola") {
    while (lastRightClickElem.parentNode.nodeName != "BODY") {
      lastRightClickElem = lastRightClickElem.parentNode;
    };
    remove(lastRightClickElem);
    document.querySelector("body").style.overflow = "unset";
    document.querySelector("html").style.overflow = "unset";
  }
});