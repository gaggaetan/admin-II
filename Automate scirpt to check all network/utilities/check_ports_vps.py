import socket
import concurrent.futures
import threading

# Maximum number of threads you want to allow
MAX_THREADS = 5

# Semaphore to control thread creation
thread_semaphore = threading.Semaphore(MAX_THREADS)

def check_open_port(host, port):
    s = socket.socket()
    s.settimeout(0.1)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    try:
        code = s.connect_ex((host, port))
        s.close()

        if code == 0:
            return True
        else:
            return False
    except socket.error:
        return False

def get_open_ports(host, ports):
    open_ports = []

    def worker(port):
        if check_open_port(host, port):
            open_ports.append(port)

        # Release the semaphore after thread execution
        thread_semaphore.release()

    pool = concurrent.futures.ThreadPoolExecutor()
    for port in ports:
        # Acquire the semaphore (blocking)
        thread_semaphore.acquire()
        # Start a new thread
        pool.submit(worker, port)

    pool.shutdown(wait=True)

    return open_ports


