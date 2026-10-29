async function loadJobs() {
  try {
    const res = await fetch('./jobs.json');
    const jobs = await res.json();
    const container = document.getElementById('jobs-container') || document.querySelector('.explore, #explore');
    // Find where to put jobs - try common IDs
    let target = document.getElementById('jobList') || document.getElementById('opportunities');
    if (!target) {
      // create fallback - put after Explore heading
      const h = document.evaluate("//h2[contains(text(),'Explore')]", document, null, 9, null).singleNodeValue;
      if(h) {
        target = document.createElement('div');
        target.id = 'jobList';
        target.style.display = 'grid';
        target.style.gap = '15px';
        target.style.padding = '20px';
        h.parentNode.insertBefore(target, h.nextSibling);
      }
    }
    if (!target) return;
    
    target.innerHTML = jobs.map(j => `
      <div style="border:1px solid #ddd; padding:15px; border-radius:8px; background:white">
        <h3>${j.title}</h3>
        <p><strong>${j.company}</strong> - ${j.location}</p>
        <p>${j.description}</p>
        <a href="${j.link}" target="_blank" style="background:#16a34a;color:white;padding:8px 12px;border-radius:5px;text-decoration:none">Apply Official</a>
      </div>
    `).join('');
  } catch(e) {
    console.error('Failed', e);
  }
}
loadJobs();