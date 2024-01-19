const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Admin 
exports.addAdminRole = functions.https.onCall((data, context) => {
   // Get user and add custom claim (admin)
   return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin:true
        });
   }).then(() =>{
       return{
           message:`Success! {$data.email} has made an admin`
       }
   }).catch(err => {
       return err;
   })
});

// Employee
exports.addEmployeeRole = functions.https.onCall((data, context) => {
   // Get user and add custom claim (Counselor)
   return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            employee:true
        });
   }).then(() =>{
       return{
           message:`Success! {$data.email} has made an Employee`
       }
   }).catch(err => {
       return err;
   })
});

