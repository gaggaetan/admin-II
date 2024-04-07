import requests

def check_https(url):
    try:
        requests.get(f"https://{url}", verify=True)
        return True
    except (requests.exceptions.SSLError, ConnectionError, Exception) as e:
        return False

def check_http(url):
    try:
        requests.get(f"http://{url}", verify=True)
        return True
    except (requests.exceptions.SSLError, ConnectionError, Exception) as e:
        return False
