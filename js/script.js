// script.js - core interactions for the custom homepage
(function(){
  // Link data organized by category
  const linkData = {
    personal: [
      { icon: 'fas fa-play-circle', label: 'Anime', url: 'https://hianime.to/' },
      { icon: 'fas fa-clapperboard', label: 'Hurawatch', url: 'https://hurawatch.cc/home' },
      { icon: 'fas fa-feather', label: 'Peacock', url: 'https://www.peacocktv.com/?cid=2301evgpkpdsearch11571&utm_campaign=2301evg&utm_source=pk_ggl_gglsa&utm_medium=pd_search_br_srcpy&utm_term=126778&utm_content=126778_126778&gclsrc=aw.ds&gad_source=1&gad_campaignid=6481429429&gbraid=0AAAAACqYaJqWNmNvBE-G_acVfDjW9-RJB&gclid=Cj0KCQiA8KTNBhD_ARIsAOvp6DJjmdSPrQ33MbvIz29owtLYDZ76Kg2CA0KSeux3_KD2_VSSU-pSNUMaAg3jEALw_wcB' },
      { icon: 'fas fa-play-circle', label: 'Disney+', url: 'https://www.disneyplus.com/?gclsrc=aw.ds&cid=DSS-Search-Google-22379375030-&s_kwcid=AL!8468!3!799241479432!e!!g!!176704221029-333755866029&gad_source=1&gad_campaignid=22379375030&gbraid=0AAAAACzWEUHaduEJ7hocxSElQCdLjzWc1&gclid=Cj0KCQiA8KTNBhD_ARIsAOvp6DK_FZ_Shia6ogtNz1s260qlG3KfqQhV2Iy7OBZj_zj3Va1Zuz15zRQaAsmDEALw_wcB' },
      { icon: 'fas fa-tv', label: 'Apple TV', url: 'https://tv.apple.com/' },
      { icon: 'fas fa-tv', label: 'Plex', url: 'https://watch.plex.tv/' }
    ],
    streaming: [
      { icon: 'fas fa-video', label: 'Stream Manager', url: 'https://link.twitch.tv/StreamManager' },
      { icon: 'fab fa-twitch', label: 'Twitch', url: 'https://www.twitch.tv/' },
      { icon: 'fas fa-desktop', label: 'Streamlabs', url: 'https://streamlabs.com/?srsltid=AfmBOooSE3sKqdyGo5gbs1SUbO_3Qt21QLVTbbB-b9H6Z4auSAZFIAVQ' },
      { icon: 'fab fa-paypal', label: 'PayPal', url: 'https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later?utm_medium=google&utm_source=sem&utm_campaign=B0005P3V&kid=1060076159477&gclsrc=aw.ds&gad_source=1&gad_campaignid=23358056159&gbraid=0AAAAADsjovyG9lkJJTT859sexC3oW20jP&gclid=Cj0KCQiA8KTNBhD_ARIsAOvp6DIRz-KnceuqsuH_nhdH8RBs1m-Ebyg3PAPgE8tmf_AaZ7Tf6P4h3hcaAnTIEALw_wcB' },
      { icon: 'fas fa-broadcast-tower', label: 'StreamElements', url: 'https://streamelements.com/' },
      { icon: 'fas fa-file-alt', label: 'Google Docs', url: 'https://docs.google.com/document/u/0/?tgif=d' }
    ],
    work: [
      { icon: 'fas fa-th', label: 'My Apps', url: 'https://myapps.microsoft.com' },
      { icon: 'fas fa-chalkboard-teacher', label: 'Google Classroom', url: 'https://classroom.google.com' },
      { icon: 'fab fa-github', label: 'GitHub', url: 'https://github.com/' },
      { icon: 'fas fa-file-powerpoint', label: 'Google Slides', url: 'https://docs.google.com/presentation/u/0/?tgif=d' },
      { icon: 'fas fa-envelope', label: 'Gmail', url: 'https://mail.google.com' },
      { icon: 'fas fa-envelope', label: 'Authentication Portal', url: 'https://sites.google.com/a/pvlearners.net/authentication-portal/' },
      { icon: 'fas fa-school', label: 'Infinite Campus', url: 'https://www.infinitecampus.com' }
    ],
    social: [
      { icon: 'fab fa-tiktok', label: 'TikTok', url: 'https://www.tiktok.com' },
      { icon: 'fab fa-snapchat', label: 'Snapchat', url: 'https://www.snapchat.com' },
      { icon: 'fab fa-x-twitter', label: 'X', url: 'https://x.com/' },
      { icon: 'fab fa-discord', label: 'Discord', url: 'https://discord.com/' },
      { icon: 'fab fa-instagram', label: 'Instagram', url: 'https://www.instagram.com' },
      { icon: 'fab fa-youtube', label: 'YouTube', url: 'https://www.youtube.com' },
      { icon: 'fab fa-slack', label: 'Slack', url: 'https://app.slack.com/client/T06AT75R7LL/D0A41K9BQRZ' }
    ]
  };


  // Elements
  const timeEl = document.getElementById('time-greeting');
  const dateEl = document.getElementById('date-display');
  const themeBtn = document.getElementById('theme-toggle');
  const menuBtn = document.getElementById('menu-btn');
  const menuDropdown = document.getElementById('menu-dropdown');
  const titleEl = document.querySelector('.title-center h1');
  const categoryBtns = Array.from(document.querySelectorAll('.category-btn'));
  const notesEl = document.getElementById('notes');
  const saveNotesBtn = document.getElementById('save-notes');

  // Persistence keys
  const KEY_ACTIVE = 'activeTab';
  const KEY_THEME = 'theme';
  const KEY_BG = 'bgIndex';
  const KEY_NOTES = 'notes';

  let currentCategory = 'personal';

  // Initialize
  document.addEventListener('DOMContentLoaded', ()=>{
    initCategories();
    initMenuDropdown();
    initTheme();
    initTime();
    showGreetingPopup();
    initNotes();
    initSearch();
  });

  // Category selection and menu population
  function initCategories(){
    const saved = localStorage.getItem(KEY_ACTIVE) || 'personal';
    currentCategory = saved;
    setCategory(saved);
  }

  function setCategory(section){
    currentCategory = section;
    localStorage.setItem(KEY_ACTIVE, section);
    categoryBtns.forEach(btn=>btn.classList.toggle('active', btn.dataset.section === section));
    populateMenu(section);
  }

  function getFaviconUrl(siteUrl){
    try {
      const host = new URL(siteUrl).hostname;
      if(!host) return '';
      return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
    } catch {
      return '';
    }
  }

  function populateMenu(section){
    menuDropdown.innerHTML = '';
    const links = linkData[section] || [];
    links.forEach(link=>{
      const a = document.createElement('a');
      a.href = link.url;
      if(link.url !== '#') a.target = '_blank';
      const faviconUrl = getFaviconUrl(link.url);
      const faviconMarkup = faviconUrl
        ? `<img class="link-favicon" src="${faviconUrl}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';" />`
        : '';
      a.innerHTML = `${faviconMarkup}<i class="${link.icon}"></i><span>${link.label}</span>`;
      menuDropdown.appendChild(a);
    });
  }

  // Menu Dropdown
  function initMenuDropdown(){
    categoryBtns.forEach(btn=>btn.addEventListener('click', ()=>setCategory(btn.dataset.section)));
    menuBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      menuDropdown.hidden = !menuDropdown.hidden;
    });
    menuDropdown.addEventListener('click', (e)=>e.stopPropagation());
    document.addEventListener('click', ()=>{ menuDropdown.hidden = true; });
  }

  // Theme
  function initTheme(){
    const saved = localStorage.getItem(KEY_THEME) || 'neon';
    applyTheme(saved);
    themeBtn.addEventListener('click', ()=>{
      if(document.body.classList.contains('neon')) {
        applyTheme('calm');
      } else if(document.body.classList.contains('calm')) {
        applyTheme('purple');
      } else if(document.body.classList.contains('purple')) {
        applyTheme('purplefull');
      } else {
        applyTheme('neon');
      }
    });
  }

  function applyTheme(name){
    document.body.classList.remove('neon','calm','purple','purplefull');
    document.body.classList.add(name);
    localStorage.setItem(KEY_THEME, name);
  }

  // Time
  function initTime(){
    updateTime();
    setInterval(updateTime, 1000);
  }
  function updateTime(){
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    const time = `${h % 12}:${m}:${s}`;
    timeEl.textContent = time;
    if(dateEl){
      dateEl.textContent = now.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  }

  function showGreetingPopup(){
    const hour = new Date().getHours();
    const greet = hour<12 ? 'Good morning' : hour<18 ? 'Good afternoon' : 'Good evening';
    const popup = document.createElement('div');
    popup.className = 'greeting-popup';
    popup.setAttribute('role', 'status');
    popup.setAttribute('aria-live', 'polite');
    popup.innerHTML = `<img src="ChatGPT Image Mar 5, 2026, 11_18_29 PM.png" alt="Profile" class="greeting-image"><span>${greet}, Jaron</span>`;
    document.body.appendChild(popup);

    requestAnimationFrame(()=> popup.classList.add('show'));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const visibleDuration = prefersReducedMotion ? 2200 : 2600;
    setTimeout(()=>{
      popup.classList.remove('show');
      popup.classList.add('hide');
      setTimeout(()=> popup.remove(), prefersReducedMotion ? 100 : 380);
    }, visibleDuration);
  }

  // Notes
  function initNotes(){
    const notesToggleBtn = document.getElementById('notes-toggle');
    const notesContent = document.getElementById('notes-content');
    const notesVoiceBtn = document.getElementById('notes-voice-btn');
    const saved = localStorage.getItem(KEY_NOTES) || '';
    notesEl.value = saved;
    
    notesToggleBtn.addEventListener('click', ()=>{
      notesContent.hidden = !notesContent.hidden;
      notesToggleBtn.classList.toggle('open');
    });
    
    saveNotesBtn.addEventListener('click', ()=>{
      localStorage.setItem(KEY_NOTES, notesEl.value);
      saveNotesBtn.textContent = 'Saved!';
      setTimeout(()=>{ saveNotesBtn.textContent = 'Save'; }, 900);
    });

    if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const notesRecognition = new SpeechRecognition();
      notesRecognition.continuous = false;
      notesRecognition.interimResults = false;
      notesRecognition.lang = 'en-US';

      notesVoiceBtn.addEventListener('click', ()=>{
        notesRecognition.start();
        notesVoiceBtn.classList.add('listening');
      });

      notesRecognition.onresult = (event)=>{
        const transcript = event.results[0][0].transcript.trim();
        if(!transcript) return;
        if(notesEl.value && !notesEl.value.endsWith(' ')) notesEl.value += ' ';
        notesEl.value += transcript;
      };

      notesRecognition.onerror = (event)=>{
        console.warn('Notes speech recognition error:', event.error);
        notesVoiceBtn.classList.remove('listening');
        if(event.error === 'not-allowed'){
          alert('Microphone access denied. Please allow microphone access in browser settings.');
        }
      };

      notesRecognition.onend = ()=>{
        notesVoiceBtn.classList.remove('listening');
      };
    } else {
      notesVoiceBtn.classList.add('disabled');
      notesVoiceBtn.title = 'Voice dictation not supported in this browser';
      notesVoiceBtn.addEventListener('click', ()=>{
        alert('Voice dictation is not supported in this browser. Try Chrome or Edge.');
      });
    }
  }

  // Search
  function initSearch(){
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');
    const voiceBtn = document.getElementById('voice-btn');
    
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const query = input.value.trim();
      if(!query) return;
      if(query.includes('.') && !query.includes(' ')){
        const url = query.startsWith('http') ? query : 'https://'+query;
        window.location.href = url;
      } else {
        const searchUrl = 'https://www.google.com/search?q=';
        window.location.href = searchUrl + encodeURIComponent(query);
      }
      input.value = '';
    });
    
    document.addEventListener('keydown', (e)=>{
      if(e.key==='/') { input.focus(); e.preventDefault(); }
    });
    
    // Voice search
    if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      voiceBtn.addEventListener('click', ()=>{
        recognition.start();
        voiceBtn.classList.add('listening');
        input.placeholder = 'Listening...';
      });
      
      recognition.onresult = (event)=>{
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        voiceBtn.classList.remove('listening');
        input.placeholder = 'Search the web or type a URL';
      };
      
      recognition.onerror = (event)=>{
        console.warn('Speech recognition error:', event.error);
        voiceBtn.classList.remove('listening');
        input.placeholder = 'Search the web or type a URL';
        if(event.error === 'not-allowed'){
          alert('Microphone access denied. Please allow microphone access in browser settings.');
        }
      };
      
      recognition.onend = ()=>{
        voiceBtn.classList.remove('listening');
        input.placeholder = 'Search the web or type a URL';
      };
    } else {
      // Show button but disable it if not supported
      voiceBtn.classList.add('disabled');
      voiceBtn.title = 'Voice search not supported in this browser';
      voiceBtn.addEventListener('click', ()=>{
        alert('Voice search is not supported in this browser. Try Chrome or Edge.');
      });
    }
  }
})();
