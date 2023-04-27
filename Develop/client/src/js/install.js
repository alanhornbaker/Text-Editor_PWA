const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {});
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent Chrome 76 and later from automatically showing the prompt
  event.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Update UI notify the user they can install the PWA
  // Display an "Install" button or similar UI element to notify the user they can add the app to the home screen
  // Show the buttonInstall button
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener("click", async () => {});
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Log the result of the prompt
    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferredPrompt variable, since it can only be used once
    deferredPrompt = null;

    // Hide the buttonInstall button
    butInstall.style.display = "none";
  }
});

// TODO: Add an handler for the `appinstalled` event
// window.addEventListener("appinstalled", (event) => {});
window.addEventListener("appinstalled", (event) => {
  // Log the app installation
  console.log("Jate PWA installed successfully.");
});
