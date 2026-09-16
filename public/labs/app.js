const catalog = window.LAB_CATALOG;
const grid = document.getElementById('card-grid');
const search = document.getElementById('search');
let category = 'all';
let visible = catalog;
function render() {
  const query = search.value.trim().toLowerCase();
  visible = catalog.filter(item => (category === 'all' || item.category === category) && `${item.title} ${item.description} ${item.hint}`.toLowerCase().includes(query));
  grid.innerHTML = visible.map(item => `<article class="experiment-card"><a href="./${item.url}"><div class="art ${item.art}" aria-hidden="true"><span class="card-number">EXP. ${String(catalog.indexOf(item)+1).padStart(2,'0')}</span><i></i><i></i><i></i></div><div class="card-body"><span class="card-category">${item.category}</span><h3>${item.title}</h3><p>${item.description}</p><span class="card-hint">${item.hint}<span aria-hidden="true">↗</span></span></div></a></article>`).join('');
  document.getElementById('result-count').textContent = `${visible.length} / ${catalog.length} experiments`;
  document.getElementById('empty').hidden = visible.length !== 0;
  document.getElementById('shuffle').disabled = visible.length === 0;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  render();
}));
search.addEventListener('input', render);
document.getElementById('shuffle').addEventListener('click', () => { if(visible.length) location.href = './' + visible[Math.floor(Math.random()*visible.length)].url; });
render();
