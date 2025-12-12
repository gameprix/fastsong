const ping = require('ping');

const sites = [
    'fastsong.eu.org',
    'www.fastsong.eu.org',
    // Add 98 more active search sites here
];

const pingSites = async () => {
    for (const site of sites) {
        try {
            const res = await ping.promise.probe(site);
            console.log(`${site}: ${res.alive ? 'Alive' : 'Dead'}`);
        } catch (error) {
            console.error(`Error pinging ${site}: ${error.message}`);
        }
    }
};

pingSites();
