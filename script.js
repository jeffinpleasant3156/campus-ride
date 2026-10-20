const pageTitles = {
  dashboard: "Student Dashboard",
  booking: "Book a Bus Pass",
  tracking: "Live Bus Tracking",
  "my-pass": "My Digital Bus Pass",
  routes: "Routes & Stops"
};

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active-page"));
  const page = document.getElementById(pageId);
  if (page) page.classList.add("active-page");
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === pageId));
  document.getElementById("page-title").textContent = pageTitles[pageId] || "CampusRide";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});
document.querySelectorAll("[data-goto]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.goto));
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

document.getElementById("booking-form").addEventListener("submit", event => {
  event.preventDefault();
  const studentName = document.getElementById("student-name").value.trim();
  const studentId = document.getElementById("student-id").value.trim();
  const passType = document.querySelector('input[name="pass-type"]:checked').value;
  const route = document.getElementById("route").value;
  const stop = document.getElementById("stop").value;
  const validity = document.getElementById("validity").value;
  const passId = "CR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const issued = new Date().toLocaleDateString("en-IN");
  const validUntil = validity === "Monthly"
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN")
    : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN");

  document.getElementById("dashboard-pass-status").textContent = "Active (Demo)";
  document.getElementById("pass-container").className = "digital-pass";
  document.getElementById("pass-container").innerHTML = `
    <div class="pass-header"><div><h3>CampusRide</h3><p>Digital College Bus Pass · Demo</p></div><strong>✓ ACTIVE</strong></div>
    <div class="pass-body"><div class="pass-fields">
      <div><small>Student name</small><strong>${escapeHTML(studentName)}</strong></div>
      <div><small>Roll number</small><strong>${escapeHTML(studentId)}</strong></div>
      <div><small>Pass type</small><strong>${escapeHTML(passType)}</strong></div>
      <div><small>Route</small><strong>${escapeHTML(route)}</strong></div>
      <div><small>Boarding stop</small><strong>${escapeHTML(stop)}</strong></div>
      <div><small>Validity</small><strong>${validity} · ${issued} – ${validUntil}</strong></div>
      <div><small>Pass ID</small><strong>${passId}</strong></div>
    </div><div><div class="fake-qr" aria-label="Decorative QR-style pattern">QR</div><p class="pass-note">Decorative QR-style graphic only. Not valid for travel.</p></div></div>`;
  showPage("my-pass");
  showToast("Demo pass created successfully!");
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}
