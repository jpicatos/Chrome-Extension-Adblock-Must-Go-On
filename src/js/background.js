function getword(info, tab) {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "holacaracola"
        });
    });
}

chrome.contextMenus.create({
    title: "Eliminar popup",
    contexts: ["all"],
    onclick: getword
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.type == "changeIcon") {
        if (request.options.pause) {
            chrome.browserAction.setIcon({ path: "pause38.png" });
        } else {
            chrome.browserAction.setIcon({ path: "48.png" });
        }
    }

    if (request.type == "popupremoved") {
        // chrome.browserAction.setBadgeBackgroundColor({ color: "#333333" });
        // chrome.browserAction.setBadgeText({ text: "✓" });
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    // chrome.browserAction.setBadgeText({ text: "" });
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "changeTab"
        });
    });
});