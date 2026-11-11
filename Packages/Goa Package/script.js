const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}

// Show the selected hotel option in the enquiry form.
document.querySelectorAll("[data-package]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("package");
    if (!select) return;
    const value = link.dataset.package;
    [...select.options].forEach(option => {
      if (option.textContent.startsWith(value)) select.value = option.value;
    });
  });
});

const form = document.getElementById("enquiryForm");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const packageName = data.get("package");
    const travellers = data.get("travellers");
    const message = `Hello Vansham Holidays, I would like to enquire about the Complete Goa Package.%0AName: ${encodeURIComponent(name)}%0AMobile: ${encodeURIComponent(phone)}%0AHotel option: ${encodeURIComponent(packageName)}%0ATravellers: ${encodeURIComponent(travellers)}%0ATravel window: 20 Nov – 20 Dec 2026. Please share availability and booking details.`;
    window.open(`https://wa.me/917405372435?text=${message}`, "_blank", "noopener");
  });
}
