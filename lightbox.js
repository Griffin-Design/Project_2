(function(){
  // create overlay once
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-inner" role="dialog" aria-modal="true">
      <button class="lightbox-close" aria-label="Close">✕</button>
      <img alt="">
      <div class="lightbox-caption" aria-hidden="false"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function open(src, alt, caption){
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = caption || alt || '';
    overlay.classList.add('open');
    // focus for keyboard
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }
  function close(){
    overlay.classList.remove('open');
    imgEl.src = '';
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', (e)=>{
    // close when clicking outside the image area
    if(e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  // attach to images (exclude header/footer icons). Add class "no-lightbox" to opt-out.
  const allImages = Array.from(document.querySelectorAll('img'));
  allImages.forEach(img=>{
    if(img.closest('.footer-icons') || img.closest('header') || img.classList.contains('no-lightbox')) return;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (ev)=>{
      // Use data-large if present for hi-res; otherwise use src
      const src = img.dataset.large || img.src;
      const caption = img.dataset.caption || img.alt || '';
      open(src, img.alt || '', caption);
    });
  });
})();