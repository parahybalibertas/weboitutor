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

/* ========= Choose-Plan autofill + social share ========= */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Autofill & smooth-scroll --- */
  const msgBox   = document.getElementById('msgField');
  const contact  = document.getElementById('contact');

  document.querySelectorAll('.choose-plan').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();                         // stop link jump
      msgBox.value = btn.dataset.msg;             // preset text
      contact.scrollIntoView({ behavior:'smooth'});
      msgBox.focus({ preventScroll:true });
    });
  });

  /* --- Social / messenger deep-links --- */
  const nameBox  = document.getElementById('nameField');
  const emailBox = document.getElementById('emailField');

  const phone  = '48788542112';   // digits only
  const igUser = 'oitutor_wen';

  const text = () =>
    encodeURIComponent(
      `Hi, my name is ${nameBox.value.trim()}, my email is ${emailBox.value.trim()}, and my message is ${msgBox.value.trim()}.`
    );

  const on = (id, url) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', e => {
      e.preventDefault();
      window.open(url(),'_blank');
    });
  };

  on('waBtn',  () => `https://wa.me/${phone}?text=${text()}`);
  on('tgBtn',  () => `https://t.me/share/url?url=&text=${text()}`);
  on('sigBtn', () => `https://signal.me/#p/+${phone}?text=${text()}`);
  on('igBtn',  () => `https://instagram.com/${igUser}`);
});
