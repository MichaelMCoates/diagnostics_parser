// Xavier's quick parsing code. Good for regex references.

const fs = require('fs')
const logLoc = './debug.log'
const logr = fs.readFileSync(logLoc, 'utf8')
const log = logr.split('\n')
const TIME = /^\[(.*?)\]/
let metas = [
    ['openfin version', /"openfin": "(\d+\.\d+\.\d+\.\d+)/],
    ['chrome version', /"chrome": "(\d+\.\d+\.\d+\.\d+)/],
    ['adapter sha', /"adapter": "(\d{8})/],
    ['core sha', /"core": "(\d{8})/],
    ['electron version', /"electron": "(v\d+.*)"/],
    ['multi-runtime mode', /multi-runtime mode (.*)/],
    ['build architecture', /build architecture: (.*)/],
    ['free memory', / - free: (\d+) KB/],
    ['total memory', / - total: (\d+) KB/],
    ['start time', TIME]
]
const meta = {}


// get meta  ////////////////////////////////
function mfinder (log, metas, meta) {
    for (let i=0;i<log.length;i++) {
        if (metas.length === 0) break;
        for (const [j, [k, v]] of metas.entries()) {
            const val = v.exec(log[i])
            if (val) {
                meta[k] = val[1]
                metas[j] = null
            }
        }
        metas = metas.filter(x => x)
    }
} 

mfinder(log, metas, meta)
mfinder(log.reverse(), [['end time', TIME]], meta)
log.reverse()

console.log(meta);

// windows and apps  ////////////////////////////////
const UUID = /received in-runtime.*\[(.*?)\]-/
const NAME = /received in-runtime.*\[(.*?)\] {/
const APPC = /.*raise-many-events/
const API = /received in-runtime.*{"action":"(.*?)"/
const MSG = /^\[.*?\]-\[.*?\] (.*)/
const wins = []

for (let i=0;i<log.length;i++) {
    const line = log[i];
    if (APPC.test(line)) {
        wins.push({
            app: (UUID.exec(line))[1],
            win: NAME.exec(line)[1],
            start: TIME.exec(line)[1]
        })
    }
}

console.log(wins);

// annotate all lines  ////////////////////////////////
const l = log.map(line => {
    const msg = MSG.exec(line)
    const api = API.exec(line)
    const uuid = UUID.exec(line)
    const win = NAME.exec(line)
    const time = TIME.exec(line)
    return {
        msg: msg? msg[1] : line,
        api: api && api[1],
        app: uuid && uuid[1],
        win: win && win[1],
        time: time && new Date(time[1]).toLocaleTimeString()
    }
})


// write it back down   ////////////////////////////////
fs.writeFileSync('./ofil.json', JSON.stringify({
    meta, wins, lines:l
}))

// console.log(l.filter(x=>x.api).slice(5))
// console.log(meta);

// console.log(/electron/.exec(log));