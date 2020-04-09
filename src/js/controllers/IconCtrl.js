class IconCtrl {
    changeIconIfNeeded() {
        let pauseAntiAdblock = !this.isAntiAdblockPaused();
        localStorage.setItem('pauseAntiAdblock', pauseAntiAdblock);
        this.changeIcon(pauseAntiAdblock);
        setTimeout(() => {
            location.reload()
            window.location.reload();
        }, 100);
    }

    changeIcon(pause) {
        chrome.runtime.sendMessage({
            type: "changeIcon",
            options: {
                pause: pause,
            }
        });
    }

    isAntiAdblockPaused() {
        return localStorage.getItem('pauseAntiAdblock') === "true";
    }

    changeIconImg(pause) {
        if (pause) {
            chrome.browserAction.setIcon({ path: "pause38.png" });
        } else {
            chrome.browserAction.setIcon({ path: "48.png" });
        }
    }
}

export default IconCtrl;