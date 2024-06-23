'use strict';


// {
//     "orderType": "FULFILLMENT",
//   "customerId": "18291516",
//   "pickup": {
//     "locationCode": "JJ2M",
//     "address": "Shomolu Avenue, Dolphin Estate,, Ikoyi, LA, Nigeria",
//     "pickupName": "Kirueka Limited",
//     "pickupNumber": "09023780566",
//     "altPickupNumber": "09023780566",
//     "pickupDate": "2024-06-27",
//     "note": "Handle carefully"
//   },
//   "drops": [
//     {
//       "locationCode": "XV4C",
//       "address": "Halromalk Estate phase 2, Lekki Penninsula II, Lagos, Nigeria",
//       "recipientName": "Fayye Egbuniwe",
//       "recipientNumber": "07038330740",
//       "altRecipientNumber": "07038330740"
//     }
//   ]
// }
const headers = {
    "Content-Type": "application/json",
    "x-sendstack-source":"control.sendstack",
    // app_id:"9707406",
    app_id:process.env.SENDSTACK_APP_ID,
    app_secret:process.env.SENDSTACK_APP_SECRET,
    // app_secret:"H6YKXGSNJSK1JATL",
  }
function addDelivery(pickup, drops, customerId) {
   let options = {"method":"POST",headers, redirect: "follow"}
   
   let body = {
        "orderType": "FULFILLMENT",
        "customerId": customerId,
        pickup,
        drops
    }
    options.body = JSON.stringify(body)
    return fetch(process.env.SENDSTACK_URL + "deliveries",options)
     
}

module.exports = {
    addDelivery,
}