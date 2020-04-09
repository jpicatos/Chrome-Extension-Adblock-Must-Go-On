import MessageService from "./services/MessageService";

let messageService = new MessageService();

function playPause() {
    messageService.sendMsgToContent(window.close, {
        "functiontoInvoke": "playPause"
    });
}

function isPause() {
    messageService.sendMsgToContent(null, {
        "functiontoInvoke": "isPause"
    }, (isPause) => {
        if (isPause) {
            document.getElementById("playPause").innerText = chrome.i18n.getMessage("playExtension");
        } else {
            document.getElementById("playPause").innerText = chrome.i18n.getMessage("pauseExtension");
        }
    });
}

// listiners
document.addEventListener("DOMContentLoaded", function() {
    isPause();
    document.getElementById("playPause").addEventListener("click", playPause);
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type == "changeIcon") {
        if (request.options.pause) {
            document.getElementById("playPause").innerText = chrome.i18n.getMessage("playExtension");
        } else {
            document.getElementById("playPause").innerText = chrome.i18n.getMessage("pauseExtension");
        }
    }
});