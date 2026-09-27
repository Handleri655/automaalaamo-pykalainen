(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const year = document.getElementById("year");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (year) year.textContent = String(new Date().getFullYear());

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const days = ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
  const today = days[new Date().getDay()];
  document.querySelectorAll("[data-day]").forEach((row) => {
    if (row.getAttribute("data-day") === today) row.classList.add("is-today");
  });

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !phone || !message) {
        status.className = "form-status err";
        status.textContent = "Täytä vähintään nimi, puhelin ja viesti.";
        return;
      }

      const subject = encodeURIComponent("Yhteydenotto: " + (service || "Automaalaamo Pykäläinen"));
      const body = encodeURIComponent(
        "Nimi: " + name + "\nPuhelin: " + phone + "\nSähköposti: " + email + "\nPalvelu: " + service + "\n\n" + message
      );
      window.location.href = "mailto:automaalaamo@automaalaamopykalainen.fi?subject=" + subject + "&body=" + body;
      status.className = "form-status ok";
      status.textContent = "Sähköpostiohjelma avautuu. Voit myös soittaa suoraan numeroon 09 294 6680.";
      form.reset();
    });
  }
})();
