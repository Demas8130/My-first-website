let allJobs = [
  {
    "title": "Junior Customer Support - Remote",
    "company": "Safaricom PLC",
    "location": "Remote - Kenya",
    "type": "Demo - Safaricom Partner",
    "skills": ["customer support", "communication", "English"],
    "description": "Sample data showing how we will display real verified opportunities.",
    "source": "Safaricom Careers",
    "sourceLink": "https://www.safaricom.co.ke/careers",
    "eligibility": "Open to applicants in Kenya - check official posting",
    "lastChecked": "2026-05-10"
  },
  {
    "title": "Junior Research Assistant - Data Entry",
    "company": "Demo NGO",
    "location": "Remote",
    "type": "Demo - Research",
    "skills": ["research", "data entry", "typing"],
    "description": "Another sample opportunity to test your search filter.",
    "source": "Demo Source",
    "sourceLink": "https://example.com",
    "eligibility": "Sample - not real",
    "lastChecked": "2026-05-10"
  }
];

async function loadJobs() {
  try {
    const res = await fetch('./jobs.json');
    if(res.ok){
      const data = await res.json();
      if(Array.isArray(data) && data.length > 0) allJobs = data;
    }
  } catch(e){ console.log('Using embedded jobs, jobs.json failed:', e); }
  displayJobs(allJobs);
  const status = document.getElementById('search-status');
  if(status) status.textContent = `Loaded ${allJobs.length} sample opportunities`;
}

function displayJobs(jobs) {
  const container = document.querySelector('.jobs');
  container.innerHTML = '';
  jobs.forEach(job => {
    container.innerHTML += `
      <div class="job-card">
        <span class="demo-label">${job.type}</span>
        <h3>${job.title}</h3>
        <div class="job-type">${job.company} · ${job.location}</div>
        <div class="tags">${job.skills.map(s=>`<span class="tag">${s}</span>`).join('')}</div>
        <p>${job.description}</p>
        <div class="verification">
          <strong>Source:</strong> <a href="${job.sourceLink}" target="_blank">${job.source}</a><br>
          <strong>Eligibility:</strong> ${job.eligibility}<br>
          <strong>Last checked:</strong> ${job.lastChecked}
        </div>
      </div>`;
  });
}
document.getElementById('search-form')?.addEventListener('submit', e=>{
  e.preventDefault();
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  if(!term){ displayJobs(allJobs); return; }
  const filtered = allJobs.filter(j => (j.title+j.company+j.description+j.skills.join(' ')).toLowerCase().includes(term));
  displayJobs(filtered);
});
loadJobs();