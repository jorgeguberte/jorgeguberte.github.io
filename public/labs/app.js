const cards = [...document.querySelectorAll(".experiment")];
const search = document.querySelector("#search");
const filters = [...document.querySelectorAll("[data-filter]")];
let category = "all";
function filterCards() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  cards.forEach((card) => {
    card.hidden = !(
      (category === "all" || card.dataset.category === category) &&
      card.dataset.title.includes(query)
    );
    if (!card.hidden) count++;
  });
  document.querySelector("#results").textContent =
    `${count} experiment${count === 1 ? "" : "s"} · ready to explore`;
  document.querySelector("#empty").hidden = count !== 0;
  document.querySelector("#surprise").disabled = count === 0;
}
filters.forEach((button) =>
  button.addEventListener("click", () => {
    category = button.dataset.filter;
    filters.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    filterCards();
  }),
);
search.addEventListener("input", filterCards);
document.querySelector("#surprise").addEventListener("click", () => {
  const visible = cards.filter((card) => !card.hidden);
  if (visible.length)
    location.href = visible[Math.floor(Math.random() * visible.length)].href;
});
document.querySelector(".tools").hidden = false;
document.querySelector("#surprise").hidden = false;
