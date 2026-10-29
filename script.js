let allJobs = [];

async function loadJobs() {
  try {
    const res = await fetch('./jobs.json');
    allJobs = await res.json();
    displayJobs(allJobs);
    const status = document.getElementById('search-status');
    if(status) status.textContent = `Loaded ${allJobs.length} sample opportunities`;
  } catch(e) {
    console.log('Using embedded jobs, jobs.json failed', e);
    // fallback if jobs.json fails
    allJobs = [
      {title:"Junior Customer Support - Remote", company:"Safaricom PLC", location:"Remote - Kenya", type:"Customer Support", source:"Safaricom Careers", sourceLink:"https://www.safaricom.co.ke/careers", eligibility:"Open to applicants in Kenya - check official posting", lastChecked:"2026-05-10"},
      {title:"M-Pesa Agent Support", company:"KCB Group", location:"Nairobi", type:"Banking", source:"KCB Careers", sourceLink:"https://kcbgroup.com/careers", eligibility:"Check official site", lastChecked:"2026-05-10"},
      {title:"Equity Bank Teller", company:"Equity Bank", location:"Kenya", type:"Banking", source:"Equity Careers", sourceLink:"https://equitygroupholdings.com/careers", eligibility:"Check official site", lastChecked:"2026-05-10"}
    ];
    displayJobs(allJobs);
  }
}

function displayJobs(jobs) {
  const container = document.querySelector('.jobs');
  if(!container) return;
  container.innerHTML = jobs.map(j => `
    <div class="job-card" style="border:1px solid #ddd;padding:15px;border-radius:8px;background:white">
      <span style="background:#e0ffe0;padding:3px 8px;border-radius:10px;font-size:12px">${j.type || 'Opportunity'}</span>
      <h3>${j.title}</h3>
      <div>${j.company} - ${j.location}</div>
      <p>${j.eligibility || ''}</p>
      <div><strong>Source:</strong> <a href="${j.sourceLink}" target="_blank">${j.source}</a></div>
      <a href="${j.sourceLink}" target="_blank" style="background:#16a34a;color:white;padding:8px 12px;border-radius:5px;text-decoration:none;display:inline-block;margin-top:10px">Apply Official</a>
    </div>
  `).join('');
}

document.getElementById('search-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  if(!term) { displayJobs(allJobs); return; }
  const filtered = allJobs.filter(j => (j.title+j.company+j.type).toLowerCase().includes(term));
  displayJobs(filtered);
});

loadJobs();