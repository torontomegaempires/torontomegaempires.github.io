(function () {
  var NATION_COLORS = {
    'Minoa':    '#7CB342',
    'Saba':     '#E57373',
    'Assyria':  '#42A5F5',
    'Maurya':   '#F44336',
    'Celt':     '#388E3C',
    'Babylon':  '#757575',
    'Carthage': '#FF9800',
    'Dravidia': '#1A237E',
    'Hatti':    '#E91E63',
    'Kushan':   '#8D6E63',
    'Rome':     '#C62828',
    'Persia':   '#673AB7',
    'Iberia':   '#546E7A',
    'Nubia':    '#26A69A',
    'Hellas':   '#FFEB3B',
    'Indus':    '#2E7D32',
    'Egypt':    '#D7CCC8',
    'Parthia':  '#689F38',
  };

  var Y_MIN = 40;
  var Y_MAX = 175;
  var WHISKER_HALF = 6; // half of errorBarWhiskerSize (12)

  function isDark() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function abbrevGame(name, date) {
    if (/^Game \d+$/.test(name)) return 'G' + name.slice(5);
    if (name === 'Niagara Boardgame Weekend') return "NBW '" + date.slice(2, 4);
    if (name.startsWith('MegaCon Winter ')) return "MC '" + name.slice(-2);
    if (name.startsWith('Breakout ')) return "BK '" + name.slice(-2);
    return name.slice(0, 6);
  }

  var dark = isDark();
  var errorColor = dark ? 'rgba(255,255,255,0.90)' : 'rgba(55,65,81,0.65)';
  var avgColor   = dark ? '#ffffff'                : '#374151';
  var tickColor  = dark ? '#94a3b8'                 : '#5a6c7d';
  var gridColor  = dark ? 'rgba(255,255,255,0.08)'  : 'rgba(0,0,0,0.07)';

  var data = window.nationChartData || [];

  data.forEach(function (nationObj) {
    var nation = nationObj.nation;
    var color = NATION_COLORS[nation] || '#888888';
    var canvasId = 'chart-' + nation.toLowerCase().replace(/ /g, '-');
    var ctx = document.getElementById(canvasId);
    if (!ctx) return;
    var games = nationObj.games;

    var avgMarkerPlugin = {
      id: 'avgMarker',
      afterDatasetsDraw: function (chart) {
        var c = chart.ctx;
        var meta = chart.getDatasetMeta(0);
        meta.data.forEach(function (bar, i) {
          if (!games[i]) return;
          var yPx = chart.scales.y.getPixelForValue(games[i].avg);
          c.save();
          c.beginPath();
          c.moveTo(bar.x - WHISKER_HALF, yPx);
          c.lineTo(bar.x + WHISKER_HALF, yPx);
          c.strokeStyle = avgColor;
          c.lineWidth = 2.5;
          c.lineCap = 'round';
          c.stroke();
          c.restore();
        });
      },
    };

    new Chart(ctx, {
      type: 'barWithErrorBars',
      data: {
        labels: games.map(function (g) { return abbrevGame(g.name, g.date); }),
        datasets: [{
          data: games.map(function (g) {
            return { y: g.score, yMin: g.avg - g.sd, yMax: g.avg + g.sd };
          }),
          backgroundColor: color + 'cc',
          borderColor: color,
          borderWidth: 1,
          errorBarColor: errorColor,
          errorBarWhiskerColor: errorColor,
          errorBarLineWidth: 2.5,
          errorBarWhiskerLineWidth: 2.5,
          errorBarWhiskerSize: 12,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var g = games[ctx.dataIndex];
                return ['Score: ' + g.score, 'Game avg: ' + g.avg, '±1 SD: ' + g.sd];
              },
            },
          },
        },
        scales: {
          x: {
            ticks: { font: { size: 10 }, color: tickColor },
            grid: { display: false },
          },
          y: {
            min: Y_MIN,
            max: Y_MAX,
            ticks: { stepSize: 20, color: tickColor },
            grid: { color: gridColor },
            title: { display: false },
          },
        },
      },
      plugins: [avgMarkerPlugin],
    });
  });
})();
