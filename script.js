// 1. On récupère le bouton dans la page grâce à son id
const bouton = document.getElementById("theme-toggle");

// 2. Au chargement : si le visiteur avait choisi le mode sombre, on le réapplique
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  bouton.textContent = "☀️";
}

// 3. On écoute les clics sur le bouton
bouton.addEventListener("click", function () {
  // toggle = ajoute la classe si elle est absente, la retire si elle est présente
  document.body.classList.toggle("dark");

  const estSombre = document.body.classList.contains("dark");
  bouton.textContent = estSombre ? "☀️" : "🌙";

  // On mémorise le choix dans le navigateur du visiteur
  localStorage.setItem("theme", estSombre ? "dark" : "light");
});