// Constants
const DEFAULT_TEXT = "Here's Enjoy Video IN HD";
const REDIRECT_DELAY_MS = 2000; // 2 seconds
const REDIRECT_URL = "https://www.profitableratecpmnetwork.com/k5zrm82mt?key=8b4d577eae0ec4823800cf226f0e9945"; // Change if needed

// Elements
const video = document.getElementById("videoPlayer");
const overlay = document.getElementById("playerOverlay");
const stage = document.getElementById("playerStage");
const loading = document.getElementById("loading");

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").trim();
    const headline = document.getElementById("headline");

    if (q) {
        headline.textContent = q;
        document.title = q;
        document.getElementById("searchInput").value = q;
    } else {
        headline.textContent = DEFAULT_TEXT;
        document.title = DEFAULT_TEXT;
    }
});


document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const val = document.getElementById("searchInput").value.trim();
    if (val) {
        const params = new URLSearchParams();
        params.set("q", val);
        window.location.search = params.toString();
    } else {
        window.location.search = "";
    }
});

// Hover preview (desktop)
let hoverPreviewStarted = false;
stage.addEventListener("mouseenter", async () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        try {
            if (!hoverPreviewStarted) {
                video.muted = true;
                video.loop = true;
                video.controls = false;
                await video.play();
                hoverPreviewStarted = true;
            }
        } catch (e) {}
    }
});

stage.addEventListener("mouseleave", () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        try {
            if (!video.paused && video.muted) {
                video.pause();
                video.currentTime = 0;
                hoverPreviewStarted = false;
            }
        } catch (e) {}
    }
});

// Loading + Redirect
let redirectTimer = null;
const SMARTLINK_URL = "https://www.profitableratecpmnetwork.com/k5zrm82mt?key=8b4d577eae0ec4823800cf226f0e9945";

function startLoadingThenRedirect() {
    overlay.classList.add("hidden");
    loading.style.display = "block";

    // Trigger Smartlink for maximum CTR
    window.open(SMARTLINK_URL, "_blank");

    if (redirectTimer) clearTimeout(redirectTimer);

    redirectTimer = setTimeout(() => {
        window.location.href = SMARTLINK_URL;
    }, REDIRECT_DELAY_MS);
}

// Click anywhere on overlay/play area starts spinner + redirect.
const overlayClickLayer = document.getElementById("overlayClickLayer");

function safeStart(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    startLoadingThenRedirect();
}

if (overlay) overlay.addEventListener("click", safeStart);
if (overlayClickLayer) {
    overlayClickLayer.addEventListener("click", safeStart);
}

if (video) {
    video.addEventListener("click", () => {
        if (!overlay.classList.contains("hidden")) {
            startLoadingThenRedirect();
            return;
        }

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener("pause", () => {
        if (video.currentTime < (video.duration || 10)) {
            overlay.classList.remove("hidden");
        }
    });

    video.addEventListener("ended", () => {
        overlay.classList.remove("hidden");
        video.controls = false;
        video.muted = true;
        video.loop = true;
    });
}