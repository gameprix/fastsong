import os
import subprocess

def ping_sites(sites):
    for site in sites:
        response = subprocess.run(['ping', '-c', '1', site], stdout=subprocess.PIPE)
        print(f'Pinging {site}:')
        print(response.stdout.decode())

if __name__ == "__main__":
    sites_to_ping = ['fastsong.eu.org'] * 100 + ['www.fastsong.eu.org'] * 100
    ping_sites(sites_to_ping)
