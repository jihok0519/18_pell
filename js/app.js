function initMap() {
    var options = {
        center: { lat: 40.7149, lng:-73.9980 },
        zoom: 18
    }

    map = new google.maps.Map(document.getElementById('map'), options)

    const marker = new google.maps.Marker({
        position: {lat:40.7149, lng: -73.9980},
        map: map
    })


    // Marker nametag

    // const detailWindow = new google.maps.InfoWindow({
    //     content: "18 Pell",
    // });

    // marker.addListener("mouseover", () => {
    //     detailWindow.open(map, marker);
    // })
    
}

const tokenizationSPecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        gateway: '',
        gatewayMerchantId: '',
    }
}

const cardPaymentMethod = {
    type: 'CARD',
    tokenizationSpecification: tokenizationSpecification,
    parameters: {
        allowedCardNetworks: ['VISA','MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    }
};

const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod],
};

let googlePayClient;


function onGooglePayLoaded() {
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST',
    });

    googlePayClient.isReadyToPay(googlePayConfiguration)
    .then(response => {
        if (response.result) {
            createAndAddButtion();
        }
    })
    .catch(error => console.error('isReadyToPay error:', error))
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked
    })
}