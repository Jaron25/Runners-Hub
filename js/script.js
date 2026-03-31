// script.js - core interactions for the custom homepage
(function(){
  const STAR_CATEGORY = 'star';
  const CATEGORY_ORDER = [STAR_CATEGORY, 'personal', 'streaming', 'work', 'social'];
  const MAX_TABS = 6;
  const DEFAULT_SITE_NAME = 'Runners Hub';
  const DEFAULT_CATEGORY_LABELS = {
    star: 'Star',
    personal: 'Theater',
    streaming: 'Streaming',
    work: 'Work',
    social: 'Social'
  };

  // Link data organized by category
  const linkData = {
    star: [],
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
      { icon: 'fas fa-cloud', label: 'Drive Vault', url: 'https://drive.google.com' },
      { icon: 'fas fa-calendar-day', label: 'Calendar Hub', url: 'https://calendar.google.com' },
      { icon: 'fas fa-inbox', label: 'Outlook Mail', url: 'https://outlook.office.com/mail/' },
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

  CATEGORY_ORDER.forEach((category)=>{
    linkData[category] = (linkData[category] || []).map((link, index)=>(
      { ...link, id: getDefaultLinkId(category, link, index) }
    ));
  });


  // Elements
  const timeEl = document.getElementById('time-greeting');
  const weatherEl = document.getElementById('date-weather');
  const dateEl = document.getElementById('date-text') || document.getElementById('date-display');
  const themeOptionBtns = Array.from(document.querySelectorAll('.theme-option'));
  const settingsBtn = document.getElementById('settings-toggle');
  const settingsPanel = document.getElementById('settings-panel');
  const settingsBackdrop = document.getElementById('settings-backdrop');
  const settingsCloseBtn = document.getElementById('settings-close');
  const customLinkForm = document.getElementById('custom-link-form');
  const customLinkNameInput = document.getElementById('custom-link-name');
  const customLinkUrlInput = document.getElementById('custom-link-url');
  const customLinkCategorySelect = document.getElementById('custom-link-category');
  const customLinkFeedback = document.getElementById('custom-link-feedback');
  const customLinkListEl = document.getElementById('custom-link-list');
  const siteNameForm = document.getElementById('site-name-form');
  const siteNameInput = document.getElementById('site-name-input');
  const siteNameFeedback = document.getElementById('site-name-feedback');
  const resetSiteNameBtn = document.getElementById('reset-site-name');
  const tabSettingsListEl = document.getElementById('tab-settings-list');
  const tabSettingsFeedback = document.getElementById('tab-settings-feedback');
  const defaultLinkListEl = document.getElementById('default-link-list');
  const defaultLinkFeedback = document.getElementById('default-link-feedback');
  const resetDefaultLinksBtn = document.getElementById('reset-default-links');
  const bgUploadForm = document.getElementById('bg-upload-form');
  const bgNameInput = document.getElementById('bg-name-input');
  const bgFileInput = document.getElementById('bg-file-input');
  const bgFeedback = document.getElementById('bg-feedback');
  const bgGalleryEl = document.getElementById('bg-gallery');
  const menuBtn = document.getElementById('menu-btn');
  const menuDropdown = document.getElementById('menu-dropdown');
  const titleEl = document.querySelector('.title-center h1');
  const categoryBtnContainer = document.getElementById('category-buttons');
  const notesEl = document.getElementById('notes');
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoVoiceBtn = document.getElementById('todo-voice-btn');
  const todoListEl = document.getElementById('todo-list');

  // Persistence keys
  const KEY_ACTIVE = 'activeTab';
  const KEY_THEME = 'theme';
  const KEY_BG = 'bgIndex';
  const KEY_NOTES_TEXT = 'notesText';
  const KEY_TODOS = 'todos';
  const KEY_CUSTOM_LINKS = 'customLinks';
  const KEY_SITE_NAME = 'siteName';
  const KEY_EXTRA_TABS = 'extraTabs';
  const KEY_TAB_NAMES = 'tabNames';
  const KEY_HIDDEN_DEFAULT_LINKS = 'hiddenDefaultLinks';
  const KEY_STAR_LINKS = 'starLinks';
  const KEY_BG_GALLERY = 'bgGallery';
  const KEY_ACTIVE_BG = 'activeBg';

  const SCOTTSDALE_LAT = 33.4942;
  const SCOTTSDALE_LON = -111.9261;
  const THEME_ORDER = ['goodpink', 'goodnight', 'neon', 'calm', 'purple', 'purplefull', 'green', 'whitechill'];

  let currentCategory = 'personal';
  let siteName = getSiteName();
  let extraTabs = getExtraTabs();
  let customLinks = getCustomLinks();
  let starLinks = getStarLinks();
  let categoryNames = getCategoryNames();
  let hiddenDefaultLinks = getHiddenDefaultLinks();

  // Initialize
  document.addEventListener('DOMContentLoaded', ()=>{
    applySiteName(siteName);
    initBootScreen(()=>{
      initCategories();
      initMenuDropdown();
      initSettings();
      initTheme();
      initTime();
      initWeather();
      showGreetingPopup();
      initNotes();
      initTodos();
      initSearch();
      initBgGallery();
      initTitleGlitch();
    });
  });

  function initBootScreen(onComplete){

    const screen   = document.getElementById('boot-screen');
    const titleEl  = document.getElementById('boot-title');
    const subEl    = document.getElementById('boot-subtitle');
    const barEl    = document.getElementById('boot-bar');
    const statusEl = document.getElementById('boot-status');
    if(!screen){ onComplete(); return; }

    // Dynamically set boot screen background to match theme
    const bodyStyles = window.getComputedStyle(document.body);
    // Use the full computed background property for best match
    let bootBg = bodyStyles.background;
    // fallback to accent color if no background
    if(!bootBg || bootBg === 'none' || bootBg === '') {
      const accent = bodyStyles.getPropertyValue('--accent');
      bootBg = accent || '#00060e';
    }
    // Set CSS variable so it overrides the static CSS
    screen.style.setProperty('--boot-bg', bootBg);

    // Letter scramble glitch effect
    const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&!?[]{}';
    const ORIGINAL_TITLE = getBootTitle(siteName);

    if(titleEl){
      titleEl.textContent = ORIGINAL_TITLE;
    }

    function scrambleTitle(){
      const chars = ORIGINAL_TITLE.split('');
      const glitched = chars.map((ch)=>{
        if(ch === ' ') return ' ';
        return Math.random() < 0.45
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : ch;
      });
      titleEl.textContent = glitched.join('');
    }

    function resolveTitle(){
      titleEl.textContent = ORIGINAL_TITLE;
    }

    // Run a burst: scramble rapidly for ~200ms then resolve
    function runGlitchBurst(){
      let ticks = 0;
      const total = 6;
      const interval = setInterval(()=>{
        scrambleTitle();
        ticks++;
        if(ticks >= total){
          clearInterval(interval);
          resolveTitle();
        }
      }, 35);
    }

    // Fire bursts at irregular intervals while boot screen is visible
    let glitchTimeout;
    function scheduleGlitch(){
      const delay = 300 + Math.random() * 600;
      glitchTimeout = setTimeout(()=>{
        runGlitchBurst();
        scheduleGlitch();
      }, delay);
    }
    scheduleGlitch();

    const steps = [
      { pct: 15,  sub: 'LOADING SYSTEM CORE',       status: 'MOUNTING MODULES...'    },
      { pct: 38,  sub: 'CALIBRATING INTERFACE',      status: 'SYNCING COMPONENTS...'  },
      { pct: 60,  sub: 'ESTABLISHING CONNECTION',    status: 'FETCHING DATA...'        },
      { pct: 80,  sub: 'ACTIVATING HUB NETWORK',     status: 'ALMOST READY...'        },
      { pct: 100, sub: 'SYSTEM ONLINE',              status: 'WELCOME BACK.'          }
    ];

    const delays = [0, 480, 900, 1340, 1750];

    steps.forEach((step, i)=>{
      setTimeout(()=>{
        barEl.style.transition = 'width 0.45s cubic-bezier(0.4,0,0.2,1)';
        barEl.style.width = step.pct + '%';
        subEl.textContent  = step.sub;
        statusEl.textContent = step.status;
      }, delays[i]);
    });

    setTimeout(()=>{
      clearTimeout(glitchTimeout);
      resolveTitle();
      screen.classList.add('boot-hiding');
      screen.addEventListener('animationend', ()=>{
        screen.remove();
        onComplete();
      }, { once: true });
    }, 2350);
  }

  // Category selection and menu population
  function initCategories(){
    renderCategoryButtons();
    syncCategorySelectOptions();
    const saved = localStorage.getItem(KEY_ACTIVE) || 'personal';
    const nextCategory = isValidCategory(saved) ? saved : 'personal';
    currentCategory = nextCategory;
    setCategory(nextCategory);
  }

  function setCategory(section){
    if(!isValidCategory(section)) return;
    currentCategory = section;
    localStorage.setItem(KEY_ACTIVE, section);
    document.querySelectorAll('.category-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.section === section));
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
    const links = section === STAR_CATEGORY
      ? [...starLinks, ...(customLinks[STAR_CATEGORY] || [])]
      : [
        ...getVisibleDefaultLinks(section),
        ...(customLinks[section] || [])
      ];

    if(!links.length){
      const empty = document.createElement('div');
      empty.className = 'menu-empty';
      empty.textContent = section === STAR_CATEGORY
        ? 'No starred links yet. Click the star beside any link.'
        : 'No links available in this tab.';
      menuDropdown.appendChild(empty);
      return;
    }

    links.forEach(link=>{
      const linkId = String(link.id || '');
      const isStarred = isLinkStarred(linkId);

      const row = document.createElement('div');
      row.className = 'menu-link-item';

      const a = document.createElement('a');
      a.className = 'menu-link-anchor';
      a.href = link.url;
      if(link.url !== '#') a.target = '_blank';
      const faviconUrl = getFaviconUrl(link.url);
      const faviconMarkup = faviconUrl
        ? `<img class="link-favicon" src="${faviconUrl}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';" />`
        : '';
      a.innerHTML = `${faviconMarkup}<i class="${link.icon}"></i><span>${link.label}</span>`;

      const starBtn = document.createElement('button');
      starBtn.type = 'button';
      starBtn.className = `menu-link-star${isStarred ? ' active' : ''}`;
      starBtn.setAttribute('aria-label', isStarred ? 'Remove from Star tab' : 'Add to Star tab');
      starBtn.setAttribute('title', isStarred ? 'Remove from Star tab' : 'Add to Star tab');
      // Use a sheep emoji instead of a star icon
      // Use a visible star icon (Unicode star)
      starBtn.innerHTML = isStarred ? '★' : '☆';
      starBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        toggleStarLink({
          id: linkId,
          icon: link.icon || 'fas fa-link',
          label: link.label || 'Link',
          url: link.url || '#'
        });
        populateMenu(currentCategory);
      });

      row.appendChild(a);
      row.appendChild(starBtn);
      menuDropdown.appendChild(row);
    });
  }

  // Menu Dropdown
  function initMenuDropdown(){
    if(menuBtn) menuBtn.setAttribute('aria-expanded', 'false');

    const setMenuOpen = (isOpen)=>{
      menuDropdown.hidden = !isOpen;
      if(menuBtn) menuBtn.setAttribute('aria-expanded', String(isOpen));
    };

    menuBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      setMenuOpen(menuDropdown.hidden);
    });
    menuDropdown.addEventListener('click', (e)=>e.stopPropagation());
    document.addEventListener('click', ()=>{
      setMenuOpen(false);
    });
  }

  function initSettings(){
    if(!settingsBtn || !settingsPanel || !settingsBackdrop) return;

    const setSettingsOpen = (isOpen)=>{
      settingsBackdrop.hidden = !isOpen;
      settingsPanel.hidden = !isOpen;
      settingsBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('settings-open', isOpen);
      if(isOpen){
        if(siteNameInput) siteNameInput.value = siteName;
        renderTabSettingsList();
        renderDefaultLinksList();
        renderCustomLinksList();
        syncCategorySelectOptions();
        renderBgGallery();
      }
    };

    setSettingsOpen(false);

    settingsBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const nextOpen = settingsPanel.hidden;
      setSettingsOpen(nextOpen);
      if(nextOpen && menuDropdown && menuBtn){
        menuDropdown.hidden = true;
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    if(settingsCloseBtn){
      settingsCloseBtn.addEventListener('click', ()=>setSettingsOpen(false));
    }

    settingsBackdrop.addEventListener('click', ()=>setSettingsOpen(false));
    settingsPanel.addEventListener('click', (e)=>e.stopPropagation());

    if(customLinkForm){
      customLinkForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = customLinkNameInput ? customLinkNameInput.value.trim() : '';
        const rawUrl = customLinkUrlInput ? customLinkUrlInput.value.trim() : '';
        const category = customLinkCategorySelect ? customLinkCategorySelect.value : '';

        if(!name || !rawUrl || !isValidCategory(category)){
          setCustomLinkFeedback('Add name, URL, and category first.');
          return;
        }

        const normalizedUrl = normalizeLinkUrl(rawUrl);
        if(!normalizedUrl){
          setCustomLinkFeedback('Enter a valid URL. Example: https://example.com');
          return;
        }

        const customLink = {
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          icon: 'fas fa-link',
          label: name,
          url: normalizedUrl
        };

        customLinks[category].unshift(customLink);
        saveCustomLinks(customLinks);
        setCustomLinkFeedback(`Added "${name}" to ${getCategoryLabel(category)}.`);
        renderCustomLinksList();

        if(customLinkNameInput) customLinkNameInput.value = '';
        if(customLinkUrlInput) customLinkUrlInput.value = '';

        if(currentCategory === category){
          populateMenu(category);
        }
      });
    }

    if(siteNameForm){
      siteNameForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const nextName = siteNameInput ? siteNameInput.value.trim() : '';
        siteName = nextName || DEFAULT_SITE_NAME;
        saveSiteName(siteName);
        applySiteName(siteName);
        if(siteNameInput) siteNameInput.value = siteName;
        setSiteNameFeedback('Website name updated. Boot title will use it on the next load.');
      });
    }

    if(resetSiteNameBtn){
      resetSiteNameBtn.addEventListener('click', ()=>{
        siteName = DEFAULT_SITE_NAME;
        saveSiteName(siteName);
        applySiteName(siteName);
        if(siteNameInput) siteNameInput.value = siteName;
        setSiteNameFeedback('Website name reset to default.');
      });
    }

    if(tabSettingsListEl){
      tabSettingsListEl.addEventListener('click', (e)=>{
        const deleteBtn = e.target.closest('.tab-delete-btn');
        if(!deleteBtn) return;
        const key = deleteBtn.dataset.key || '';
        if(!key || !extraTabs.some(t => t.key === key)) return;
        const removedIds = (customLinks[key] || []).map((link)=>String(link.id));
        removedIds.forEach((id)=>removeStarLinkById(id));
        extraTabs = extraTabs.filter(t => t.key !== key);
        saveExtraTabs(extraTabs);
        delete customLinks[key];
        saveCustomLinks(customLinks);
        renderCategoryButtons();
        syncCategorySelectOptions();
        renderTabSettingsList();
        renderCustomLinksList();
        setTabSettingsFeedback('Tab deleted.');
        if(currentCategory === key){
          currentCategory = 'personal';
          localStorage.setItem(KEY_ACTIVE, currentCategory);
          populateMenu(currentCategory);
        }
      });

      tabSettingsListEl.addEventListener('submit', (e)=>{
        const form = e.target.closest('.tab-settings-form');
        if(!form) return;
        e.preventDefault();

        const category = form.dataset.category || '';
        if(!isValidCategory(category)) return;

        const input = form.querySelector('.tab-name-input');
        const nextName = input ? input.value.trim() : '';
        const fallback = extraTabs.find(t => t.key === category)?.label || DEFAULT_CATEGORY_LABELS[category] || category;
        categoryNames[category] = nextName || fallback;
        saveCategoryNames(categoryNames);
        renderCategoryButtons();
        syncCategorySelectOptions();
        renderTabSettingsList();
        renderDefaultLinksList();
        renderCustomLinksList();
        setTabSettingsFeedback(`${getCategoryLabel(category)} tab updated.`);
      });
    }

    const addTabForm = document.getElementById('add-tab-form');
    const addTabNameInput = document.getElementById('add-tab-name');
    const addTabFeedback = document.getElementById('add-tab-feedback');

    if(addTabForm){
      addTabForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const tabName = addTabNameInput ? addTabNameInput.value.trim() : '';
        if(!tabName) return;
        const baseTabCount = CATEGORY_ORDER.filter((category)=>category !== STAR_CATEGORY).length;
        if(baseTabCount + extraTabs.length >= MAX_TABS){
          if(addTabFeedback) addTabFeedback.textContent = `Maximum ${MAX_TABS} tabs allowed.`;
          return;
        }
        const key = `extra_${Date.now()}`;
        extraTabs = [...extraTabs, { key, label: tabName }];
        saveExtraTabs(extraTabs);
        customLinks[key] = [];
        saveCustomLinks(customLinks);
        renderCategoryButtons();
        syncCategorySelectOptions();
        renderTabSettingsList();
        if(addTabFeedback) addTabFeedback.textContent = `Tab "${tabName}" added.`;
        if(addTabNameInput) addTabNameInput.value = '';
      });
    }

    if(customLinkListEl){
      customLinkListEl.addEventListener('click', (e)=>{
        const deleteBtn = e.target.closest('.custom-link-delete');
        if(!deleteBtn) return;

        const category = deleteBtn.dataset.category || '';
        const linkId = deleteBtn.dataset.id || '';
        if(!isValidCategory(category) || !linkId) return;

        const beforeCount = customLinks[category].length;
        customLinks[category] = customLinks[category].filter((link)=>String(link.id) !== linkId);
        if(customLinks[category].length === beforeCount) return;

        removeStarLinkById(linkId);

        saveCustomLinks(customLinks);
        renderCustomLinksList();
        setCustomLinkFeedback('Custom link removed.');

        if(currentCategory === category){
          populateMenu(category);
        }
      });
    }

    if(defaultLinkListEl){
      defaultLinkListEl.addEventListener('click', (e)=>{
        const toggleBtn = e.target.closest('.default-link-toggle');
        if(!toggleBtn) return;

        const category = toggleBtn.dataset.category || '';
        const linkId = toggleBtn.dataset.id || '';
        const action = toggleBtn.dataset.action || '';
        if(!isValidCategory(category) || !linkId) return;

        if(action === 'remove'){
          if(hiddenDefaultLinks.includes(linkId)) return;
          hiddenDefaultLinks = [...hiddenDefaultLinks, linkId];
          saveHiddenDefaultLinks(hiddenDefaultLinks);
          setDefaultLinkFeedback('Main link removed.');
        } else if(action === 'restore'){
          if(!hiddenDefaultLinks.includes(linkId)) return;
          hiddenDefaultLinks = hiddenDefaultLinks.filter((id)=>id !== linkId);
          saveHiddenDefaultLinks(hiddenDefaultLinks);
          setDefaultLinkFeedback('Main link restored.');
        } else {
          return;
        }

        renderDefaultLinksList();

        if(currentCategory === category){
          populateMenu(category);
        }
      });
    }

    if(resetDefaultLinksBtn){
      resetDefaultLinksBtn.addEventListener('click', ()=>{
        hiddenDefaultLinks = [];
        saveHiddenDefaultLinks(hiddenDefaultLinks);
        renderDefaultLinksList();
        setDefaultLinkFeedback('Main links restored.');
        populateMenu(currentCategory);
      });
    }

    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        setSettingsOpen(false);
      }
    });
  }

  // Background Gallery
  function getBgGallery(){
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_BG_GALLERY) || '[]');
      if(!Array.isArray(parsed)) return [];
      return parsed.filter(item =>
        item && typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.dataUrl === 'string'
      );
    } catch {
      return [];
    }
  }

  function saveBgGallery(gallery){
    localStorage.setItem(KEY_BG_GALLERY, JSON.stringify(gallery));
  }

  function applyBackground(dataUrl){
    document.body.style.backgroundImage = dataUrl ? `url("${dataUrl}")` : '';
  }

  function setBgFeedback(message){
    if(!bgFeedback) return;
    bgFeedback.textContent = message;
  }

  function renderBgGallery(){
    if(!bgGalleryEl) return;
    const gallery = getBgGallery();
    const activeId = localStorage.getItem(KEY_ACTIVE_BG) || '';
    bgGalleryEl.innerHTML = '';

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'bg-reset-btn' + (!activeId ? ' active-bg' : '');
    resetBtn.textContent = 'Default Background V1';
    resetBtn.addEventListener('click', ()=>{
      localStorage.removeItem(KEY_ACTIVE_BG);
      applyBackground(null);
      renderBgGallery();
    });
    bgGalleryEl.appendChild(resetBtn);

    if(!gallery.length){
      const empty = document.createElement('div');
      empty.className = 'bg-gallery-empty';
      empty.textContent = 'No backgrounds yet. Add one above.';
      bgGalleryEl.appendChild(empty);
      return;
    }

    gallery.forEach(item => {
      const el = document.createElement('div');
      el.className = 'bg-gallery-item' + (item.id === activeId ? ' active-bg' : '');
      el.dataset.id = item.id;

      const img = document.createElement('img');
      img.src = item.dataUrl;
      img.alt = item.name;

      const label = document.createElement('div');
      label.className = 'bg-gallery-label';
      label.textContent = item.name;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'bg-gallery-delete';
      deleteBtn.setAttribute('aria-label', `Delete ${item.name}`);
      deleteBtn.setAttribute('title', 'Delete background');
      deleteBtn.dataset.id = item.id;
      deleteBtn.innerHTML = '<span aria-hidden="true">✕</span>';

      el.appendChild(img);
      el.appendChild(label);
      el.appendChild(deleteBtn);
      bgGalleryEl.appendChild(el);
    });
  }

  function initBgGallery(){
    const activeId = localStorage.getItem(KEY_ACTIVE_BG);
    if(activeId){
      const gallery = getBgGallery();
      const active = gallery.find(item => item.id === activeId);
      if(active){
        applyBackground(active.dataUrl);
      } else {
        localStorage.removeItem(KEY_ACTIVE_BG);
      }
    }

    if(!bgUploadForm) return;

    bgUploadForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = bgNameInput ? bgNameInput.value.trim() : '';
      const file = bgFileInput && bgFileInput.files ? bgFileInput.files[0] : null;

      if(!name || !file){
        setBgFeedback('Enter a name and choose an image.');
        return;
      }
      if(!file.type.startsWith('image/')){
        setBgFeedback('Please choose an image file.');
        return;
      }
      if(file.size > 15 * 1024 * 1024){
        setBgFeedback('Image too large. Please use an image under 15MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev)=>{
        const img = new Image();
        img.onload = ()=>{
          // Compress via canvas — max 1920px wide, 0.85 quality JPEG
          const MAX = 1920;
          let w = img.width, h = img.height;
          if(w > MAX){ h = Math.round(h * MAX / w); w = MAX; }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const gallery = getBgGallery();
          const entry = {
            id: `bg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name,
            dataUrl
          };
          try {
            gallery.push(entry);
            saveBgGallery(gallery);
            setBgFeedback(`"${name}" added to gallery.`);
            if(bgUploadForm) bgUploadForm.reset();
            renderBgGallery();
          } catch(err){
            if(err && err.name === 'QuotaExceededError'){
              setBgFeedback('Storage full. Delete a background first.');
            } else {
              setBgFeedback('Failed to save. Try a smaller image.');
            }
          }
        };
        img.onerror = ()=>setBgFeedback('Failed to load image.');
        img.src = ev.target.result;
      };
      reader.onerror = ()=>setBgFeedback('Failed to read image file.');
      reader.readAsDataURL(file);
    });

    if(bgGalleryEl){
      bgGalleryEl.addEventListener('click', (e)=>{
        const deleteBtn = e.target.closest('.bg-gallery-delete');
        if(deleteBtn){
          const id = deleteBtn.dataset.id;
          let gallery = getBgGallery();
          gallery = gallery.filter(item => item.id !== id);
          saveBgGallery(gallery);
          if(localStorage.getItem(KEY_ACTIVE_BG) === id){
            localStorage.removeItem(KEY_ACTIVE_BG);
            applyBackground(null);
          }
          renderBgGallery();
          return;
        }

        const item = e.target.closest('.bg-gallery-item');
        if(item){
          const id = item.dataset.id;
          const gallery = getBgGallery();
          const found = gallery.find(bg => bg.id === id);
          if(found){
            localStorage.setItem(KEY_ACTIVE_BG, id);
            applyBackground(found.dataUrl);
            renderBgGallery();
          }
        }
      });
    }

    renderBgGallery();
  }

  function initTitleGlitch(){
    const h1 = document.querySelector('.title-center h1');
    if(!h1) return;

    const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&!?[]{}';
    let isGlitching = false;

    h1.textContent = siteName;
    h1.setAttribute('data-text', siteName);
    h1.classList.add('title-ready');

    function scrambleOverlayText(){
      const scrambled = siteName
        .split('')
        .map((ch)=>{
          if(ch === ' ') return ' ';
          return Math.random() < 0.45
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : ch;
        })
        .join('');
      h1.setAttribute('data-text', scrambled);
    }

    function restoreOverlayText(){
      h1.textContent = siteName;
      h1.setAttribute('data-text', siteName);
    }

    function runGlitch(){
      if(isGlitching) return;
      isGlitching = true;
      h1.classList.add('title-glitch-active');

      let ticks = 0;
      const total = 6;
      const interval = setInterval(()=>{
        scrambleOverlayText();
        ticks++;
        if(ticks >= total){
          clearInterval(interval);
          restoreOverlayText();
          h1.classList.remove('title-glitch-active');
          isGlitching = false;
        }
      }, 35);
    }

    function schedule(){
      const delay = 7000 + Math.random() * 9000;
      setTimeout(()=>{
        runGlitch();
        schedule();
      }, delay);
    }

    setTimeout(schedule, 1200);
  }

  function setCustomLinkFeedback(message){
    if(!customLinkFeedback) return;
    customLinkFeedback.textContent = message;
  }

  function setSiteNameFeedback(message){
    if(!siteNameFeedback) return;
    siteNameFeedback.textContent = message;
  }

  function setTabSettingsFeedback(message){
    if(!tabSettingsFeedback) return;
    tabSettingsFeedback.textContent = message;
  }

  function setDefaultLinkFeedback(message){
    if(!defaultLinkFeedback) return;
    defaultLinkFeedback.textContent = message;
  }

  function getCategoryLabel(category){
    if(categoryNames[category]) return categoryNames[category];
    const extraTab = extraTabs.find(t => t.key === category);
    if(extraTab) return extraTab.label;
    return DEFAULT_CATEGORY_LABELS[category] || category;
  }

  function renderCategoryButtons(){
    if(!categoryBtnContainer) return;
    categoryBtnContainer.innerHTML = '';
    getAllCategories().forEach((category)=>{
      const btn = document.createElement('button');
      btn.className = 'category-btn';
      btn.dataset.section = category;
      btn.textContent = getCategoryLabel(category);
      if(category === currentCategory) btn.classList.add('active');
      btn.addEventListener('click', ()=>setCategory(category));
      categoryBtnContainer.appendChild(btn);
    });
  }

  function applySiteName(value){
    const nextName = value && value.trim() ? value.trim() : DEFAULT_SITE_NAME;
    siteName = nextName;
    if(titleEl){
      titleEl.textContent = nextName;
      titleEl.setAttribute('data-text', nextName);
      titleEl.classList.add('title-ready');
    }
    const bootTitleEl = document.getElementById('boot-title');
    if(bootTitleEl){
      bootTitleEl.textContent = getBootTitle(nextName);
    }
    document.title = nextName;
  }

  function syncCategorySelectOptions(){
    if(!customLinkCategorySelect) return;
    customLinkCategorySelect.innerHTML = '';
    getAllCategories().filter((category)=>category !== STAR_CATEGORY).forEach((category)=>{
      const option = document.createElement('option');
      option.value = category;
      option.textContent = getCategoryLabel(category);
      customLinkCategorySelect.appendChild(option);
    });
  }

  function renderTabSettingsList(){
    if(!tabSettingsListEl) return;

    tabSettingsListEl.innerHTML = '';

    getAllCategories().filter((category)=>category !== STAR_CATEGORY).forEach((category)=>{
      const isExtra = extraTabs.some(t => t.key === category);
      const defaultLabel = isExtra
        ? (extraTabs.find(t => t.key === category)?.label || category)
        : (DEFAULT_CATEGORY_LABELS[category] || category);

      const item = document.createElement('div');
      item.className = 'tab-settings-item';
      item.innerHTML = `
        <form class="tab-settings-form" data-category="${escapeHtml(category)}">
          <div class="tab-settings-label-row">
            <span class="tab-settings-label">${escapeHtml(defaultLabel)} Tab</span>
            ${isExtra ? `<button class="tab-delete-btn" type="button" data-key="${escapeHtml(category)}" aria-label="Delete tab" title="Delete tab">X</button>` : ''}
          </div>
          <div class="tab-settings-row">
            <input class="tab-name-input" type="text" maxlength="24" value="${escapeHtml(getCategoryLabel(category))}" aria-label="Rename ${escapeHtml(defaultLabel)} tab">
            <button class="btn small" type="submit">Save</button>
          </div>
        </form>
      `;
      tabSettingsListEl.appendChild(item);
    });
  }

  function renderDefaultLinksList(){
    if(!defaultLinkListEl) return;

    defaultLinkListEl.innerHTML = '';

    const baseCategories = CATEGORY_ORDER.filter((category)=>category !== STAR_CATEGORY);
    const totalLinks = baseCategories.reduce((count, category)=>{
      return count + (linkData[category] || []).length;
    }, 0);

    if(!totalLinks){
      const emptyItem = document.createElement('li');
      emptyItem.className = 'custom-link-empty';
      emptyItem.textContent = 'No main links available.';
      defaultLinkListEl.appendChild(emptyItem);
      return;
    }

    baseCategories.forEach((category, index)=>{
      const links = (linkData[category] || []).map((link)=>({ ...link, category }));
      if(!links.length) return;

      const activeCount = links.filter((link)=>!hiddenDefaultLinks.includes(String(link.id))).length;
      const removedCount = links.length - activeCount;

      const groupItem = document.createElement('li');
      groupItem.className = 'default-link-group';
      groupItem.innerHTML = `
        <details class="default-link-details" ${index === 0 ? 'open' : ''}>
          <summary class="default-link-summary">
            <span class="default-link-summary-name">${escapeHtml(getCategoryLabel(category))}</span>
            <span class="default-link-summary-counts">${activeCount} active${removedCount ? ` • ${removedCount} removed` : ''}</span>
          </summary>
          <ul class="default-link-group-list"></ul>
        </details>
      `;

      const groupList = groupItem.querySelector('.default-link-group-list');
      links.forEach((link)=>{
        const linkId = String(link.id);
        const isHidden = hiddenDefaultLinks.includes(linkId);
        const item = document.createElement('li');
        item.className = 'custom-link-item';
        item.innerHTML = `
          <div class="custom-link-meta">
            <div class="custom-link-label">${escapeHtml(link.label)}</div>
            <div class="custom-link-category">${escapeHtml(getCategoryLabel(link.category))} • ${isHidden ? 'Removed' : 'Active'}</div>
          </div>
          <button class="custom-link-delete default-link-toggle${isHidden ? ' restore' : ''}" type="button" aria-label="${isHidden ? 'Restore main link' : 'Remove main link'}" title="${isHidden ? 'Restore main link' : 'Remove main link'}" data-action="${isHidden ? 'restore' : 'remove'}" data-id="${escapeHtml(linkId)}" data-category="${escapeHtml(link.category)}">
            <span aria-hidden="true">${isHidden ? 'Restore' : 'Remove'}</span>
          </button>
        `;
        if(groupList) groupList.appendChild(item);
      });

      defaultLinkListEl.appendChild(groupItem);
    });
  }

  function getVisibleDefaultLinks(category){
    return (linkData[category] || []).filter((link)=>!hiddenDefaultLinks.includes(String(link.id)));
  }

  function renderCustomLinksList(){
    if(!customLinkListEl) return;

    const allLinks = [];
    getAllCategories().forEach((category)=>{
      (customLinks[category] || []).forEach((link)=>{
        allLinks.push({ ...link, category });
      });
    });

    customLinkListEl.innerHTML = '';

    if(!allLinks.length){
      const emptyItem = document.createElement('li');
      emptyItem.className = 'custom-link-empty';
      emptyItem.textContent = 'No custom links yet.';
      customLinkListEl.appendChild(emptyItem);
      return;
    }

    allLinks.forEach((link)=>{
      const item = document.createElement('li');
      item.className = 'custom-link-item';
      item.innerHTML = `
        <div class="custom-link-meta">
          <div class="custom-link-label">${escapeHtml(link.label)}</div>
          <div class="custom-link-category">${getCategoryLabel(link.category)}</div>
        </div>
        <button class="custom-link-delete" type="button" aria-label="Delete custom link" title="Delete" data-id="${escapeHtml(String(link.id))}" data-category="${escapeHtml(link.category)}">
          <span aria-hidden="true">X</span>
        </button>
      `;
      customLinkListEl.appendChild(item);
    });
  }

  function getEmptyCustomLinks(){
    return getAllCategories().reduce((result, category)=>{
      result[category] = [];
      return result;
    }, {});
  }

  function getAllCategories(){
    return [...CATEGORY_ORDER, ...extraTabs.map(t => t.key)];
  }

  function isValidCategory(category){
    return Object.prototype.hasOwnProperty.call(linkData, category) ||
      extraTabs.some(t => t.key === category);
  }

  function getCategoryNames(){
    const defaults = { ...DEFAULT_CATEGORY_LABELS };
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_TAB_NAMES) || '{}');
      getAllCategories().forEach((category)=>{
        if(typeof parsed?.[category] === 'string' && parsed[category].trim()){
          defaults[category] = parsed[category].trim();
        }
      });
      return defaults;
    } catch {
      return defaults;
    }
  }

  function saveCategoryNames(value){
    localStorage.setItem(KEY_TAB_NAMES, JSON.stringify(value));
  }

  function getExtraTabs(){
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_EXTRA_TABS) || '[]');
      if(!Array.isArray(parsed)) return [];
      return parsed
        .filter(t => t && typeof t.key === 'string' && typeof t.label === 'string' && t.key && t.label)
        .slice(0, MAX_TABS - CATEGORY_ORDER.filter((category)=>category !== STAR_CATEGORY).length);
    } catch {
      return [];
    }
  }

  function saveExtraTabs(value){
    localStorage.setItem(KEY_EXTRA_TABS, JSON.stringify(value));
  }

  function getSiteName(){
    try {
      const saved = localStorage.getItem(KEY_SITE_NAME) || '';
      return saved.trim() || DEFAULT_SITE_NAME;
    } catch {
      return DEFAULT_SITE_NAME;
    }
  }

  function saveSiteName(value){
    localStorage.setItem(KEY_SITE_NAME, value);
  }

  function getHiddenDefaultLinks(){
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_HIDDEN_DEFAULT_LINKS) || '[]');
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }

  function saveHiddenDefaultLinks(value){
    localStorage.setItem(KEY_HIDDEN_DEFAULT_LINKS, JSON.stringify(value));
  }

  function getDefaultLinkId(category, link, index){
    return `${category}:${slugify(link.label)}:${index}`;
  }

  function getBootTitle(value){
    return (value || DEFAULT_SITE_NAME).toUpperCase();
  }

  function slugify(value){
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'link';
  }

  function getCustomLinks(){
    const empty = getEmptyCustomLinks();
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_CUSTOM_LINKS) || '{}');
      const result = getEmptyCustomLinks();
      Object.keys(empty).forEach((category)=>{
        const entries = Array.isArray(parsed?.[category]) ? parsed[category] : [];
        result[category] = entries
          .filter((item)=> item && typeof item.label === 'string' && typeof item.url === 'string')
          .map((item)=>({
            id: String(item.id || `${Date.now()}-${Math.floor(Math.random() * 1000)}`),
            icon: 'fas fa-link',
            label: item.label.trim(),
            url: item.url.trim()
          }))
          .filter((item)=>item.label && item.url);
      });
      return result;
    } catch {
      return empty;
    }
  }

  function saveCustomLinks(value){
    localStorage.setItem(KEY_CUSTOM_LINKS, JSON.stringify(value));
  }

  function getStarLinks(){
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_STAR_LINKS) || '[]');
      if(!Array.isArray(parsed)) return [];
      return parsed
        .filter((item)=> item && typeof item.id === 'string' && typeof item.label === 'string' && typeof item.url === 'string')
        .map((item)=>(
          {
            id: String(item.id),
            icon: typeof item.icon === 'string' && item.icon.trim() ? item.icon : 'fas fa-link',
            label: item.label.trim(),
            url: item.url.trim()
          }
        ))
        .filter((item)=>item.id && item.label && item.url);
    } catch {
      return [];
    }
  }

  function saveStarLinks(value){
    localStorage.setItem(KEY_STAR_LINKS, JSON.stringify(value));
  }

  function isLinkStarred(linkId){
    const id = String(linkId || '');
    if(!id) return false;
    return starLinks.some((link)=>String(link.id) === id);
  }

  function toggleStarLink(link){
    const id = String(link?.id || '');
    if(!id) return;

    if(isLinkStarred(id)){
      starLinks = starLinks.filter((item)=>String(item.id) !== id);
    } else {
      starLinks = [
        {
          id,
          icon: link.icon || 'fas fa-link',
          label: String(link.label || 'Link'),
          url: String(link.url || '#')
        },
        ...starLinks
      ];
    }

    saveStarLinks(starLinks);
  }

  function removeStarLinkById(linkId){
    const id = String(linkId || '');
    if(!id) return;
    const before = starLinks.length;
    starLinks = starLinks.filter((item)=>String(item.id) !== id);
    if(before !== starLinks.length){
      saveStarLinks(starLinks);
      if(currentCategory === STAR_CATEGORY){
        populateMenu(STAR_CATEGORY);
      }
    }
  }

  function normalizeLinkUrl(value){
    const candidate = value.includes('://') ? value : `https://${value}`;
    try {
      const parsed = new URL(candidate);
      if(!parsed.hostname) return '';
      if(parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
      return parsed.toString();
    } catch {
      return '';
    }
  }

  // Theme
  function initTheme(){
    const saved = localStorage.getItem(KEY_THEME) || 'neon';
    applyTheme(saved);
    if(!themeOptionBtns.length) return;

    themeOptionBtns.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
        const selectedTheme = btn.dataset.theme || '';
        applyTheme(selectedTheme);
      });
    });
  }

  function getCurrentTheme(){
    const found = THEME_ORDER.find((theme)=>document.body.classList.contains(theme));
    return found || 'neon';
  }

  function applyTheme(name){
    const themeName = THEME_ORDER.includes(name) ? name : 'neon';
    document.body.classList.remove('goodpink','goodnight','neon','calm','purple','purplefull','green','whitechill','grayblack','redred');
    document.body.classList.add(themeName);
    localStorage.setItem(KEY_THEME, themeName);

    themeOptionBtns.forEach((btn)=>{
      const isActive = (btn.dataset.theme || '') === themeName;
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  // Time
  function initTime(){
    updateTime();
    setInterval(updateTime, 1000);
  }

  function initWeather(){
    if(!weatherEl) return;
    weatherEl.textContent = 'Loading...';
    fetchWeather(SCOTTSDALE_LAT, SCOTTSDALE_LON);
  }

  async function fetchWeather(lat, lon){
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;
      const response = await fetch(url);
      if(!response.ok) throw new Error('Weather fetch failed');
      const data = await response.json();
      const temp = Math.round(data?.current?.temperature_2m);
      const label = getWeatherLabel(data?.current?.weather_code);
      weatherEl.textContent = Number.isFinite(temp) ? `${temp}°F ${label}` : '--°F';
    } catch {
      weatherEl.textContent = '--°F';
    }
  }

  function getWeatherLabel(code){
    if(code === 0) return 'Clear';
    if(code === 1 || code === 2) return 'Partly';
    if(code === 3) return 'Cloudy';
    if(code === 45 || code === 48) return 'Fog';
    if(code >= 51 && code <= 67) return 'Rain';
    if(code >= 71 && code <= 77) return 'Snow';
    if(code >= 80 && code <= 82) return 'Showers';
    if(code >= 95) return 'Storm';
    return 'Now';
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
    const notesWidget = document.querySelector('.notes-widget');
    const notesTabBtn = document.getElementById('notes-tab-btn');
    const todoTabBtn = document.getElementById('todo-tab-btn');
    const notesPanel = document.getElementById('notes-panel');
    const todoPanel = document.getElementById('todo-panel');
    const notesSaveBtn = document.getElementById('save-notes-text');
    const notesVoiceBtn = document.getElementById('notes-voice-btn');
    if(!notesEl || !notesToggleBtn || !notesContent) return;

    notesEl.value = localStorage.getItem(KEY_NOTES_TEXT) || '';

    if(notesWidget){
      notesWidget.classList.remove('open');
    }

    notesToggleBtn.addEventListener('click', ()=>{
      notesContent.hidden = !notesContent.hidden;
      notesToggleBtn.classList.toggle('open');
      if(notesWidget){
        notesWidget.classList.toggle('open', !notesContent.hidden);
      }
    });

    const activateTab = (tab)=>{
      if(!notesTabBtn || !todoTabBtn || !notesPanel || !todoPanel) return;
      const notesActive = tab === 'notes';
      notesPanel.hidden = !notesActive;
      todoPanel.hidden = notesActive;
      notesTabBtn.classList.toggle('active', notesActive);
      todoTabBtn.classList.toggle('active', !notesActive);
      notesTabBtn.setAttribute('aria-selected', String(notesActive));
      todoTabBtn.setAttribute('aria-selected', String(!notesActive));
    };

    if(notesTabBtn && todoTabBtn){
      notesTabBtn.addEventListener('click', ()=>activateTab('notes'));
      todoTabBtn.addEventListener('click', ()=>activateTab('todo'));
      activateTab('notes');
    }

    if(notesSaveBtn){
      notesSaveBtn.addEventListener('click', ()=>{
        localStorage.setItem(KEY_NOTES_TEXT, notesEl.value);
        notesSaveBtn.textContent = 'Saved!';
        setTimeout(()=>{ notesSaveBtn.textContent = 'Save'; }, 900);
      });
    }

    if(notesVoiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){
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
    } else if(notesVoiceBtn){
      notesVoiceBtn.classList.add('disabled');
      notesVoiceBtn.title = 'Voice dictation not supported in this browser';
      notesVoiceBtn.addEventListener('click', ()=>{
        alert('Voice dictation is not supported in this browser. Try Chrome or Edge.');
      });
    }
  }

  // To Do List
  function initTodos(){
    if(!todoForm || !todoInput || !todoListEl) return;

    renderTodos(getTodos());

    if(todoVoiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const todoRecognition = new SpeechRecognition();
      todoRecognition.continuous = false;
      todoRecognition.interimResults = false;
      todoRecognition.lang = 'en-US';

      todoVoiceBtn.addEventListener('click', ()=>{
        todoRecognition.start();
        todoVoiceBtn.classList.add('listening');
        todoInput.placeholder = 'Listening...';
      });

      todoRecognition.onresult = (event)=>{
        const transcript = event.results[0][0].transcript.trim();
        if(transcript){
          todoInput.value = transcript;
          todoInput.focus();
        }
      };

      todoRecognition.onerror = (event)=>{
        console.warn('To do speech recognition error:', event.error);
        todoVoiceBtn.classList.remove('listening');
        todoInput.placeholder = 'Add a task...';
        if(event.error === 'not-allowed'){
          alert('Microphone access denied. Please allow microphone access in browser settings.');
        }
      };

      todoRecognition.onend = ()=>{
        todoVoiceBtn.classList.remove('listening');
        todoInput.placeholder = 'Add a task...';
      };
    } else if(todoVoiceBtn){
      todoVoiceBtn.classList.add('disabled');
      todoVoiceBtn.title = 'Voice dictation not supported in this browser';
      todoVoiceBtn.addEventListener('click', ()=>{
        alert('Voice dictation is not supported in this browser. Try Chrome or Edge.');
      });
    }

    todoForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const text = todoInput.value.trim();
      if(!text) return;

      const todos = getTodos();
      todos.unshift({
        id: Date.now(),
        text,
        completed: false
      });

      saveTodos(todos);
      renderTodos(todos);
      todoInput.value = '';
    });

    todoListEl.addEventListener('click', (e)=>{
      const deleteBtn = e.target.closest('.todo-delete');
      if(!deleteBtn) return;
      const itemEl = deleteBtn.closest('.todo-item');
      if(!itemEl) return;
      const todoId = Number(itemEl.dataset.id);
      const todos = getTodos().filter((todo)=>todo.id !== todoId);
      saveTodos(todos);
      renderTodos(todos);
    });

    todoListEl.addEventListener('change', (e)=>{
      const checkbox = e.target.closest('.todo-check');
      if(!checkbox) return;
      const itemEl = checkbox.closest('.todo-item');
      if(!itemEl) return;
      const todoId = Number(itemEl.dataset.id);
      const todos = getTodos().map((todo)=> todo.id === todoId ? { ...todo, completed: checkbox.checked } : todo);
      saveTodos(todos);
      renderTodos(todos);
    });
  }

  function getTodos(){
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY_TODOS) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveTodos(todos){
    localStorage.setItem(KEY_TODOS, JSON.stringify(todos));
  }

  function renderTodos(todos){
    if(!todoListEl) return;
    todoListEl.innerHTML = '';

    if(!todos.length){
      const emptyItem = document.createElement('li');
      emptyItem.className = 'todo-empty';
      emptyItem.textContent = 'No tasks yet.';
      todoListEl.appendChild(emptyItem);
      return;
    }

    todos.forEach((todo)=>{
      const item = document.createElement('li');
      item.className = `todo-item${todo.completed ? ' completed' : ''}`;
      item.dataset.id = String(todo.id);
      item.innerHTML = `
        <input class="todo-check" type="checkbox" ${todo.completed ? 'checked' : ''} aria-label="Mark task complete">
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="todo-delete" type="button" aria-label="Delete task" title="Delete task">
          <svg class="todo-delete-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h2v9H7V9Zm4 0h2v9h-2V9Zm4 0h2v9h-2V9ZM6 7h12l-1 14H7L6 7Z" fill="currentColor"></path>
          </svg>
        </button>
      `;
      todoListEl.appendChild(item);
    });
  }

  function escapeHtml(value){
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
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
