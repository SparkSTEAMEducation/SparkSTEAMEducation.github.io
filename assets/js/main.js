(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const navBtn = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const year = document.getElementById('year');

  // Persisted theme
  try{
    const saved = localStorage.getItem('spark-theme');
    if(saved === 'light') root.classList.add('light');
  }catch{}

  if(btn){
    btn.addEventListener('click',()=>{
      root.classList.toggle('light');
      try{localStorage.setItem('spark-theme', root.classList.contains('light') ? 'light':'dark');}catch{}
    });
  }

  if(navBtn && navMenu){
    navBtn.addEventListener('click',()=>{
      const open = navMenu.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', String(open));
    });
  }

  if(year){ year.textContent = String(new Date().getFullYear()); }

  // Contact form: compose mailto and open user's mail client
  try{
    const contactForm = document.querySelector('.form');
    if(contactForm){
      contactForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = (document.getElementById('name') || {}).value || '';
        const email = (document.getElementById('email') || {}).value || '';
        const subject = (document.getElementById('subject') || {}).value || 'Contact from website';
        const message = (document.getElementById('message') || {}).value || '';

        const bodyLines = [];
        if(name) bodyLines.push(`Name: ${name}`);
        if(email) bodyLines.push(`Email: ${email}`);
        if(message) bodyLines.push('', message);
        const body = bodyLines.join('\n');

        const to = 'Educatedbyspark@gmail.com';
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open mail client (same tab) — falls back to form action if mailto fails
        window.location.href = mailto;
      });
    }
  }catch(err){ /* ignore */ }
})();
