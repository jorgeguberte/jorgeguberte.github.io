(() => {
  const items = window.LAB_CATALOG;
  const item = items.find(x => location.pathname.endsWith('/' + x.url));
  if (!item) return;
  const index = items.indexOf(item);
  const bar = document.createElement('nav');
  bar.className = 'lab-bar'; bar.setAttribute('aria-label', 'Experiment navigation');
  bar.innerHTML = `<a href="../index.html">← Labs</a><span class="lab-number">EXP. ${String(index+1).padStart(2,'0')} / ${items.length}</span><label><span hidden>Choose experiment</span><select aria-label="Choose experiment">${items.map(x => `<option value="${x.url}" ${x===item?'selected':''}>${x.title}</option>`).join('')}</select></label><button type="button" aria-expanded="false" aria-controls="lab-help">Guide</button><a href="../${items[(index+1)%items.length].url}" aria-label="Next experiment">Next →</a>`;
  document.body.prepend(bar);
  const help = document.createElement('aside'); help.id='lab-help'; help.className='lab-help'; help.hidden=true;
  const desc=document.createElement('p');desc.textContent=item.description;
  const hint=document.createElement('p');hint.textContent=item.hint + '. These are browser prototypes; example data and responses are simulated.';
  const close=document.createElement('button');close.textContent='Got it';close.type='button';
  help.append(desc,hint,close);document.body.append(help);
  const trigger=bar.querySelector('button');
  function toggle(open){help.hidden=!open;trigger.setAttribute('aria-expanded',String(open));if(open)close.focus();else trigger.focus();}
  trigger.addEventListener('click',()=>toggle(help.hidden));close.addEventListener('click',()=>toggle(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!help.hidden)toggle(false)});
  bar.querySelector('select').addEventListener('change',e=>{location.href='../'+e.target.value});
  if(document.querySelector('.hud-header'))document.body.classList.add('lab-has-hud');
})();
