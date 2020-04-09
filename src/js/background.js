import MessageService from "./services/MessageService";
import IconCtrl from "./controllers/IconCtrl";
import BadgeCtrl from "./controllers/BadgeCtrl";

let messageService = new MessageService();
let iconCtrl = new IconCtrl();
let badgeCtrl = new BadgeCtrl();

chrome.contextMenus.create({
    title: "Eliminar popup",
    contexts: ["all"],
    onclick: messageService.sendMsgToContent(null, { "functiontoInvoke": "holacaracola" })
});

// listiners
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type == "changeIcon") {
        iconCtrl.changeIconImg(request.options.pause);
    }

    if (request.type == "popupremoved") {
        badgeCtrl.setBadge();
    }

    if (request.type == "removeBadge") {
        badgeCtrl.removeBadge();
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    messageService.sendMsgToContent(null, {
        "functiontoInvoke": "changeTab"
    }, popupWasRemoved => {
        popupWasRemoved ? badgeCtrl.setBadge() : badgeCtrl.removeBadge();
    });
});