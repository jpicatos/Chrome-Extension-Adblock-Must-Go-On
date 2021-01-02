class BadgeCtrl {
    setBadge(popupSimilarity) {
        chrome.browserAction.setBadgeBackgroundColor({ color: "#6b6b6b" });
        chrome.browserAction.setBadgeText({ text: "✓" });
        console.info(popupSimilarity);
    }

    removeBadge() {
        chrome.browserAction.setBadgeText({ text: "" });
    }
}

export default BadgeCtrl;