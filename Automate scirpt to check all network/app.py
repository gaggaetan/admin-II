from flask import Flask, render_template, jsonify, request, send_file
import subprocess
import requests
from utilities.check_ports_vps import get_open_ports
from utilities.find_IP import get_ip_address
from utilities.check_http_https import check_https, check_http
from utilities.email import send_email

app = Flask(__name__)
global vps_old_status
vps_old_status = False

def check_ping(ip):
    result = subprocess.run(['ping', '-c', '1', ip], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return result.returncode == 0


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/refrech-site')
def refrech_site():
    path_to_file = 'refrech_site/index.html'
    return send_file(path_to_file)


@app.route('/ping', methods=['POST'])
def ping():
    ip = request.json.get('ip')
    is_up = check_ping(ip)
    return jsonify({'ip': ip, 'status': is_up})


@app.route('/all-vps.json', methods=['get'])
def all_vps():
    return send_file("data/all_vps.json")

@app.route('/all-groups.json', methods=['get'])
def all_groups():
    return send_file("data/all_groups.json")


@app.route('/index.js', methods=['get'])
def JavaScript():
    return send_file("refrech_site/index.js")

@app.route('/check-ports', methods=['post'])
def check_ports():
    ip = request.json.get('ip')
    open_ports = get_open_ports(ip, [80, 53, 443, 22, 8080] )
    return jsonify(open_ports)

@app.route('/find-ip-and-check-http-https', methods=['post'])
def find_ip():
    url = request.json.get('url')
    ip = get_ip_address(url)
    http = check_http(url)
    https = check_https(url)
    return jsonify({'ip': ip, 'http': http, 'https': https})

@app.route('/vps-status', methods=['post'])
def status():
    global vps_old_status
    vps_status = request.json.get("vps-status")
    if vps_old_status and vps_status == False :
        vps_old_status = False
        print('send email down')
        send_email("VPS-HTTPS IS DOWN", "ALLERT, your HTTPS on your VPS is DOWN")
    elif not vps_old_status and vps_status == True :
        vps_old_status = True
        send_email("VPS-HTTPS IS UP", "That is great, your HTTPS on your VPS is up")
        print('send email up')
    return jsonify("ok")




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
