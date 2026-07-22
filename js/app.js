(function(){
  const nav = document.getElementById('nav');
  const viewHome = document.getElementById('view-home');
  const viewAlbum = document.getElementById('view-album');

  window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 40));

  // Grid views use a small "-thumb" version of each image (generated
  // automatically by the optimize-images GitHub Action); the lightbox
  // uses the full-size file. Falls back to the full image if no thumb
  // exists yet (e.g. right after adding a photo, before the Action runs).
  function thumbOf(src){
    return src.replace(/(\.[a-zA-Z]+)$/, '-thumb$1');
  }

  // ---------- Home: album grid ----------
  function renderHome(){
    const grid = document.getElementById('albumGrid');
    grid.innerHTML = ALBUMS.map(a => `
      <a class="album-card" href="#/album/${a.id}">
        <img src="${thumbOf(a.cover)}" onerror="this.onerror=null;this.src='${a.cover}';" alt="${a.title}" loading="lazy">
        <div class="album-caption">
          <div class="album-eyebrow">${a.category}</div>
          <div class="album-title serif">${a.title}${a.subtitle ? ', ' + a.subtitle : ''}</div>
          <div class="album-count">${a.photos.length} photograph${a.photos.length===1?'':'s'}</div>
        </div>
      </a>
    `).join('');

    document.getElementById('statAlbums').textContent = ALBUMS.length;
    document.getElementById('statPhotos').textContent = ALBUMS.reduce((sum,a)=>sum+a.photos.length,0);
  }

  // ---------- Album detail ----------
  let currentPhotos = [];
  function renderAlbum(id){
    const album = ALBUMS.find(a => a.id === id);
    if (!album){ location.hash = '#/'; return; }
    currentPhotos = album.photos;
    document.getElementById('albumTitle').textContent = album.title;
    document.getElementById('albumSubtitle').textContent = [album.subtitle, album.category].filter(Boolean).join(' · ');
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = album.photos.map((p, i) => `
      <div class="tile" data-idx="${i}">
        <img src="${thumbOf(p.src)}" onerror="this.onerror=null;this.src='${p.src}';" alt="${p.caption || album.title}" loading="lazy">
        <div class="tile-caption">
          <div class="tile-plate">Plate No. ${String(i+1).padStart(3,'0')}</div>
          <div class="tile-cap serif">${p.caption || ''}</div>
        </div>
      </div>
    `).join('');
    grid.querySelectorAll('.tile').forEach(t => {
      t.addEventListener('click', () => openLightbox(parseInt(t.dataset.idx,10)));
    });
  }

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  let lbPos = 0;
  function openLightbox(pos){
    lbPos = pos;
    showLightboxItem();
    lightbox.classList.add('open');
  }
  function showLightboxItem(){
    const p = currentPhotos[lbPos];
    document.getElementById('lbImg').src = p.src;
    document.getElementById('lbPlate').textContent = 'Plate No. ' + String(lbPos+1).padStart(3,'0');
    document.getElementById('lbCap').textContent = p.caption || '';
  }
  document.getElementById('lbClose').onclick = () => lightbox.classList.remove('open');
  document.getElementById('lbPrev').onclick = () => { lbPos = (lbPos - 1 + currentPhotos.length) % currentPhotos.length; showLightboxItem(); };
  document.getElementById('lbNext').onclick = () => { lbPos = (lbPos + 1) % currentPhotos.length; showLightboxItem(); };
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
  });
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  // ---------- Router ----------
  function route(){
    const hash = location.hash || '#/';
    const albumMatch = hash.match(/^#\/album\/(.+)$/);
    if (albumMatch){
      viewHome.classList.remove('active');
      viewAlbum.classList.add('active');
      renderAlbum(decodeURIComponent(albumMatch[1]));
      window.scrollTo(0,0);
    } else {
      viewAlbum.classList.remove('active');
      viewHome.classList.add('active');
    }
  }
  window.addEventListener('hashchange', route);

  // ---------- Init ----------
  renderHome();
  route();
})();
