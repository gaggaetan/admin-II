
FROM internetsystemsconsortium/bind9:9.18
ADD ./named.conf /etc/bind/named.conf
ADD l2-2.zone /etc/bind/l2-2.zone
RUN chown -R bind:bind /etc/bind
CMD ["/usr/sbin/named", "-g", "-c", "/etc/bind/named.conf", "-u", "bind"]