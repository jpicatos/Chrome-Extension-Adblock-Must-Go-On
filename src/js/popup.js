function playPause() {
    let tab;
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        var activeTab = tabs[0];
        tab = activeTab;
        window.close();
        chrome.tabs.sendMessage(activeTab.id, {
            "functiontoInvoke": "playPause"
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("playPause").addEventListener("click", playPause);
});