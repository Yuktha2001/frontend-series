const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primaryNav");
const filterButtons = document.querySelectorAll(".filter-button");
const watchCards = document.querySelectorAll(".watch-card");
const appointmentForm = document.querySelector("[data-appointment-form]");
const toast = document.querySelector("[data-toast]");

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  header.classList.toggle("nav-open", !isOpen);
});

nav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  header.classList.remove("nav-open");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    watchCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden-card", !shouldShow);
    });
  });
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(appointmentForm);
  const model = data.get("model");

  showToast(`Appointment request received for ${model}.`);
  appointmentForm.reset();
});

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
