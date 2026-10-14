'use strict';

// Recorded development results. No model inference happens in this portfolio.
const results = Object.freeze({
  dense: { mrr: 0.9102, hit3: 98.89, label: 'DENSE / SEMANTIC SEARCH', title: 'The strongest overall result on this development set.', description: 'BGE-small embeddings and Qdrant retrieved the relevant passage within the top three for 98.9% of the 90 scored queries.', note: 'The 3.7 ms median covers CPU query embedding and in-memory dense search only. It is not end-to-end answer latency.' },
  bm25: { mrr: 0.81, hit3: 84.44, label: 'BM25 / LEXICAL SEARCH', title: 'A useful baseline for exact wording.', description: 'BM25 found the relevant passage within the top three for 84.4% of the 90 scored queries. Terminology mismatch is one reason to compare a lexical baseline with semantic retrieval.', note: 'This is a recorded synthetic development result. It does not establish performance on real user documents.' },
  hybrid: { mrr: 0.9001, hit3: 94.44, label: 'HYBRID / RECIPROCAL RANK FUSION', title: 'Adding fusion did not beat dense retrieval overall.', description: 'RRF combined dense and lexical rankings, reaching MRR 0.900 and Hit@3 94.4%. The result supports comparing retrieval choices rather than assuming that a larger pipeline is better.', note: 'The historical 0.36 ms hybrid timing used cached embeddings. It cannot be fairly compared with the uncached dense timing.' },
});

const tabs = [...document.querySelectorAll('[data-method]')];
const metricSelect = document.getElementById('metric-select');
let selectedMethod = 'dense';

function updateComparison() {
  const metric = metricSelect.value;
  if (!['mrr', 'hit3'].includes(metric) || !results[selectedMethod]) return;
  const chosen = results[selectedMethod];
  for (const row of document.querySelectorAll('[data-pipeline]')) {
    const method = row.dataset.pipeline;
    const value = results[method][metric];
    row.querySelector('.chart-value').textContent = metric === 'mrr' ? value.toFixed(3) : `${value.toFixed(1)}%`;
    row.querySelector('.chart-bar').style.setProperty('--bar', `${metric === 'mrr' ? value * 100 : value}%`);
    row.classList.toggle('is-active', method === selectedMethod);
  }
  document.getElementById('chart-caption').textContent = metric === 'mrr' ? 'Mean reciprocal rank · higher is better' : 'Relevant passage in the top three · 90 scored queries';
  document.querySelector('.insight-eyebrow').textContent = chosen.label;
  const number = document.querySelector('.insight-number');
  number.replaceChildren(document.createTextNode(metric === 'mrr' ? `${chosen.mrr.toFixed(3)} ` : `${chosen.hit3.toFixed(1)}% `));
  const unit = document.createElement('span');
  unit.textContent = metric === 'mrr' ? 'MRR' : 'Hit@3';
  number.append(unit);
  document.querySelector('#pipeline-insight h3').textContent = chosen.title;
  document.querySelector('.insight-description').textContent = chosen.description;
  document.querySelector('.insight-footnote').textContent = chosen.note;
  document.getElementById('pipeline-insight').setAttribute('aria-labelledby', `tab-${selectedMethod}`);
  for (const tab of tabs) {
    const active = tab.dataset.method === selectedMethod;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  }
}

for (const tab of tabs) {
  tab.addEventListener('click', () => { selectedMethod = tab.dataset.method; updateComparison(); });
  tab.addEventListener('keydown', (event) => {
    const index = tabs.indexOf(tab);
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectedMethod = tabs[next].dataset.method;
    updateComparison();
    tabs[next].focus();
  });
}
metricSelect.addEventListener('change', updateComparison);
// Enable dependent controls only after their handlers are installed.
metricSelect.disabled = false;
for (const tab of tabs) tab.disabled = false;

document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('jasirlvl@gmail.com');
    status.textContent = 'Email copied.';
  } catch {
    status.textContent = 'Select and copy jasirlvl@gmail.com, or use the email link.';
  }
});
document.getElementById('copy-email').disabled = false;

// Progressive enhancement: section navigation remains ordinary anchors.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  for (const section of document.querySelectorAll('main > section[id]')) observer.observe(section);
}
