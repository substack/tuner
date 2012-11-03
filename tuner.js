var spawn = require('child_process').spawn;
var stations = require('./stations.json');

var cmd = process.argv[2];
if (cmd === 'play') {
    play(stations[process.argv[3]]);
}
else if (cmd === 'list') {
    list();
}
else if (stations[cmd]) {
    play(stations[cmd]);
}
else list();

function list () {
    Object.keys(stations).sort().forEach(function (name) {
        var s = stations[name];
        console.log(
            name + ' - '
            + s.description
            + ' (' + s.location + ')'
        );
    });
}

function play (station) {
    spawn('mplayer', [ station.href ], {
        stdio : [ 0, 1, 2 ]
    });
}
