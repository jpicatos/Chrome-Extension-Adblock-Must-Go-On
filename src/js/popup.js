function playPause() {
    let tab;
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        var activeTab = tabs[0];
        tab = activeTab;
        window.close();
        chrome.tabs.sendMessage(activeTab.id, {
            "functiontoInvoke": "playPause"
        });
    });
}

function isPause() {
    let tab;
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function(tabs) {
        var activeTab = tabs[0];
        tab = activeTab;
        chrome.tabs.sendMessage(activeTab.id, {
            "functiontoInvoke": "isPause"
        }, handleResponse);

        function handleResponse(isPause) {
            if (isPause) {
                document.getElementById("playPause").innerText = chrome.i18n.getMessage("playExtension");
            } else {
                document.getElementById("playPause").innerText = chrome.i18n.getMessage("pauseExtension");
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function() {
    isPause();
    document.getElementById("playPause").addEventListener("click", playPause);
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.options.pause) {
        document.getElementById("playPause").innerText = chrome.i18n.getMessage("playExtension");
    } else {
        document.getElementById("playPause").innerText = chrome.i18n.getMessage("pauseExtension");
    }

});