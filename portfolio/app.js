/**
 * AAKASH SHAH — DIGITAL MARKETING SPECIALIST PORTFOLIO
 * Modern Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initPreloader();
  initClipboardCopy();
  initDesignsGallery();
  initFeaturedProject();
  initVideos();
  initArticles();
  initContactForm();
  initModals();
});

/* ==========================================================================
   0. WATER RISING LOGO PRELOADER
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('page-preloader');
  if (!preloader) {
    initHeroTypewriter();
    return;
  }

  // Let the water rising animation complete smoothly
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
      initHeroTypewriter();
    }, 600);
  }, 1200);
}

/* ==========================================================================
   1. THEME MANAGER (BLACK & ORANGE / WHITE & BLUE)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark (Black & Orange)' : 'Light (White & Blue)'} mode`);
    });
  }
}

/* ==========================================================================
   2. NAVIGATION & ACTIVE SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobile();
      } else {
        openMobile();
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMobile));
  }

  function openMobile() {
    mobileDrawer.classList.add('open');
    mobileBtn.classList.add('active');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileDrawer.classList.remove('open');
    mobileBtn.classList.remove('active');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. HERO TYPEWRITER EFFECT
   ========================================================================== */
function initHeroTypewriter() {
  const target = document.getElementById('typewriter-target');
  if (!target) return;

  const fullText = "Hi, I am Aakash Shah";
  let charIdx = 0;
  target.textContent = "";

  function typeChar() {
    if (charIdx < fullText.length) {
      target.textContent += fullText.charAt(charIdx);
      charIdx++;
      setTimeout(typeChar, 70);
    }
  }

  setTimeout(typeChar, 250);
}

/* ==========================================================================
   4. 1-CLICK CLIPBOARD COPY
   ========================================================================== */
function initClipboardCopy() {
  document.querySelectorAll('.copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`, 'success');
        }).catch(() => {
          showToast(`Copied: ${text}`);
        });
      }
    });
  });
}

/* ==========================================================================
   5. DESIGNS & BANNERS SHOWCASE (>= 10 DESIGNS PER CATEGORY)
   ========================================================================== */
const DESIGNS_DATA = [
  // --- Category 1: Best Ad Creatives (12 items) ---
  {
    title: 'Sending Money Home From Australia',
    category: 'best',
    categoryLabel: 'Paid Ad Creative',
    image: 'assets/images/best/Sending Money Home From Australia (1).png',
    desc: 'High-conversion diaspora display ad for Australian remittance corridors.'
  },
  {
    title: 'Borderless Care, Limitless Reach',
    category: 'best',
    categoryLabel: 'Brand Identity',
    image: 'assets/images/best/Borderless care, limitless reach.png',
    desc: 'Global financial connectivity artwork highlighting speed and trust.'
  },
  {
    title: 'TAP SEND DONE — 3-Step Ad',
    category: 'best',
    categoryLabel: 'Conversion Creative',
    image: 'assets/images/best/TAP SEND DONE ISEND.png',
    desc: 'High-retention 3-step value proposition creative for social feeds.'
  },
  {
    title: 'Hard Work Deserves Fast Transfers (Campaign #1)',
    category: 'best',
    categoryLabel: 'Content Graphic',
    image: 'assets/images/best/Hard Work Deserves Fast Transfers (1).png',
    desc: 'Empowering migrant worker story creative for fintech promotion.'
  },
  {
    title: 'Hard Work Deserves Fast Transfers (Campaign #2)',
    category: 'best',
    categoryLabel: 'Content Graphic',
    image: 'assets/images/best/Hard Work Deserves Fast Transfers (2).png',
    desc: 'High-retention emotional hook creative for remittance blogs.'
  },
  {
    title: 'Every Second Counts',
    category: 'best',
    categoryLabel: 'Speed Feature Ad',
    image: 'assets/images/best/Every Second Counts.png',
    desc: 'Instant settlement transfer speed promotional creative.'
  },
  {
    title: 'No More Waiting, Stress Free Transfer',
    category: 'best',
    categoryLabel: 'Problem/Solution Ad',
    image: 'assets/images/best/No More Waiting, Stress Free Transfer.png',
    desc: 'Pain-point conversion ad addressing legacy bank wire delays.'
  },
  {
    title: 'One Tap One World',
    category: 'best',
    categoryLabel: 'Global Corridor Ad',
    image: 'assets/images/best/One Tap One World.png',
    desc: 'Clean international payment graphic communicating simplicity.'
  },
  {
    title: 'Predict & Win Tournament Campaign',
    category: 'best',
    categoryLabel: 'Interactive Social',
    image: 'assets/images/best/Predict and win (1).png',
    desc: 'Gamified sports tournament engagement creative for community growth.'
  },
  {
    title: 'Your First Transfer Can Make Their Day',
    category: 'best',
    categoryLabel: 'Retargeting Ad',
    image: 'assets/images/best/Your First Transfer Can Make Their Day.png',
    desc: 'Retargeting ad creative encouraging first-time app transactions.'
  },
  {
    title: 'Your Love Travels Home Instantly',
    category: 'best',
    categoryLabel: 'Emotional Hook Ad',
    image: 'assets/images/best/Your Love Travels Home Instantly.png',
    desc: 'High-performing emotional diaspora campaign creative.'
  },
  {
    title: 'Wherever You Are, Send with Confidence',
    category: 'best',
    categoryLabel: 'Trust & Security Ad',
    image: 'assets/images/best/Wherever You Are,  Send Home with Confidence.png',
    desc: 'Regulatory licensing proof creative for Australian expatriates.'
  },

  // --- Category 2: Banners & Standees (11 items) ---
  {
    title: 'ISEND Vertical Roll-Up Standee (60 x 150 cm)',
    category: 'banners',
    categoryLabel: 'Physical Print',
    image: 'assets/images/banners/ISEND flag Banner (60 x 150 cm).png',
    desc: 'Large vertical event roll-up banner for corporate sponsorships.'
  },
  {
    title: 'LinkedIn Executive Background Banner',
    category: 'banners',
    categoryLabel: 'LinkedIn Banner',
    image: 'assets/images/banners/Black and White Simple Manager LinkedIn Background Photo.png',
    desc: 'Clean corporate header showcasing marketing leadership.'
  },
  {
    title: 'Cost of Sending Money Complete Breakdown',
    category: 'banners',
    categoryLabel: 'Infographic Banner',
    image: 'assets/images/banners/What Affects the Cost of Sending Money Internationally A Complete Breakdown.png',
    desc: 'Comprehensive infographic banner breaking down FX margins and wire fees.'
  },
  {
    title: 'Fintech 3D Tech Background Artwork',
    category: 'banners',
    categoryLabel: 'Web Hero Header',
    image: 'assets/images/banners/Fintech Banner Bg.png',
    desc: '3D isometric financial technology graphic for web hero banners.'
  },
  {
    title: 'Global Compliance & Licensing Banner',
    category: 'banners',
    categoryLabel: 'Regulatory Banner',
    image: 'assets/images/banners/Compliane.png',
    desc: 'Corporate trust banner displaying international financial certifications.'
  },
  {
    title: 'Global Remittance Earth Map Grid',
    category: 'banners',
    categoryLabel: 'Corridor Map Banner',
    image: 'assets/images/banners/earth-map-linear-composition.png',
    desc: 'Linear digital map representing international remittance liquidity corridors.'
  },
  {
    title: 'Digital Remittance Explained Display Header',
    category: 'banners',
    categoryLabel: 'Educational Header',
    image: 'assets/images/banners/Digital Remittance Explained How Fintech Is Transforming International Money Transfers (260 x 260 px).png',
    desc: 'Content banner for digital remittance educational hub.'
  },
  {
    title: 'ISEND Corporate Event Standee',
    category: 'banners',
    categoryLabel: 'Event Standee',
    image: 'assets/images/banners/standee.png',
    desc: 'High-visibility corporate event banner designed for conference booths.'
  },
  {
    title: 'Corporate Identity Banner #1',
    category: 'banners',
    categoryLabel: 'Display Banner',
    image: 'assets/images/banners/1.png',
    desc: 'Fintech branding graphic for official press releases.'
  },
  {
    title: 'Financial Rail Banner #2',
    category: 'banners',
    categoryLabel: 'Display Banner',
    image: 'assets/images/banners/2.png',
    desc: 'Display graphic highlighting low-cost FX corridors.'
  },
  {
    title: 'Global Money Transfer Banner #3',
    category: 'banners',
    categoryLabel: 'Display Banner',
    image: 'assets/images/banners/3.png',
    desc: 'Event and digital billboard display artwork.'
  },

  // --- Category 3: Festival & Cultural Campaigns (11 items) ---
  {
    title: "Nepali Mother's Day Campaign",
    category: 'festivals',
    categoryLabel: 'Cultural Festival',
    image: "assets/images/festivals/Nepali Mother's Day.png",
    desc: 'Emotional diaspora greeting campaign with high organic reach across Australia and Nepal.'
  },
  {
    title: 'Nepali New Year Celebration',
    category: 'festivals',
    categoryLabel: 'Annual Festival',
    image: 'assets/images/festivals/NEW YEAR.png',
    desc: 'Vibrant cultural celebration graphic designed for multi-channel social broadcast.'
  },
  {
    title: 'Holi Festival of Colors Greeting',
    category: 'festivals',
    categoryLabel: 'Cultural Festival',
    image: 'assets/images/festivals/Purple and White Decorative Holi Festival Greeting Instagram Post (1).png',
    desc: 'Festive community outreach post for Instagram and Facebook.'
  },
  {
    title: 'Eid Al-Fitr Elegant Greeting',
    category: 'festivals',
    categoryLabel: 'Global Celebration',
    image: 'assets/images/festivals/Cyan and White Elegant Eid Al-Fitr Greeting Instagram Post.png',
    desc: 'Cross-regional festive design targeting Southeast Asian diaspora corridors.'
  },
  {
    title: 'Eid Al-Adha Community Banner',
    category: 'festivals',
    categoryLabel: 'Community Greeting',
    image: 'assets/images/festivals/Eid Al adha ISMT.png',
    desc: 'Community greeting creative for partner educational institutions.'
  },
  {
    title: 'Eid Fintech Financial Greeting',
    category: 'festivals',
    categoryLabel: 'Holiday Campaign',
    image: 'assets/images/festivals/Eid Fintech.png',
    desc: 'Financial service holiday zero-fee promotion campaign.'
  },
  {
    title: 'April Fools Viral Social Hook',
    category: 'festivals',
    categoryLabel: 'Social Engagement',
    image: 'assets/images/festivals/April Fools.png',
    desc: 'Lighthearted engagement creative engineered to spark comment conversations.'
  },
  {
    title: 'Mother\'s Day Special Campaign',
    category: 'festivals',
    categoryLabel: 'Cultural Festival',
    image: 'assets/images/festivals/Mothers day isend.png',
    desc: 'Remittance gift discount campaign for expatriates sending money home.'
  },
  {
    title: 'Festival Community Special #1',
    category: 'festivals',
    categoryLabel: 'Holiday Post',
    image: 'assets/images/festivals/1.png',
    desc: 'Seasonal community celebration visual.'
  },
  {
    title: 'Festival Celebration Creative #2',
    category: 'festivals',
    categoryLabel: 'Holiday Post',
    image: 'assets/images/festivals/2.png',
    desc: 'Festive engagement creative for South Asian diaspora.'
  },
  {
    title: 'Cultural Greeting Card #3',
    category: 'festivals',
    categoryLabel: 'Holiday Post',
    image: 'assets/images/festivals/3.png',
    desc: 'Cross-platform seasonal outreach visual.'
  },

  // --- Category 4: Posters & Wall Art (11 items) ---
  {
    title: 'ISEND High-Impact Wall Poster #1',
    category: 'posters',
    categoryLabel: 'Office Wall Art',
    image: 'assets/images/posters/1.png',
    desc: 'Brand philosophy and motivational typography poster.'
  },
  {
    title: 'ISEND Corporate Trust Poster #2',
    category: 'posters',
    categoryLabel: 'Corporate Poster',
    image: 'assets/images/posters/2.png',
    desc: 'Global remittance trust badge and statistics artwork.'
  },
  {
    title: 'Fintech Innovation Poster #3',
    category: 'posters',
    categoryLabel: 'Office Wall Art',
    image: 'assets/images/posters/3.png',
    desc: 'Creative wall visual representing real-time payment settlement.'
  },
  {
    title: 'Remittance Rails Poster #4',
    category: 'posters',
    categoryLabel: 'Corporate Poster',
    image: 'assets/images/posters/4.png',
    desc: 'Visual breakdown of secure cross-border payment rails.'
  },
  {
    title: 'Speed & Technology Poster #5',
    category: 'posters',
    categoryLabel: 'Office Wall Art',
    image: 'assets/images/posters/5.png',
    desc: 'Fast, secure, and transparent money transfer artwork.'
  },
  {
    title: 'Compliance & Security Poster #6',
    category: 'posters',
    categoryLabel: 'Corporate Poster',
    image: 'assets/images/posters/6.png',
    desc: 'AUSTRAC and international regulatory compliance guarantee poster.'
  },
  {
    title: 'Global Connectivity Poster #7',
    category: 'posters',
    categoryLabel: 'Office Wall Art',
    image: 'assets/images/posters/7.png',
    desc: 'Connecting expatriates with family across 50+ countries.'
  },
  {
    title: 'Customer-First Brand Poster #8',
    category: 'posters',
    categoryLabel: 'Corporate Poster',
    image: 'assets/images/posters/8.png',
    desc: 'Brand values and customer commitment office poster.'
  },
  {
    title: 'ISEND Key Visual Hero Poster',
    category: 'posters',
    categoryLabel: 'Key Visual Print',
    image: 'assets/images/posters/kv isend 2-04.jpg',
    desc: 'Flagship key visual poster for headquarters and branch branding.'
  },
  {
    title: 'ISEND Market Acquisition Poster',
    category: 'posters',
    categoryLabel: 'Marketing Poster',
    image: 'assets/images/posters/kv isend 2-05.jpg',
    desc: 'Key visual campaign poster highlighting mobile app transfer.'
  },
  {
    title: 'ISEND Borderless Payments Poster',
    category: 'posters',
    categoryLabel: 'Key Visual Print',
    image: 'assets/images/posters/kv isend 2-06.jpg',
    desc: 'High-resolution brand campaign poster for diaspora financial connectivity.'
  },

  // --- Category 5: TAI, YouMe & Terakoya (18 items from authentic campaigns) ---
  {
    title: 'TERAKOYA Academia — We Are Hiring For Japan (Tech Roles)',
    category: 'japan_youme',
    categoryLabel: 'Japan Career Campaign',
    image: 'assets/images/tai_terakoya_youme/644322880_913074704945841_7228405040850637758_n.jpg',
    desc: 'Hiring campaign for C# Developers, DevOps, and Embedded Engineers with sponsored language training, visa processing, and relocation.'
  },
  {
    title: 'TERAKOYA Academia — Hiring Electrical, Java & Civil Engineers',
    category: 'japan_youme',
    categoryLabel: 'Japan Career Campaign',
    image: 'assets/images/tai_terakoya_youme/555432134_788545660732080_8834921041979231829_n.jpg',
    desc: 'Engineer recruitment campaign for Japanese tech companies across electrical, Java system, civil, and mechanical specializations.'
  },
  {
    title: 'TERAKOYA Academia — Hiring Circuit Design Engineers for Japan',
    category: 'japan_youme',
    categoryLabel: 'Hardware Engineering Ad',
    image: 'assets/images/tai_terakoya_youme/490458345_657324080520906_3058418197545824208_n.jpg',
    desc: 'Direct-response hiring creative for Electrical and Electronics Circuit Design Engineers for Japanese engineering clients.'
  },
  {
    title: 'YouMe School — New Year 2025 (明けましておめでとうございます)',
    category: 'japan_youme',
    categoryLabel: 'Japanese Greeting',
    image: 'assets/images/tai_terakoya_youme/482109108_955341390128332_3406337022588883260_n.jpg',
    desc: 'Cross-cultural Japanese New Year greeting connecting school communities in Nepal and Japan.'
  },
  {
    title: 'TERAKOYA Academia — Naya Barsha 2082 Greeting',
    category: 'japan_youme',
    categoryLabel: 'Annual Festive Post',
    image: 'assets/images/tai_terakoya_youme/490218409_656403413946306_3386306388534700206_n.jpg',
    desc: 'Nepali New Year 2082 greeting creative for Terakoya community and candidates.'
  },
  {
    title: 'YouMe School — Naya Barsha 2082 Greeting',
    category: 'japan_youme',
    categoryLabel: 'Annual Festive Post',
    image: 'assets/images/tai_terakoya_youme/490299691_979289251066879_2198356549778482610_n.jpg',
    desc: 'Nepali New Year 2082 celebration visual featuring heritage silhouettes for YouMe School.'
  },
  {
    title: 'YouMe School — Maha Shivaratri Greeting',
    category: 'japan_youme',
    categoryLabel: 'Cultural Festival',
    image: 'assets/images/tai_terakoya_youme/486173112_966704412325363_7236271015813115002_n.jpg',
    desc: 'Traditional artistic illustration celebrating Maha Shivaratri for YouMe School.'
  },
  {
    title: 'YouMe School — Gyalpo Lhosar Greeting',
    category: 'japan_youme',
    categoryLabel: 'Cultural Festival',
    image: 'assets/images/tai_terakoya_youme/487204505_968298288832642_6945441572378514889_n.jpg',
    desc: 'Festive community post celebrating Gyalpo Lhosar with traditional masked dance and prayer flags.'
  },
  {
    title: "YouMe School — International Women's Day",
    category: 'japan_youme',
    categoryLabel: 'Global Observance',
    image: 'assets/images/tai_terakoya_youme/488648919_974726254856512_4049235591181562819_n.jpg',
    desc: 'Inspiring global unity illustration honoring women and educators.'
  },
  {
    title: 'YouMe School — International Dance Day 2025',
    category: 'japan_youme',
    categoryLabel: 'Arts & Culture',
    image: 'assets/images/tai_terakoya_youme/494674670_993301192999018_9009260124308752759_n.jpg',
    desc: 'Traditional cultural dance creative celebrating rhythm and student artistic expression.'
  },
  {
    title: 'YouMe School — International Labour Day',
    category: 'japan_youme',
    categoryLabel: 'Community Honor',
    image: 'assets/images/tai_terakoya_youme/495014272_994666996195771_5361923662112633637_n.jpg',
    desc: 'Empowering community graphic honoring workers and vocational skills.'
  },
  {
    title: 'YouMe School — Buddha Jayanti Greeting',
    category: 'japan_youme',
    categoryLabel: 'Cultural Observance',
    image: 'assets/images/tai_terakoya_youme/497547397_1002509378744866_3390835539866963020_n.jpg',
    desc: 'Serene spiritual illustration celebrating peace, mindfulness, and Buddha Jayanti.'
  },
  {
    title: 'YouMe School — Janai Purnima & Rakshabandhan',
    category: 'japan_youme',
    categoryLabel: 'Traditional Festival',
    image: 'assets/images/tai_terakoya_youme/529916255_1069331672062636_6530928326190307845_n.jpg',
    desc: 'Festive greeting highlighting brotherhood, protection, and cultural harmony.'
  },
  {
    title: 'YouMe School — Shri Krishna Janmashtami',
    category: 'japan_youme',
    categoryLabel: 'Traditional Festival',
    image: 'assets/images/tai_terakoya_youme/531997200_1074496134879523_3196139929214447211_n.jpg',
    desc: 'Festive devotional design celebrating Krishna Janmashtami for the school community.'
  },
  {
    title: 'YouMe School Biratnagar — Welcome Kisi Haruka San',
    category: 'japan_youme',
    categoryLabel: 'International Exchange',
    image: 'assets/images/tai_terakoya_youme/481955631_953848930277578_4705300709466246881_n.jpg',
    desc: 'Welcoming Japanese educator Kisi Haruka San to YouMe School Biratnagar for cultural immersion.'
  },
  {
    title: 'YouMe School — Did You Know? Scratch Kids Coding',
    category: 'japan_youme',
    categoryLabel: 'STEM Education Graphic',
    image: 'assets/images/tai_terakoya_youme/481297981_954783316850806_5778454058706694555_n.jpg',
    desc: 'Educational infographic explaining Scratch block coding for elementary school kids.'
  },
  {
    title: 'YouMe School — Poll Time! Coding for Children',
    category: 'japan_youme',
    categoryLabel: 'Interactive Social Post',
    image: 'assets/images/tai_terakoya_youme/483486151_953835423612262_1612988302619781548_n.jpg',
    desc: 'Interactive quiz post driving parent engagement around coding and child development.'
  },
  {
    title: 'YouMe School Biratnagar — Admissions 2082 (Facilities & STEM)',
    category: 'japan_youme',
    categoryLabel: 'Admission Campaign Poster',
    image: 'assets/images/tai_terakoya_youme/490311555_979464171049387_6322181640700107270_n.jpg',
    desc: 'School admission flyer highlighting Japanese classes, kids coding, and audio-visual education in Biratnagar.'
  }
];

let activeCategoryDesigns = [];
let currentLightboxIndex = 0;

function initDesignsGallery() {
  const container = document.getElementById('designs-gallery-grid');
  const tabsBar = document.getElementById('designs-tabs-bar');
  if (!container) return;

  function render(category = 'best') {
    container.innerHTML = '';
    activeCategoryDesigns = DESIGNS_DATA.filter(d => d.category === category);

    activeCategoryDesigns.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'design-item-card';
      card.style.animationDelay = `${Math.min(idx * 0.035, 0.45)}s`;
      card.innerHTML = `
        <div class="design-thumb-wrap">
          <img src="${item.image}" alt="${item.title}" class="design-thumb-img" loading="lazy">
          <span class="design-cat-badge">${item.categoryLabel}</span>
        </div>
        <div class="design-info-wrap">
          <h4 class="design-item-title">${item.title}</h4>
          <p class="design-item-desc">${item.desc}</p>
          <div class="design-view-action">
            <span>View Preview</span>
            <span>→</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        openLightbox(idx, activeCategoryDesigns);
      });
      container.appendChild(card);
    });
  }

  // Start with 'best' as default
  render('best');

  if (tabsBar) {
    tabsBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        render(cat);
      });
    });
  }

  // Lightbox Controls
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });
}

function openLightbox(index, itemsArray) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const cat = document.getElementById('lightbox-category');
  const counter = document.getElementById('lightbox-counter');

  if (!modal || !img || !itemsArray || !itemsArray[index]) return;

  activeCategoryDesigns = itemsArray;
  currentLightboxIndex = index;
  const item = itemsArray[index];

  img.src = item.image;
  img.alt = item.title;
  title.textContent = item.title;
  desc.textContent = item.desc;
  cat.textContent = item.categoryLabel;
  if (counter) counter.textContent = `Design Preview [${index + 1} of ${itemsArray.length}]`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = activeCategoryDesigns.length - 1;
  if (currentLightboxIndex >= activeCategoryDesigns.length) currentLightboxIndex = 0;
  openLightbox(currentLightboxIndex, activeCategoryDesigns);
}

/* ==========================================================================
   6. FEATURED PROJECT & LIVE META ADS CAMPAIGN INTELLIGENCE DASHBOARD
   ========================================================================== */
const PROJECT_PREVIEWS = [
  {
    title: 'Sending Money Home From Australia',
    categoryLabel: 'Paid Ad Creative',
    image: 'assets/images/best/Sending Money Home From Australia (1).png',
    desc: 'High-conversion diaspora display ad for Australian remittance corridors.'
  },
  {
    title: 'TAP SEND DONE ISEND',
    categoryLabel: 'Conversion Creative',
    image: 'assets/images/best/TAP SEND DONE ISEND.png',
    desc: 'High-retention 3-step value proposition creative for social feeds.'
  },
  {
    title: 'Borderless Care, Limitless Reach',
    categoryLabel: 'Brand Identity',
    image: 'assets/images/best/Borderless care, limitless reach.png',
    desc: 'Global financial connectivity artwork highlighting speed and trust.'
  },
  {
    title: 'ISEND Vertical Roll-Up Standee',
    categoryLabel: 'Physical Print Standee',
    image: 'assets/images/banners/ISEND flag Banner (60 x 150 cm).png',
    desc: 'Large vertical event roll-up banner for corporate sponsorships.'
  }
];

const TAI_PROJECT_PREVIEWS = [
  {
    title: 'Japan - Nepal IT Forum (Kathmandu Edition)',
    categoryLabel: 'Bilateral Summit Branding',
    image: 'assets/images/tai_terakoya_youme/525462867_1153509533476088_6654148254786628965_n.jpg',
    desc: 'Official event branding for the bilateral technology summit connecting Japanese tech enterprises (TAI, Nankai) and the Japan Nepal IT Association.'
  },
  {
    title: 'YouMe School — Admissions (Coding & Japanese Culture)',
    categoryLabel: 'Education & Admissions Campaign',
    image: 'assets/images/tai_terakoya_youme/491911827_984837317178739_3304171293284667554_n.jpg',
    desc: 'Academic admissions campaign spotlighting Japanese Language & Culture, Kids Coding from Grade 1, and student projects across Biratnagar and Khotang branches.'
  },
  {
    title: 'TERAKOYA Academia — We Are Hiring For Japan (Mechanical Engineer)',
    categoryLabel: 'Japan Career Campaign',
    image: 'assets/images/tai_terakoya_youme/597748785_852168764369769_538624415368776202_n.jpg',
    desc: 'High-impact Japanese recruitment creative featuring Pagoda & Cherry Blossoms, promoting sponsored Japanese language classes, visa processing, and relocations.'
  },
  {
    title: 'YouMe School — Farewell Mizuki Ando san (ありがとうございました)',
    categoryLabel: 'Japanese Volunteer Farewell',
    image: 'assets/images/tai_terakoya_youme/515015689_1040696434926160_2574926436474111331_n.jpg',
    desc: 'Commemorative farewell post celebrating international volunteer and educator contributions at YouMe School.'
  }
];

function initFeaturedProject() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Case Study 1: ISEND Global -->
    <div class="featured-project-box card">
      <div class="fp-header-row">
        <div>
          <h3 class="fp-title">ISEND Global — Australia Diaspora Launch &amp; Paid Acquisition</h3>
          <div class="fp-company">ISEND Global / TransCash International • Lead Campaign Strategist</div>
        </div>
        <div class="timeline-badge current">2026 Live Campaign</div>
      </div>

      <div class="fp-grid-layout">
        
        <!-- Left: Narrative & Strategy Breakdown -->
        <div class="fp-narrative">
          
          <div class="fp-sec">
            <h4>Market Challenge &amp; Objectives</h4>
            <p>
              ISEND (operating under TransCash International in Australia) required a high-velocity digital campaign to launch its mobile remittance app, build brand trust among the 200,000+ South Asian and Nepali diaspora, and achieve low-cost app downloads.
            </p>
          </div>

          <div class="fp-sec">
            <h4>3-Tier Funnel Architecture</h4>
            <p>
              Architected a structured acquisition funnel: Top-of-Funnel educational video hooks exposing hidden legacy bank wire fees ("Don't Send Money Blindly"), Middle-of-Funnel app install promotions, and Bottom-of-Funnel retargeting featuring AUSTRAC regulatory proof and instant settlement guarantees.
            </p>
          </div>

          <!-- Compact Before / After Pills -->
          <div class="fp-transform-pills">
            <div class="fp-transform-box before">
              <strong>Before</strong>
              <span>Zero structured paid acquisition in AU; fragmented creative assets.</span>
            </div>
            <div class="fp-transform-box after">
              <strong>After</strong>
              <span>Unified brand identity; disciplined sub-$1.40 CPA; rapid user growth.</span>
            </div>
          </div>

          <!-- Compact KPI Summary Bar -->
          <div class="hero-metrics-bar compact-kpi">
            <div class="metric-item">
              <div class="metric-val">138K+</div>
              <div class="metric-label">Combined Reach</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">210K+</div>
              <div class="metric-label">Impressions</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">$1.39</div>
              <div class="metric-label">Avg CPM / 1k Reach</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">$0.18</div>
              <div class="metric-label">Cost / Follower</div>
            </div>
          </div>

          <!-- Quick Links Row -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem;">
            <a href="https://www.facebook.com/profile.php?id=61566603993191" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>ISEND Global on Facebook</span>
              <span class="arrow-icon">↗</span>
            </a>
            <a href="https://www.facebook.com/ipayremitworldwide" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>iPayremit Worldwide on Facebook</span>
              <span class="arrow-icon">↗</span>
            </a>
          </div>

        </div>

        <!-- Right: Campaign Visual Creatives 2x2 Grid -->
        <div class="fp-visuals-col">
          <div class="fp-visuals-head">
            <span class="fp-visuals-title">Campaign Visual Creatives</span>
            <span style="font-size: 0.72rem; color: var(--accent-color); font-weight: 700;">Click to view</span>
          </div>
          
          <div class="fp-creative-preview-grid">
            <div class="fp-preview-thumb isend-thumb" data-index="0" title="Click to preview: Australia Remittance Ad">
              <img src="assets/images/best/Sending Money Home From Australia (1).png" alt="Australia Remittance Ad" loading="lazy">
              <span class="fp-thumb-label">AU Corridor Ad</span>
            </div>
            <div class="fp-preview-thumb isend-thumb" data-index="1" title="Click to preview: 3-Step Conversion Ad">
              <img src="assets/images/best/TAP SEND DONE ISEND.png" alt="Tap Send Done Ad" loading="lazy">
              <span class="fp-thumb-label">3-Step Conversion</span>
            </div>
            <div class="fp-preview-thumb isend-thumb" data-index="2" title="Click to preview: Brand Identity Ad">
              <img src="assets/images/best/Borderless care, limitless reach.png" alt="Borderless Care Ad" loading="lazy">
              <span class="fp-thumb-label">Trust &amp; Reach</span>
            </div>
            <div class="fp-preview-thumb isend-thumb" data-index="3" title="Click to preview: Event Roll-up Standee">
              <img src="assets/images/banners/ISEND flag Banner (60 x 150 cm).png" alt="Roll-up Standee" loading="lazy">
              <span class="fp-thumb-label">Event Standee</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Shifted Below: Small, Sleek Live Meta Ads Campaign Performance Dashboard -->
      <div class="campaign-data-card">
        <div class="campaign-data-header">
          <div class="campaign-data-title">
            <span class="pulse-dot-green"></span>
            <span>Meta Ads Manager — Corridor Performance Data</span>
          </div>
          <span class="status-badge-live">Verified Live Campaign Data</span>
        </div>
        
        <div class="campaign-table-scroll">
          <table class="campaign-data-table">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Objective</th>
                <th>Target Corridor</th>
                <th>Reach / Impressions</th>
                <th>Key Result</th>
                <th>Cost Per Result (CPA)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ISEND AU Brand Awareness</strong></td>
                <td>Corridor Recall</td>
                <td>Sydney, Melbourne, Brisbane</td>
                <td>24,500 • 28,200 Imp.</td>
                <td>High Corridor Recall</td>
                <td><strong style="color: var(--heading-accent);">$1.39 / 1k Reach</strong></td>
                <td><span class="status-badge-live">Completed</span></td>
              </tr>
              <tr>
                <td><strong>Diaspora Community Growth</strong></td>
                <td>Audience Growth</td>
                <td>South Asian Diaspora (AU)</td>
                <td>58,000 • 92,500 Imp.</td>
                <td>1,250+ New Followers</td>
                <td><strong style="color: var(--heading-accent);">$0.18 / Follow</strong></td>
                <td><span class="status-badge-live">Completed</span></td>
              </tr>
              <tr>
                <td><strong>Corridor Engagement Sprint #1</strong></td>
                <td>Video Trust</td>
                <td>France / Spain / Europe</td>
                <td>24,000 • 34,000 Imp.</td>
                <td>3,850+ Engagements</td>
                <td><strong style="color: var(--heading-accent);">&lt; $0.003 / Eng.</strong></td>
                <td><span class="status-badge-live">Completed</span></td>
              </tr>
              <tr>
                <td><strong>Corridor Engagement Sprint #2</strong></td>
                <td>Viral Video Hook</td>
                <td>UK / England Expat Corridors</td>
                <td>23,500 • 31,000 Imp.</td>
                <td>3,700+ Engagements</td>
                <td><strong style="color: var(--heading-accent);">&lt; $0.003 / Eng.</strong></td>
                <td><span class="status-badge-live">Completed</span></td>
              </tr>
              <tr>
                <td><strong>Web Portal &amp; App Install Funnel</strong></td>
                <td>Conversions</td>
                <td>Cross-Border Mobile Users</td>
                <td>6,500 • 15,000 Imp.</td>
                <td>180+ Portal Views</td>
                <td><strong style="color: var(--heading-accent);">$0.58 / View ($0.81 CPC)</strong></td>
                <td><span class="status-badge-live">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Case Study 2: TAI Inc., TERAKOYA Academia & YouMe School -->
    <div class="featured-project-box card">
      <div class="fp-header-row">
        <div>
          <h3 class="fp-title">TAI Inc., TERAKOYA Academia &amp; YouMe School — Japan-Nepal Tech &amp; Education Ecosystem</h3>
          <div class="fp-company">TAI Inc., Terakoya Academia, YouMe School (Biratnagar &amp; Khotang) • Digital Marketing Manager</div>
        </div>
        <div class="timeline-badge">2024 AUG – 2025 OCT</div>
      </div>

      <div class="fp-grid-layout">
        
        <!-- Left: Narrative Breakdown -->
        <div class="fp-narrative">
          
          <div class="fp-sec">
            <h4>Ecosystem Scope &amp; Multi-Brand Operations</h4>
            <p>
              Managed 360° digital marketing operations across TAI Inc. (<a href="https://tai.co.jp/en/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">tai.co.jp</a>), TERAKOYA Academia Inc. (<a href="https://www.facebook.com/terakoyajapal" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">facebook.com/terakoyajapal</a>), and YouMe School (<a href="https://www.facebook.com/youme.edu.np/photos" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">facebook.com/youme.edu.np</a>) spanning two branches: YouMe School Biratnagar and YouMe School Khotang, alongside cultural training initiatives under Kokorozashi.
            </p>
          </div>

          <div class="fp-sec">
            <h4>TAI Official Global Website Content &amp; Strategy</h4>
            <p>
              Spearheaded the digital content strategy, SEO structure, copy, and visual communications for the official TAI Inc. Global Website (<a href="https://tai.co.jp/en/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">tai.co.jp/en</a>), showcasing offshore software engineering, AI research &amp; development, and enterprise digital transformation (DX) capabilities to Japanese and global clients.
            </p>
          </div>

          <div class="fp-sec">
            <h4>Japan Hiring Campaigns, Japanese Cross-Cultural Design &amp; IT Forum '25</h4>
            <p>
              Designed and executed high-conversion social campaigns across Facebook (<a href="https://www.facebook.com/TAIInc" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">@TAIInc</a>, <a href="https://www.facebook.com/terakoyajapal" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">@terakoyajapal</a>, &amp; <a href="https://www.facebook.com/youme.edu.np/photos" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color); text-decoration: underline;">@youme.edu.np</a>) from August 2024 to October 2025. Created Japan-themed hiring creatives with cherry blossom motifs, Japanese typography greetings (<em>明けましておめでとうございます</em> &amp; <em>ありがとうございました</em>), STEM &amp; coding admission campaigns for YouMe School Biratnagar &amp; Khotang, and event branding for the Japan - Nepal IT Forum (Kathmandu Edition).
            </p>
          </div>

          <!-- Compact KPI Summary Bar -->
          <div class="hero-metrics-bar compact-kpi">
            <div class="metric-item">
              <div class="metric-val">5 Brands</div>
              <div class="metric-label">Managed Concurrently</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">2 Branches</div>
              <div class="metric-label">Biratnagar &amp; Khotang</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">tai.co.jp</div>
              <div class="metric-label">Web Content Strategy</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">IT Forum '25</div>
              <div class="metric-label">Summit Branding Lead</div>
            </div>
          </div>

          <!-- Quick Links Row -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem;">
            <a href="https://tai.co.jp/en/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>TAI Website (tai.co.jp)</span>
              <span class="arrow-icon">→</span>
            </a>
            <a href="https://www.facebook.com/TAIInc" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>TAI on Facebook</span>
              <span class="arrow-icon">↗</span>
            </a>
            <a href="https://www.facebook.com/terakoyajapal" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>Terakoya on Facebook</span>
              <span class="arrow-icon">↗</span>
            </a>
            <a href="https://www.facebook.com/youme.edu.np/photos" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>YouMe School on Facebook</span>
              <span class="arrow-icon">↗</span>
            </a>
          </div>

        </div>

        <!-- Right: Real Design Creatives from New/ (Exactly 4 Highlights) -->
        <div class="fp-visuals-col">
          <div class="fp-visuals-head">
            <span class="fp-visuals-title">TAI, YouMe &amp; Terakoya Creatives</span>
            <span style="font-size: 0.72rem; color: var(--accent-color); font-weight: 700;">Click to view</span>
          </div>
          
          <div class="fp-creative-preview-grid">
            <div class="fp-preview-thumb tai-thumb" data-index="0" title="Click to preview: Japan - Nepal IT Forum Kathmandu Edition">
              <img src="assets/images/tai_terakoya_youme/525462867_1153509533476088_6654148254786628965_n.jpg" alt="Japan - Nepal IT Forum" loading="lazy">
              <span class="fp-thumb-label">IT Forum '25 Summit</span>
            </div>
            <div class="fp-preview-thumb tai-thumb" data-index="1" title="Click to preview: YouMe School Admissions & Japanese Coding">
              <img src="assets/images/tai_terakoya_youme/491911827_984837317178739_3304171293284667554_n.jpg" alt="YouMe School Admissions" loading="lazy">
              <span class="fp-thumb-label">YouMe Admissions</span>
            </div>
            <div class="fp-preview-thumb tai-thumb" data-index="2" title="Click to preview: TERAKOYA We Are Hiring For Japan (Mechanical Engineer)">
              <img src="assets/images/tai_terakoya_youme/597748785_852168764369769_538624415368776202_n.jpg" alt="We Are Hiring For Japan" loading="lazy">
              <span class="fp-thumb-label">Hiring For Japan</span>
            </div>
            <div class="fp-preview-thumb tai-thumb" data-index="3" title="Click to preview: Farewell Mizuki Ando san (ありがとうございました)">
              <img src="assets/images/tai_terakoya_youme/515015689_1040696434926160_2574926436474111331_n.jpg" alt="Farewell Mizuki Ando san" loading="lazy">
              <span class="fp-thumb-label">ありがとうございました</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Shifted Below: 5 Ecosystem Organizations Grid -->
      <div class="campaign-data-card" style="margin-top: 1.35rem;">
        <div class="campaign-data-header">
          <div class="campaign-data-title">
            <span class="pulse-dot-green"></span>
            <span>Multi-Organization Ecosystem Managed by Aakash (2024 AUG – 2025 OCT)</span>
          </div>
          <span class="status-badge-live">5 Brands &amp; 2 School Branches Unified</span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.65rem; margin-top: 0.5rem;">
          
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.65rem 0.8rem;">
            <strong style="font-size: 0.75rem; color: var(--heading-accent); display: block; margin-bottom: 0.2rem;">TAI Inc. (tai.co.jp)</strong>
            <p style="font-size: 0.6875rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">Offshore software engineering, website content strategy, SEO structure &amp; AI consulting outreach.</p>
          </div>

          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.65rem 0.8rem;">
            <strong style="font-size: 0.75rem; color: var(--heading-accent); display: block; margin-bottom: 0.2rem;">TERAKOYA Academia Inc.</strong>
            <p style="font-size: 0.6875rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">Japan engineering recruitment campaigns, sponsored language bootcamps &amp; career placements.</p>
          </div>

          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.65rem 0.8rem;">
            <strong style="font-size: 0.75rem; color: var(--heading-accent); display: block; margin-bottom: 0.2rem;">YouMe School Biratnagar</strong>
            <p style="font-size: 0.6875rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">Urban branch admissions, kids coding from Grade 1, Japanese language curriculum &amp; cultural exchange.</p>
          </div>

          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.65rem 0.8rem;">
            <strong style="font-size: 0.75rem; color: var(--heading-accent); display: block; margin-bottom: 0.2rem;">YouMe School Khotang</strong>
            <p style="font-size: 0.6875rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">Rural education impact storytelling, non-profit community engagement &amp; donor updates.</p>
          </div>

          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); padding: 0.65rem 0.8rem;">
            <strong style="font-size: 0.75rem; color: var(--heading-accent); display: block; margin-bottom: 0.2rem;">Japan - Nepal IT Forum</strong>
            <p style="font-size: 0.6875rem; color: var(--text-secondary); margin: 0; line-height: 1.35;">Bilateral summit event branding, promotional flyers, partner banners &amp; attendee registrations.</p>
          </div>

        </div>
      </div>

    </div>

    <!-- Case Study 3: LalNepal Online Shopping -->
    <div class="featured-project-box card">
      <div class="fp-header-row">
        <div>
          <h3 class="fp-title">LalNepal Online Shopping — E-Commerce Direct-Response Campaign</h3>
          <div class="fp-company">LalNepal Pvt Ltd. • Content &amp; Social Media Handler / Performance Marketer</div>
        </div>
        <div class="timeline-badge">2023 Performance Campaign</div>
      </div>

      <div class="fp-grid-layout">
        
        <!-- Left: Narrative Breakdown -->
        <div class="fp-narrative">
          
          <div class="fp-sec">
            <h4>E-Commerce Context &amp; Operational Scope</h4>
            <p>
              Directed social media content operations, conversion copywriting, and direct-response performance ad campaigns for LalNepal Online Shopping across Kathmandu Valley and nationwide delivery corridors.
            </p>
          </div>

          <div class="fp-sec">
            <h4>The $150 Footwear Sprint (1,000+ Direct Leads)</h4>
            <p>
              Architected a high-converting Direct-Response footwear ad sprint on a total budget of only $150. Combined high-intent demographic targeting with frictionless Direct-to-Messenger ordering to generate over 1,000+ customer conversation leads at ~$0.15 CPL.
            </p>
          </div>

          <!-- Compact KPI Summary Bar -->
          <div class="hero-metrics-bar compact-kpi">
            <div class="metric-item">
              <div class="metric-val">1,000+</div>
              <div class="metric-label">Conversation Leads</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">$150</div>
              <div class="metric-label">Campaign Budget</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">~$0.15</div>
              <div class="metric-label">Cost / Lead (CPL)</div>
            </div>
            <div class="metric-item">
              <div class="metric-val">High ROAS</div>
              <div class="metric-label">Inventory Clearance</div>
            </div>
          </div>

          <div style="margin-top: 0.25rem;">
            <a href="https://www.facebook.com/lalnepalonlineshopping" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.5rem;">
              <span>Explore LalNepal on Facebook</span>
              <span class="arrow-icon">→</span>
            </a>
          </div>

        </div>

        <!-- Right: Strategy & Execution Highlights -->
        <div class="fp-visuals-col">
          <div class="fp-visuals-head">
            <span class="fp-visuals-title">Campaign Strategy Highlights</span>
            <span class="status-badge-live">E-Commerce Stack</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 0.55rem;">
            
            <div style="background-color: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                <strong style="color: var(--heading-accent); font-size: 0.8125rem;">Direct-to-Messenger Conversational Ads</strong>
                <span class="status-badge-live" style="font-size: 0.625rem; padding: 0.15rem 0.45rem;">1,000+ Leads</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0; line-height: 1.45;">Frictionless order inquiries and sizing assistance converting high-intent social traffic into immediate purchases.</p>
            </div>

            <div style="background-color: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                <strong style="color: var(--heading-accent); font-size: 0.8125rem;">Dashain &amp; Tihar Festive Sales Surges</strong>
                <span class="status-badge-live" style="font-size: 0.625rem; padding: 0.15rem 0.45rem;">Peak Season</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0; line-height: 1.45;">Targeted holiday bundle deals and limited-time discounts driving rapid consumer purchase decisions.</p>
            </div>

            <div style="background-color: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.85rem 1rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                <strong style="color: var(--heading-accent); font-size: 0.8125rem;">High-Converting Copy &amp; Product Titles</strong>
                <span class="status-badge-live" style="font-size: 0.625rem; padding: 0.15rem 0.45rem;">Creative Strategy</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0; line-height: 1.45;">Persuasive e-commerce copywriting highlighting quality, affordability, and fast nationwide delivery.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;

  // Attach lightbox preview to ISEND thumbnails
  container.querySelectorAll('.isend-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      openLightbox(idx, PROJECT_PREVIEWS);
    });
  });

  // Attach lightbox preview to TAI & YouMe thumbnails
  container.querySelectorAll('.tai-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      openLightbox(idx, TAI_PROJECT_PREVIEWS);
    });
  });
}

/* ==========================================================================
   7. TOP 10 INSTAGRAM REELS (PLAYABLE EMBEDS & MATCHED THUMBNAILS)
   ========================================================================== */
const REELS_DATA = [
  {
    id: 'DcBSreMAq3d',
    title: 'Is ISEND Legal? (Licensing Breakdown)',
    hook: 'Explaining regulatory licensing and why regulated remittance is safe.',
    category: 'Compliance & Safety',
    thumbnail: 'assets/images/reels/reel-1.png',
    instagramUrl: 'https://www.instagram.com/reel/DcBSreMAq3d/'
  },
  {
    id: 'DcAs2R4kSYG',
    title: 'Is ISEND Legal? (Part 2: AUSTRAC Rails)',
    hook: 'Breaking down cross-border security standards and payment insurance.',
    category: 'Regulatory Hook',
    thumbnail: 'assets/images/reels/reel-2.png',
    instagramUrl: 'https://www.instagram.com/reel/DcAs2R4kSYG/'
  },
  {
    id: 'DbvRDRZiahc',
    title: 'Exchange Rate Isn\'t Everything',
    hook: 'Comparing headline exchange rates against intermediary bank deductions.',
    category: 'Fee Transparency Hook',
    thumbnail: 'assets/images/reels/reel-3.png',
    instagramUrl: 'https://www.instagram.com/reel/DbvRDRZiahc/'
  },
  {
    id: 'DbK3P4Hli0L',
    title: 'Need a Reliable Way to Send Money Home?',
    hook: 'Conversational diaspora lifestyle reel addressing common remittance challenges.',
    category: 'Lifestyle Storytelling',
    thumbnail: 'assets/images/reels/reel-4.png',
    instagramUrl: 'https://www.instagram.com/reel/DbK3P4Hli0L/'
  },
  {
    id: 'DZeexN8lB2p',
    title: 'Don\'t Send Money Blindly (Fee Explainer)',
    hook: 'Motion graphics & FX breakdown exposing hidden wire deductions.',
    category: 'Educational FX Explainer',
    thumbnail: 'assets/images/reels/reel-5.png',
    instagramUrl: 'https://www.instagram.com/reel/DZeexN8lB2p/'
  },
  {
    id: 'DZM1PVkFJhO',
    title: 'Why Choose ISEND? (Speed & Security)',
    hook: 'Key value propositions: instant delivery, best live rates, and zero hidden fees.',
    category: 'Brand Value Proposition',
    thumbnail: 'assets/images/reels/reel-6.png',
    instagramUrl: 'https://www.instagram.com/reel/DZM1PVkFJhO/'
  },
  {
    id: 'DYeGanUgN-C',
    title: 'Traditional Wire vs 1-Tap Remittance',
    hook: 'Split-screen comparison exposing slow manual forms vs instant smartphone transfer.',
    category: 'Comparison Reel',
    thumbnail: 'assets/images/reels/reel-7.png',
    instagramUrl: 'https://www.instagram.com/reel/DYeGanUgN-C/'
  },
  {
    id: 'DYBgAyxjMBP',
    title: 'Friday Currency Trivia & Quiz',
    hook: 'Interactive Friday trivia reels designed to boost comments and algorithmic reach.',
    category: 'Community Gamification',
    thumbnail: 'assets/images/reels/reel-8.png',
    instagramUrl: 'https://www.instagram.com/reel/DYBgAyxjMBP/'
  },
  {
    id: 'DV0hOiLiDOH',
    title: 'Relatable Things for Expats Abroad',
    hook: 'High-virality cultural storytelling connecting diaspora life with sending money home.',
    category: 'Diaspora Storytelling',
    thumbnail: 'assets/images/reels/reel-9.png',
    instagramUrl: 'https://www.instagram.com/reel/DV0hOiLiDOH/'
  },
  {
    id: 'DYTi98tDF7n',
    title: 'Tired of Bank Delays? Send with ISEND',
    hook: 'Direct-response problem-solution ad driving mobile app installs.',
    category: 'Conversion Reel',
    thumbnail: 'assets/images/reels/reel-10.png',
    instagramUrl: 'https://www.instagram.com/reel/DYTi98tDF7n/'
  }
];

function initVideos() {
  const container = document.getElementById('videos-container');
  if (!container) return;

  container.innerHTML = '';
  REELS_DATA.forEach((r, idx) => {
    const card = document.createElement('div');
    card.className = 'video-card card';
    card.style.animation = 'imgCardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both';
    card.style.animationDelay = `${Math.min(idx * 0.045, 0.5)}s`;
    card.innerHTML = `
      <div class="reel-thumb-frame" data-id="${r.id}" data-title="${r.title}" data-link="${r.instagramUrl}">
        <img src="${r.thumbnail}" alt="${r.title}" class="reel-thumb-img" loading="lazy">
        <div class="play-overlay">
          <div class="play-button-circle">
            <div class="play-triangle"></div>
          </div>
        </div>
      </div>
      <div class="video-card-body">
        <div class="article-cat-pill" style="align-self: flex-start; margin-bottom: 0.5rem;">${r.category}</div>
        <h4 class="video-card-title">${r.title}</h4>
        <p class="video-card-desc">${r.hook}</p>
        <div class="video-card-foot">
          <span>Play on Site</span>
          <span style="color: var(--accent-color); font-weight: 700;">▶</span>
        </div>
      </div>
    `;
    
    // Clicking card opens the embedded video player modal
    card.addEventListener('click', () => {
      openVideoEmbedModal(r);
    });

    container.appendChild(card);
  });
}

function openVideoEmbedModal(videoObj) {
  const modal = document.getElementById('video-embed-modal');
  const frameContainer = document.getElementById('video-iframe-container');
  const titleTarget = document.getElementById('video-modal-title');
  const extLink = document.getElementById('video-external-link');

  if (!modal || !frameContainer) return;

  if (titleTarget) titleTarget.textContent = videoObj.title;

  if (videoObj.videoSrc) {
    frameContainer.innerHTML = `
      <video controls autoplay playsinline style="width: 100%; height: 100%; max-height: 480px; object-fit: contain; background: #000; border-radius: var(--radius-sm);">
        <source src="${videoObj.videoSrc}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
    if (extLink) {
      extLink.href = videoObj.externalUrl || 'https://tai.co.jp/en/';
      extLink.innerHTML = `<span>Visit Official Website (tai.co.jp)</span> <span>→</span>`;
    }
  } else {
    if (extLink) {
      extLink.href = videoObj.instagramUrl;
      extLink.innerHTML = `<span>Open Directly on Instagram</span> <span>→</span>`;
    }
    // Render responsive Instagram embed iframe
    frameContainer.innerHTML = `
      <iframe 
        src="https://www.instagram.com/reel/${videoObj.id}/embed/captioned/" 
        allowtransparency="true" 
        allowfullscreen="true" 
        frameborder="0" 
        scrolling="no" 
        style="width: 100%; height: 100%; border: none;">
      </iframe>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   8. FINTECH & SEO ARTICLES (ALL 9 BLOG POSTS)
   ========================================================================== */
const ARTICLES_DATA = [
  {
    title: '7 Ways Fintech Is Reducing the Cost of Cross-Border Payments',
    category: 'Fintech & Tech',
    date: '2026 Edition',
    excerpt: 'An in-depth analysis of how API rails, automated treasury hedging, and peer-to-peer liquidity networks eliminate correspondent banking markup fees.',
    pdfUrl: 'assets/docs/7 Ways Fintech Is Reducing the Cost of Cross-Border Payments.pdf'
  },
  {
    title: 'Hundi Explained: Why Regulated Money Transfers Are the Safer Alternative',
    category: 'Regulatory & Security',
    date: '2026 Edition',
    excerpt: 'Breaking down the legal, financial, and security risks of informal Hundi networks compared to licensed Major Payment Institutions.',
    pdfUrl: 'assets/docs/Hundi Explained Why Regulated Money Transfers Are the Safer.pdf'
  },
  {
    title: 'Hidden Fees in International Money Transfers (And How to Avoid Them)',
    category: 'Consumer Guide',
    date: '2026 Edition',
    excerpt: 'A complete guide exposing inflated FX margins, intermediary wire deductions, and receiving bank charges in legacy remittance.',
    pdfUrl: 'assets/docs/Hidden Fees in International Money Transfers (And How to Avo.pdf'
  },
  {
    title: 'Digital Remittance Explained: How Fintech Is Transforming International Money Transfers',
    category: 'Fintech Overview',
    date: '2026 Edition',
    excerpt: 'Examining digital payment rails, speed enhancements, and mobile wallet integration in cross-border financial systems.',
    pdfUrl: 'assets/docs/Digital Remittance Explained How Fintech Is Transforming Int.pdf'
  },
  {
    title: 'How Fintech is Transforming Banking Digital Innovation',
    category: 'Digital Innovation',
    date: '2026 Edition',
    excerpt: 'How modern neobanking architecture and API ecosystems are displacing legacy banking infrastructure across global corridors.',
    pdfUrl: 'assets/docs/How Fintech is Transforming Banking Digital Innovation.pdf'
  },
  {
    title: 'Mobile-First Remittance: How Smartphones Are Changing Global Remittance',
    category: 'Mobile & UX',
    date: '2026 Edition',
    excerpt: 'How smartphone penetration and e-wallet ecosystems are driving instant, frictionless financial inclusion for migrant workers.',
    pdfUrl: 'assets/docs/Mobile-First Remittance How Smartphones Are Changing Global.pdf'
  },
  {
    title: 'The Future of International Money Transfers: Trends Shaping Remittance in 2026',
    category: 'Industry Trends',
    date: '2026 Edition',
    excerpt: 'Forecasting instant settlement networks, ISO 20022 compliance standards, and digital asset liquidity corridors in global payments.',
    pdfUrl: 'assets/docs/The Future of International Money Transfers Trends Shaping R.pdf'
  },
  {
    title: 'What Affects the Cost of Sending Money Internationally: A Complete Breakdown',
    category: 'Consumer Education',
    date: '2026 Edition',
    excerpt: 'A breakdown of foreign exchange spreads, flat transfer fees, payment methods, and regulatory compliance expenses.',
    pdfUrl: 'assets/docs/What Affects the Cost of Sending Money Internationally A Com (1).pdf'
  },
  {
    title: 'What to Look for in a Reliable International Money Transfer Provider',
    category: 'Trust & Compliance',
    date: '2026 Edition',
    excerpt: 'Essential checklist for assessing payment provider licensing (AUSTRAC, MAS, FCA), speed, transparent pricing, and data security.',
    pdfUrl: 'assets/docs/What to Look for in a Reliable International Money Transfer.pdf'
  }
];

function initArticles() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  container.innerHTML = '';
  ARTICLES_DATA.forEach(a => {
    const card = document.createElement('div');
    card.className = 'article-card card';
    card.innerHTML = `
      <div class="article-top-meta">
        <span class="article-cat-pill">${a.category}</span>
        <span class="article-edition-tag">${a.date}</span>
      </div>
      <h3 class="article-title">${a.title}</h3>
      <p class="article-summary">${a.excerpt}</p>
      <a href="${a.pdfUrl}" class="article-pdf-link" target="_blank" rel="noopener noreferrer">
        <span>Read PDF Report</span>
        <span>→</span>
      </a>
    `;
    container.appendChild(card);
  });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & MAILTO TRIGGER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const statusDiv = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');
    const subjectInput = document.getElementById('contact-subject');

    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!msgInput.value.trim()) {
      msgInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Message</span><span class="arrow-icon">→</span>`;

      statusDiv.className = 'form-feedback success';
      statusDiv.innerHTML = `Thank you! Opening your email client to send message to Aakash...`;

      const sub = encodeURIComponent(subjectInput.value.trim() || 'New Opportunity / Marketing Inquiry');
      const body = encodeURIComponent(`Hi Aakash,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${msgInput.value.trim()}`);
      window.location.href = `mailto:aakashshah653@gmail.com?subject=${sub}&body=${body}`;

      showToast('Email client opened successfully!', 'success');
      form.reset();
    }, 400);
  });
}

/* ==========================================================================
   10. MODALS & LIGHTBOX CLOSE HANDLERS
   ========================================================================== */
function initModals() {
  const videoModal = document.getElementById('video-embed-modal');
  const lightboxModal = document.getElementById('lightbox-modal');

  const videoCloseBtn = document.getElementById('video-modal-close-btn');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  function closeAll() {
    if (videoModal) {
      videoModal.classList.remove('active');
      const fc = document.getElementById('video-iframe-container');
      if (fc) fc.innerHTML = '';
    }
    if (lightboxModal) lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (videoCloseBtn) videoCloseBtn.addEventListener('click', closeAll);
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeAll);

  [videoModal, lightboxModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) closeAll();
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

/* ==========================================================================
   11. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}
