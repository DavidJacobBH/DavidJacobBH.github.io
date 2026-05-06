var JOURNEY = [
  { stop: 1,  page: 'page-01.html', name: 'The Outside'        },
  { stop: 2,  page: 'page-03.html', name: 'The Entrance'       },
  { stop: 3,  page: 'page-04.html', name: 'The Fireplace Room' },
  { stop: 4,  page: 'page-09.html', name: 'Common Room'         },
  { stop: 5,  page: 'page-12.html', name: 'The Lounge'         },
  { stop: 6,  page: 'page-07.html', name: 'The Staircase'      },
  { stop: 7,  page: 'page-08.html', name: 'Upstairs'            },
  { stop: 8,  page: 'page-10.html', name: 'Upstairs Common'    },
  { stop: 9,  page: 'page-11.html', name: 'The Gallery'        },
  { stop: 10, page: 'page-05.html', name: 'Coffee Club Lounge'  },
  { stop: 11, page: 'page-06.html', name: 'Coffee Club'         },
  { stop: 12, page: 'page-02.html', name: 'The Grounds'        }
];

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp'  && document.querySelector('.prev')) location.href = document.querySelector('.prev').href;
  if (e.key === 'ArrowDown' && document.querySelector('.next')) location.href = document.querySelector('.next').href;
});

document.querySelectorAll('.gallery img').forEach(function(img) {
  if (img.classList.contains('no-zoom')) return;
  img.addEventListener('click', function() {
    var lb = document.createElement('div');
    lb.id = 'lb';
    lb.innerHTML = '<div class="bg"></div><img src="' + img.src + '">';
    document.body.appendChild(lb);
    lb.querySelector('.bg').addEventListener('click', function() { lb.remove(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', onKey); }
    });
  });
});

var fireBtn = document.querySelector('.fire-btn');
if (fireBtn) {
  fireBtn.addEventListener('click', function() {
    document.body.classList.toggle('warm');
    fireBtn.textContent = document.body.classList.contains('warm') ? '🔥 ON 🔥' : '🔥 OFF 🔥';
  });
}


var audio = document.getElementById('audio');
if (audio) {
  var playBtn = document.getElementById('play');
  var bars    = document.getElementById('bars');
  var vol     = document.getElementById('vol');

  audio.volume = vol.value / 100;

  playBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = '&#9646;&#9646;';
      bars.classList.add('on');
    } else {
      audio.pause();
      playBtn.innerHTML = '&#9654;';
      bars.classList.remove('on');
    }
  });

  vol.addEventListener('input', function() { audio.volume = this.value / 100; });
}

// ── Journey gamification ──────────────────────────────────────────────────────
(function () {
  var stopAttr = document.body.dataset.stop;
  if (!stopAttr) return;

  var stopNum = parseInt(stopAttr, 10);
  var total   = JOURNEY.length;
  var current = JOURNEY[stopNum - 1];

  // Progress bar
  var bar = document.createElement('div');
  bar.id  = 'journey-progress';
  document.body.insertBefore(bar, document.body.firstChild);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      bar.style.width = Math.round((stopNum / total) * 100) + '%';
    });
  });

  // Location banner
  var banner = document.createElement('div');
  banner.id  = 'journey-banner';
  banner.innerHTML =
    '<span class="jb-name">' + current.name + '</span>' +
    '<span class="jb-stop">Stop ' + stopNum + ' of ' + total + '</span>';
  document.body.appendChild(banner);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { banner.classList.add('jb-visible'); });
  });


}());
