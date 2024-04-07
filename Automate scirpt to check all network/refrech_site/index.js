
function checkPing(ip) {
    // Return the promise chain
    return fetch('/ping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip })
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        return data.status;
    })
    .catch(error => {
        console.error('Error:', error);
        return 'error';
    });
}

function check_ports(ip) {
    // Return the promise chain
    return fetch('/check-ports', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip })
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        return 'error';
    });
}

window.onload = function() {
    fetch('/all-vps.json')
    .then(response => response.json())
    .then(data => {
        data.users.forEach(user => {
            const ip = user.ip;
            let resultDiv = `<tr id="${ip}">`;

            checkPing(ip)
                .then(status => {
                    resultDiv += `<td>${ip}</td><td style="background: ${status ? 'green' : 'red'}">${status}</td>`;
                    if (status == true) {
                        check_ports(ip)
                            .then(data => {
                                resultDiv += '<td >' + data + '</td>';
                                document.getElementById('result').innerHTML += resultDiv + '</tr>';
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                resultDiv += '<td>Error checking ports</td>';
                                document.getElementById('result').innerHTML += resultDiv + '</tr>';
                            });
                    } else {
                        document.getElementById('result').innerHTML += resultDiv + '</tr>';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    resultDiv += `<td>${ip}</td><td style="background: red">Error checking ping</td>`;
                    document.getElementById('result').innerHTML += resultDiv + '</tr>';
                });
        });

        //table = group + http + https
        fetch('/all-groups.json')
            .then(response => response.json())
            .then(data => {
                data.groups.forEach(group => {
                    fetch('/find-ip-and-check-http-https', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url: 'www.' + group + '.ephec-ti.be' })
                    })
                    .then(response => response.json())
                    .then(status => {
                        try {
                            document.getElementById(status['ip']).innerHTML += `<td>${group.toUpperCase()}</td>
                                                                                <td style="background: ${status.http ? 'green' : 'red'}"><a target="_blank" href="http://www.${group}.ephec-ti.be">${String(status.http).toUpperCase()}</a></td>
                                                                                <td style="background: ${status.https ? 'green' : 'red'}"><a target="_blank" href="https://www.${group}.ephec-ti.be">${String(status.https).toUpperCase()}</a></td>`;
                        } catch (error) {}
                    })
                    .catch(error => console.error('Error:', error))
                });
            })
            .catch(error => console.error('Error:', error))


    })
    .catch(error => console.error('Error:', error))

    let date = new Date()
    document.getElementById("time").innerHTML = "last update : " + date.toLocaleString()

};