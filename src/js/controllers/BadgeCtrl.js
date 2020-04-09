class BadgeCtrl {
    setBadge() {
        chrome.browserAction.setBadgeBackgroundColor({ color: "#6b6b6b" });
        chrome.browserAction.setBadgeText({ text: "✓" });
    }

    removeBadge() {
        chrome.browserAction.setBadgeText({ text: "" });
    }
}

export default BadgeCtrl;