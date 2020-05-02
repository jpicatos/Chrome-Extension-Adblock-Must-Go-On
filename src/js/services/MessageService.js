class MessageService {
    sendMsgToContent(insideFunc, params, handleResp) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var activeTab = tabs[0] || {};
            insideFunc ? insideFunc() : null;
            if (handleResp) {
                chrome.tabs.sendMessage(activeTab.id, params, handleResp);
            } else {
                chrome.tabs.sendMessage(activeTab.id, params);
            }
        });
    }
}

export default MessageService;