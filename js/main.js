/* Initialise AOS (Animate On Scroll) */
AOS.init({ once: true });

/* ========= Welcome-video language switcher ========= */
const vidMap = {
  en: 'https://vimeo.com/1094680350',
  pt: 'https://vimeo.com/1094680350',
  es: 'https://vimeo.com/1094680350',
  pl: 'https://vimeo.com/1094680350',
  ru: 'https://vimeo.com/1094680350'
};
const welVid    = document.getElementById('welVid');
const pickerBtn = document.querySelectorAll('.vid-picker button');
pickerBtn.forEach(btn=>{
  btn.onclick = () =>{
    pickerBtn.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.dataset.lang;
    welVid.src = vidMap[lang] || vidMap.en;
  };
});


/* ==== Burger menu ==== */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => navLinks.classList.toggle('show'));

/* ==== Dark-mode toggle ==== */
const themeToggle = document.getElementById('themeToggle');
const rootElement = document.documentElement;
const storedTheme = localStorage.getItem('theme');

if (storedTheme) rootElement.setAttribute('data-theme', storedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = rootElement.getAttribute('data-theme') === 'dark';
  rootElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

/* ==== Current year in footer ==== */
document.getElementById('curYear').textContent = new Date().getFullYear();

/* ========= Prefill message & smooth-scroll (single, safe) ========= */
document.addEventListener('DOMContentLoaded', () => {
  const msgField  = document.getElementById('msgField');
  const contactEl = document.getElementById('contact');

  document.querySelectorAll('.choose-plan').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();                                  // stop default jump
      msgField.value = btn.dataset.msg;                    // fill textarea
      contactEl.scrollIntoView({ behavior: 'smooth' });    // scroll nicely
      msgField.focus({ preventScroll: true });             // cursor ready
    });
  });
});

/* ========= Unified contact buttons ========= */
const nameF = document.getElementById('nameField');
const mailF = document.getElementById('emailField');
const msgF  = document.getElementById('msgField');

const buildText = () =>
  encodeURIComponent(
    `Hi, my name is ${nameF.value.trim()}, my email is ${mailF.value.trim()}, and my message is ${msgF.value.trim()}.`
  );

// ——— your phone & IG handle ———
const PHONE   = '48788542112';   // digits only
const IG_USER = 'oitutor_wen';   // instagram.com/oitutor_wen
// ————————————————

// helper – attach only if the element exists
const safeClick = (el, fn) => el && el.addEventListener('click', fn);

safeClick(document.getElementById('waBtn'),  e => {
  e.preventDefault();
  window.open(`https://wa.me/${PHONE}?text=${buildText()}`,'_blank');
});

safeClick(document.getElementById('tgBtn'),  e => {
  e.preventDefault();
  window.open(`https://t.me/share/url?url=&text=${buildText()}`,'_blank');
});

safeClick(document.getElementById('sigBtn'), e => {
  e.preventDefault();
  window.open(`https://signal.me/#p/+${PHONE}?text=${buildText()}`,'_blank');
});

safeClick(document.getElementById('igBtn'),  e => {
  e.preventDefault();
  window.open(`https://instagram.com/${IG_USER}`,'_blank');
});
