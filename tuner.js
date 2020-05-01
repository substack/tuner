#!/usr/bin/env node

var spawn = require('child_process').spawn;
var stations = require('./stations.json');

var cmd = process.argv[2];
if (cmd === 'play') {
    play(stations[process.argv.slice(3).join(' ')]);
}
else if (cmd === 'list') {
    list();
}
else if (cmd === 'search') {
    search(process.argv.slice(3));
}
else if (stations[process.argv.slice(2).join(' ')]) {
    play(stations[process.argv.slice(2).join(' ')]);
}
else list();

function search (terms) {
    var res = terms.map(function (t) { return new RegExp(t, 'i') });
    function match (name) {
        var s = name + ' ' + JSON.stringify(stations[name]);
        return res.every(function (re) { return re.test(s) });
    }
    
    Object.keys(stations).sort()
        .filter(match)
        .forEach(function (name) {
            console.log(show(name));
        })
    ;
}

function list () {
    Object.keys(stations).sort().forEach(function (name) {
        console.log(show(name));
    });
}

function show (name) {
    var s = stations[name];
    return [ name,
        [
            s.description,
            (s.location ? ' (' + s.location + ')' : '')
        ].filter(Boolean).join(' ')
    ].filter(Boolean).join(' - ');
}

function play (station) {
    spawn('mpv', [ station.href ], {
        stdio : [ 0, 1, 2 ]
    });
}
