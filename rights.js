function showSidebar() {
  const sidebar = document.querySelector('.sidebar-bar');
  sidebar.style.display = 'flex';
  setTimeout(() => {
    sidebar.classList.add('open');
  }, 10); // allow display to apply before transition
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar-bar');
  sidebar.classList.remove('open');
  setTimeout(() => {
    sidebar.style.display = 'none';
  }, 800); // match the transition duration
}


document.addEventListener("DOMContentLoaded", () => {
  const introText = document.querySelector(".intro-text");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        introText.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(introText);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".content-block").forEach((block) => {
  observer.observe(block);
});





// عناصر
const buttons = document.querySelectorAll(".buttons-row .btn");
const status = document.getElementById("download-status");

// مساعدة لعرض رسالة حالة قصيرة
function showStatus(text, type = "info", ms = 2500) {
  status.textContent = text;
  status.style.color = (type === "error") ? "#d9534f" : (type === "success") ? "#17a2b8" : "#667085";
  // إخفاء بعد المدة
  if (ms > 0) {
    clearTimeout(showStatus._t);
    showStatus._t = setTimeout(() => status.textContent = "", ms);
  }
}

// تابع التعامل مع النقر — يستخدم سلوك الرابط download إن كان المتصفح يدعمه
buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    // إذا أردت أن تعمل عبر JS بدل السلوك الافتراضي، أزل السطر التالي
    // e.preventDefault();

    // جلب مسار الملف من href أو من data-file
    const href = btn.getAttribute("href") || btn.dataset.file;
    const filename = btn.dataset.file || href.split("/").pop();

    // تجربة بسيطة: نتحقق إن الملف موجود (هذا اختبار بسيط على مستوى الواجهة — لا يتحقق فعليًا من الملف على السيرفر)
    if (!href) {
      e.preventDefault();
      showStatus("رابط الملف غير مُحدَّد.", "error", 3000);
      return;
    }

    // عرض حالة سريعة قبل التحميل
    showStatus(`جاري التحميل: ${filename} ...`, "info", 2000);

  });
});

