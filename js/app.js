function initMap() {
    var options = {
        center: { lat: 40.7149, lng:-73.9980 },
        zoom: 17
    }

    map = new google.maps.Map(document.getElementById('map'), options)

    const marker = new google.maps.Marker({
        position: {lat:40.7149, lng: -73.9980},
        map: map
    })
}