// Select DOM elements
const btn = document.getElementById("fetchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const results = document.getElementById("results");

// Show or hide loading state
function showLoading(state) {
  loading.textContent = state ? "Loading..." : "";
  btn.disabled = state;
}

// Display error messages
function showError(message) {
  error.textContent = message;
}

// Fetch channels from backend API
async function fetchChannels(guildId) {
  try {
    const response = await fetch(`/api/guilds/${guildId}/channels`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return response.json();
  } catch (err) {
    throw new Error("Failed to fetch channels. " + err.message);
  }
}

// Handle button click
btn.addEventListener("click", async () => {
  const guildId = document.getElementById("guildId").value.trim();
  results.innerHTML = ""; // Clear previous results
  showError("");

  // Validate input
  if (!guildId) {
    showError("Guild ID cannot be empty");
    return;
  }

  showLoading(true);

  try {
    const channels = await fetchChannels(guildId);

    if (!channels || channels.length === 0) {
      showError("No channels found");
      return;
    }

    // Display channels
    channels.forEach(channel => {
      // Skip categories (type 4)
      if (channel.type === 4) return;

      const div = document.createElement("div");
      div.className = "card";

      // Add an icon based on channel type
      const icon = channel.type === 2 ? "🔊 (audioID) " : "# (chatID) ";
      div.textContent = `${icon}${channel.name}`;

      // Make clickable (alerts channel ID)
      div.style.cursor = "pointer";
      div.onclick = () => alert(`Channel ID: ${channel.id}`);

      results.appendChild(div);
    });
  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
});
   