// =========================================================
// Le fil directeur : il se remplit en noir à mesure qu'on
// descend dans la page, et chaque carré se noircit quand
// on atteint sa section.
// =========================================================

const fil = document.querySelector(".thread");
const sections = document.querySelectorAll(".block");

function mettreAJourLeFil() {
  // Repère : le milieu de l'écran
  const repere = window.innerHeight * 0.5;

  // 1. Quelle part du fil est passée au-dessus du repère ? (entre 0 et 1)
  const zone = fil.getBoundingClientRect();
  let progression = (repere - zone.top) / zone.height;
  progression = Math.min(Math.max(progression, 0), 1);

  // On transmet la valeur au CSS via une variable
  fil.style.setProperty("--progress", progression);

  // 2. Chaque section dont le titre a passé le repère est "atteinte"
  sections.forEach(function (section) {
    const titre = section.querySelector(".block-head");
    const atteinte = titre.getBoundingClientRect().top < repere;
    section.classList.toggle("is-reached", atteinte);
  });
}

// On recalcule au défilement et au redimensionnement,
// au plus une fois par image affichée (requestAnimationFrame)
let enAttente = false;
function demanderMiseAJour() {
  if (enAttente) return;
  enAttente = true;
  requestAnimationFrame(function () {
    mettreAJourLeFil();
    enAttente = false;
  });
}

window.addEventListener("scroll", demanderMiseAJour, { passive: true });
window.addEventListener("resize", demanderMiseAJour);
mettreAJourLeFil();

// L'année du pied de page se met à jour toute seule
document.getElementById("year").textContent = new Date().getFullYear();
