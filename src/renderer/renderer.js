const out = document.getElementById('out');

document.getElementById('launch').addEventListener('click', async () => {
  const id = document.getElementById('profileId').value;
  const profilePath = document.getElementById('profilePath').value;
  const proxyValue = document.getElementById('proxy').value.trim();

  const profile = {
    id,
    profilePath,
    proxy: proxyValue ? { server: proxyValue } : null
  };

  out.textContent = 'Launching...';
  try {
    const res = await window.electronAPI.launchProfile(profile);
    if (res.success) {
      out.textContent = 'Launched: ' + JSON.stringify(res.data, null, 2);
    } else {
      out.textContent = 'Error: ' + res.error;
    }
  } catch (err) {
    out.textContent = 'Unexpected error: ' + err.message;
  }
});
