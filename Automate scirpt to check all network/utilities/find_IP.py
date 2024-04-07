import socket

def get_ip_address(url):
    try:
        ip_address = socket.gethostbyname(url)
        return ip_address
    except socket.gaierror:
        return None

print(get_ip_address("www.l2-2.ephec-ti.be"))
