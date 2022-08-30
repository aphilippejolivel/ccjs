document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.lobbyIdButton')) return;

	// Don't follow the link
	event.preventDefault();

	// Log the clicked element in the console
    var currentLocation = window.location;
    var id = document.getElementsByClassName('lobbyIdInput')[0].value
    if (id.length === 6) {
        fetch(currentLocation+'api/lobbys/'+id).then(function (response) {
            // The API call was successful!
            return response.json();
        }).then(function (data) {
            // This is the JSON from our response
            console.log(data);
            if (data.state === 'waiting') {
                window.location.href = currentLocation+'lobby/'+id;
            }
            else if (data.message === 'Lobby not found' ) {
                console.log('Lobby not found')
            }
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
    }
    else {
        console.error("input needs to be 6 char (alphanum) long")
    }   
}, false);
