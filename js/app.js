/* infinite auto carousel */
window.addEventListener("load", () => {
    autoSlide();
})

function autoSlide() {
    setInterval(() => {
        slide(getItemActiveIndex() + 1);
    }, 1000);
}

function slide(toIndex) {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");

    // check if toIndex exceeds the number of carousel items
    if (toIndex >= itemsArray.length) {
        toIndex = 0; 
}

    const newItemActive = itemsArray[toIndex];

    // start transition
    newItemActive.classList.add(".carousel_item__post_next");
    setTimeout(() => {
        newItemActive.classList.add("carousel_item__next")
        newItemActive.classList.add("carousel_item__next")
    }, 20);

    // remove all transition class and switch active class
    newItemActive.addEventListener("transitionend", () => {
        itemActive.className = "carousel_item";
        newItemActive.className = "carousel_item carousel_item__active";
    }, {
        once: true
    });
}

function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
}

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
        onClick: onGooglePayButtonClicked,
    });

    document.getElementById('buy-now').appendChild(googlePayButton);
}

function onGooglePayButtonClicked() {
    const paymentDataRequest = { ...googlePayConfiguration };
    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4TXLJJJILM',
        merchantName: '18 Pell',
    };

    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: selectedItem.price,
        currencyCode: 'USD',
        countryCode: 'US',
    };

    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => processPaymentData(paymentData))
        .catch(error => console.error('loadPaymentData error: ', error));
}

function processPaymentData(paymentData) {
    fetch(ordersEndpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: paymentData
    })
}