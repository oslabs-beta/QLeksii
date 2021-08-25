const ch = document.getElementById('togBtn');

ch.addEventListener('change', async () => {
  if (ch.checked) {
    const isDarkMode = await window.darkMode.toggle();
  }
  if (!ch.checked) {
    await window.darkMode.system();
  }
});
