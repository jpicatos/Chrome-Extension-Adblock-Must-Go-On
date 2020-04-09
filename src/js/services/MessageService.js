class MessageService {
    sendMsgToContent(insideFunc, params, handleResp) {
        let tab;
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var activeTab = tabs[0];
            tab = activeTab;
            insideFunc ? insideFunc() : null;
            chrome.tabs.sendMessage(activeTab.id, params, handleResp);
        });
    }
}

export default MessageService;