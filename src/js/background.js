function getword(info, tab) {
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
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