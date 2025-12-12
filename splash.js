// CGAC Splash Screen Script // Shows splash for 3 seconds and then redirects to homepage

function startSplash() { const splash = document.getElementById("splash"); if (splash) { splash.classList.add("fade-out"); }

setTimeout(() => {
    window.location.href = "homepage.html";
}, 3000);

}

window.onload = startSplash;
