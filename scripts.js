/* Ripple por delegación de eventos (un solo listener) */
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('.ripple-btn') : null;
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    var y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    var circle = document.createElement('span');
    circle.className = 'ripple-circle';
    circle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px';
    btn.appendChild(circle);
    setTimeout(function () { circle.remove(); }, 600);
  });

  /* Copiar enlace con confirmación visual y respaldo para file:// */
  function copyLink() {
    var url = window.location.href;
    var icon = document.getElementById('copyIcon');
    var label = document.getElementById('copyLabel');
    if (!icon) return;
    var svgOriginal = icon.innerHTML;
    var svgOk = '<svg viewBox="0 0 24 24" width="24" height="24" fill="#d4af37"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';

    function marcarExito() {
      icon.innerHTML = svgOk;
      label.textContent = '¡Copiado!';
      setTimeout(function () {
        icon.innerHTML = svgOriginal;
        label.textContent = 'Copiar';
      }, 2000);
    }

    function copiaFallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var hecho = document.execCommand('copy');
        document.body.removeChild(ta);
        if (hecho) { marcarExito(); return; }
      } catch (e) { /* seguir al prompt */ }
      window.prompt('Copia el enlace manualmente:', url);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(marcarExito).catch(copiaFallback);
    } else {
      copiaFallback();
    }
  }

  /* Guardar contacto (.vcf) */
  function saveContact() {
    var vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Fabián Rincón C.',
      'N:Rincón C.;Fabián;;;',
      'ORG:FRC - Alianza Legal',
      'TITLE:Abogado - Esp. Derecho Laboral y Seguridad Social (en curso)',
      'TEL;TYPE=CELL,VOICE:+573117811684',
      'EMAIL:fabian.rincon.c@example.com',
      'ADR;TYPE=WORK:;;Cali;;; ;Colombia',
      'NOTE:Compromiso, estrategia y justicia. Derecho laboral individual y colectivo, pensiones y accidentes de trabajo.',
      'END:VCARD'
    ].join('\n');
    var blob = new Blob([vcf], { type: 'text/vcard' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Fabian_Rincon_FRC.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1200);
  }

  /* Gestión de overlays (hojas de servicio y modal compartir) */
  function quitarOverlays() {
    document.querySelectorAll('.svc-overlay, .share-overlay').forEach(function (o) { o.classList.remove('active'); });
    document.body.style.overflow = '';
  }

  function abrirCompartir() {
    document.getElementById('shareOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function cerrarCompartir() { quitarOverlays(); }

  function openSvc(id) {
    document.querySelectorAll('.svc-overlay').forEach(function (o) { o.classList.remove('active'); });
    var el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  function closeSvc() { quitarOverlays(); }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('anio').textContent = new Date().getFullYear();

    /* Cerrar hojas deslizando hacia abajo */
    document.querySelectorAll('.svc-sheet, .share-sheet').forEach(function (sheet) {
      var startY = 0;
      sheet.addEventListener('touchstart', function (e) { startY = e.touches[0].clientY; }, { passive: true });
      sheet.addEventListener('touchend', function (e) {
        if (e.changedTouches[0].clientY - startY > 60) quitarOverlays();
      }, { passive: true });
    });

    /* Cerrar con tecla Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') quitarOverlays();
    });

    /* PWA: registro del service worker */
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').catch(function () {});
      });
    }
  });
