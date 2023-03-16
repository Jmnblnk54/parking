const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
var serviceAccount = require("./yugo-97d77-firebase-adminsdk-y2mc2-e1c9820664.json");

const KEY =
  "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";
const appCheck = false;
const fromEmail = "manage@yugopark.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyALL4Iypql0OrVwJJn0IjOcG8rkRDq8FE8",
  authDomain: "yugo-97d77.firebaseapp.com",
  databaseURL: "https://yugo-97d77-default-rtdb.firebaseio.com",
  projectId: "yugo-97d77",
  storageBucket: "yugo-97d77.appspot.com",
  messagingSenderId: "669606420518",
  appId: "1:669606420518:web:233baf144a8dc2e06486e7",
  measurementId: "G-VT4RBH556M",
});

sgMail.setApiKey(KEY);

exports.sendEmailWhenUserCreated = functions
  .runWith({
    allowInvalidAppCheckToken: true,
  })
  .https.onCall(async (body, context) => {
    if (appCheck && context.app === undefined) {
      return [
        {
          error: {
            message:
              "The function must be called from an App Check verified app.",
          },
        },
      ];
    }
    const { email, Name } = body;
    const msg = {
      from: fromEmail,
      to: email,
      subject: "Welcome to Yugo Park",
      html: `
      <html>
          <head>
              <style>
                  .IFuOkc {
                      height: 400px;
                      width: 100%;
                  }

                  .logo {
                      width: 100px; 
                      height: 100px; 
                      margin-top: 15px;
                      display: block;
                      margin-left: auto;
                      margin-right: auto;
                  }
          
                  .title {
                      color: white; 
                      text-align: center; 
                      margin-top: 4rem; 
                      font-size: 3rem;
                      text-decoration: underline
                  }
          
                  .info {
                      margin-top: 24rem;
                  }
          
                  @media (max-device-width: 600px) { 
                      .IFuOkc {
                          height: 300px;
                          width: 100%;
                      }
          
                      .title {
                          color: white; 
                          text-align: center; 
                          margin-top: 3.75rem; 
                          font-size: 1.8rem;
                          text-decoration: underline
                      }
                  }
              </style>
          </head>
          <body>
          <img src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a" 
          class="logo" />
              <h3 style="margin-top: 2rem; margin-left: 10px; color: black;">Hi ${Name},</h3>
              <h4 style="margin-left: 10px; color: black;">Welcome to Yugo Park,
               you can use this app to rent a spot or host your own Spot for other people to rent.</h4>
               <h4 style="margin-left: 10.1px; color: black;">Best regards,</h4>
               <h4 style="margin-left: 10.1px; color: black;">The Yugo Team</h4>
          </body>
      </html>`,
    };

    sgMail
      .send(msg)
      .then((e) => {
        return e;
      })
      .catch((e) => {
        return e;
      });
  });

exports.deleteSpotWhenEndDateGoAway = functions.pubsub
  .schedule("every 30 minutes")
  .onRun((context) => {
    const dateValue = new Date();
    const dateUTC = dateValue.toUTCString();
    console.log(dateUTC);
    admin
      .firestore()
      .collection("spots")
      .where("status", "!=", "pending")
      .get()
      .then((e) => {
        e.docs.forEach((doc) => {
          if (moment(doc.data().endDate).unix() <= moment(dateUTC).unix()) {
            console.log(doc.id);
            doc.ref.update({
              status: "Rejected",
            });
          } else {
            doc.ref.update({
              status: "Approved",
            });
          }
        });
      })
      .catch((e) => {
        return e.message;
      });
  });

//Booking Confirmation

exports.createReservations = functions
  .runWith({
    allowInvalidAppCheckToken: true,
  })
  .https.onCall(async (body, context, res) => {
    if (appCheck && context.app === undefined) {
      return [
        {
          error: {
            message:
              "The function must be called from an App Check verified app.",
          },
        },
      ];
    }
    const {
      travelerUser,
      spotData,
      hostId,
      travelerId,
      startDate,
      endDate,
      numberOfDays,
      pricePerDay,
      totalPrice,
      servicesFees,
      paymentMethod,
      hostEmail,
      tokenId,
    } = body;
    const docId = admin.firestore().collection("reservation").doc().id;
    const status = admin.firestore().collection("reservation").doc(docId).set({
      travelerUser: travelerUser,
      spotData: spotData,
      hostId: hostId,
      travelerId: travelerId,
      startDate: startDate,
      endDate: endDate,
      numberOfDays: numberOfDays,
      pricePerDay: pricePerDay,
      totalPrice: totalPrice,
      servicesFees: servicesFees,
      paymentMethod: paymentMethod,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      docId: docId,
      hostEmail: hostEmail,
      tokenId: tokenId,
      tripStarted: false,
    });

    const msg = {
      from: fromEmail,
      to: travelerUser.email,
      subject: "Reservation Confirmed with Yugo Park",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .IFuOkc {
                  height: 400px;
                  width: 100%;
              }

              .logo {
                  width: 100px; 
                  height: 100px; 
                  margin-top: 15px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
      
              .title {
                  color: white; 
                  text-align: center; 
                  margin-top: 4rem; 
                  font-size: 3rem;
                  text-decoration: underline
              }
      
              .info {
                  margin-top: 24rem;
              }
      
              @media (max-device-width: 600px) { 
                  .IFuOkc {
                      height: 300px;
                      width: 100%;
                  }
      
                  .title {
                      color: white; 
                      text-align: center; 
                      margin-top: 3.75rem; 
                      font-size: 1.8rem;
                      text-decoration: underline
                  }

              }
          </style>
      </head>
      <body>
      <img src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a" 
      class="logo" />
          <h4 style="margin-left: 10px; color: black;">Hello Yugo customer,</h4>
          <h4 style="margin-left: 10px; color: black;">Your reservation is confirmed for ${moment(
            startDate
          ).format("DD MMM YYYY")}.</h4>
          <h4 style="margin-left: 10px; color: black;">Thanks</h4>
          <h4 style="margin-left: 10.1px; color: black;">The Yugo Team</h4>
      </body>
      </html>`,
    };

    const hostMessage = {
      from: fromEmail,
      to: hostEmail,
      subject: "New Reservation Received with Yugo Park",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .IFuOkc {
                  height: 400px;
                  width: 100%;
              }

              .logo {
                  width: 100px; 
                  height: 100px; 
                  margin-top: 15px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
      
              .title {
                  color: white; 
                  text-align: center; 
                  margin-top: 4rem; 
                  font-size: 3rem;
                  text-decoration: underline
              }
      
              .info {
                  margin-top: 24rem;
              }
      
              @media (max-device-width: 600px) { 
                  .IFuOkc {
                      height: 300px;
                      width: 100%;
                  }
      
                  .title {
                      color: white; 
                      text-align: center; 
                      margin-top: 3.75rem; 
                      font-size: 1.8rem;
                      text-decoration: underline
                  }

              }
          </style>
      </head>
      <body>
      <img src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a" 
      class="logo" />
          <h4 style="margin-left: 10px; color: black;">Hello Yugo customer,</h4>
          <h4 style="margin-left: 10px; color: black;">You Received new reservation for ${moment(
            startDate
          ).format("DD MMM YYYY")}.</h4>
          <h4 style="margin-left: 10px; color: black;">Thanks</h4>
          <h4 style="margin-left: 10.1px; color: black;">The Yugo Team</h4>
      </body>
      </html>`,
    };

    sgMail.send(msg).then(
      (e) => {
        sgMail.send(hostMessage);
        res.send(e);
      },
      (error) => {}
    );
    return [
      {
        res,
        status,
      },
    ];
  });

//Cancel Reservation By Traveler
exports.cancelReservationByTraveler = functions
  .runWith({
    allowInvalidAppCheckToken: true,
  })
  .https.onCall(async (body, context, res) => {
    if (appCheck && context.app === undefined) {
      return [
        {
          error: {
            message:
              "The function must be called from an App Check verified app.",
          },
        },
      ];
    }

    const { reservationId, travelerEmail, hostEmail, startDate, endDate } =
      body;

    const status = await admin
      .firestore()
      .collection("reservation")
      .doc(reservationId)
      .delete();

    const msgToTraveler = {
      from: fromEmail,
      to: travelerEmail,
      subject: "Reservation Cancelled with Yugo Park",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .IFuOkc {
                  height: 400px;
                  width: 100%;
              }

              .logo {
                  width: 100px; 
                  height: 100px; 
                  margin-top: 15px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
      
              .title {
                  color: white; 
                  text-align: center; 
                  margin-top: 4rem; 
                  font-size: 3rem;
                  text-decoration: underline
              }
      
              .info {
                  margin-top: 24rem;
              }
      
              @media (max-device-width: 600px) { 
                  .IFuOkc {
                      height: 300px;
                      width: 100%;
                  }
      
                  .title {
                      color: white; 
                      text-align: center; 
                      margin-top: 3.75rem; 
                      font-size: 1.8rem;
                      text-decoration: underline
                  }
              }
          </style>
      </head>
      <body>
      <img src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a" 
      class="logo" />
          <h4 style="margin-left: 10px; color: black;">Hello Yugo customer,</h4>
          <h4 style="margin-left: 10px; color: black;">Your reservation for the spot located at ${startDate} on ${endDate} has been canceled. 
          Below is details regarding your refund. </h4>
          <h4 style="margin-left: 10px; color: black;">For any further questions or concerns, please feel free to refer to our cancellation policy or email us at ${fromEmail}</h4>
          <h4 style="margin-left: 10.1px; color: black;">Best regards,</h4>
          <h4 style="margin-left: 10.1px; color: black;">The Yugo Team</h4>
      </body>
      </html>`,
    };

    const msgToHost = {
      from: fromEmail,
      to: hostEmail,
      subject: "Reservation Cancelled with Yugo Park",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .IFuOkc {
                  height: 400px;
                  width: 100%;
              }

              .logo {
                  width: 100px; 
                  height: 100px; 
                  margin-top: 15px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
      
              .title {
                  color: white; 
                  text-align: center; 
                  margin-top: 4rem; 
                  font-size: 3rem;
                  text-decoration: underline
              }
      
              .info {
                  margin-top: 24rem;
              }
      
              @media (max-device-width: 600px) { 
                  .IFuOkc {
                      height: 300px;
                      width: 100%;
                  }
      
                  .title {
                      color: white; 
                      text-align: center; 
                      margin-top: 3.75rem; 
                      font-size: 1.8rem;
                      text-decoration: underline
                  }
              }
          </style>
      </head>
      <body>
      <img src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a" 
      class="logo" />
          <h4 style="margin-left: 10px; color: black;">Hello Yugo customer,</h4>
          <h4 style="margin-left: 10px; color: black;">We are sorry to inform you that the reservation ${reservationId} for
           your spot on ${startDate} has been canceled by 
          the traveler. Please refer back to the cancellation policy for more details.</h4>
          <h4 style="margin-left: 10px; color: black;">For any further questions or concerns, 
          please feel free to refer to our cancellation policy or email us at ${fromEmail}</h4>
          <h4 style="margin-left: 10.1px; color: black;">Best regards,</h4>
          <h4 style="margin-left: 10.1px; color: black;">The Yugo Team</h4>
      </body>
      </html>`,
    };
    sgMail
      .send(msgToTraveler)
      .then(() => {
        sgMail.send(msgToHost).then(() => {
          res.send("Success");
        });
      })
      .catch((e) => res.send(e));

    return [
      {
        status,
        res,
      },
    ];
  });

//Host Cancelled The reservations
exports.cancelReservationByHost = functions
  .runWith({
    allowInvalidAppCheckToken: true,
  })
  .https.onCall(async (body, context) => {
    if (appCheck && context.app === undefined) {
      return [
        {
          error: {
            message:
              "The function must be called from an App Check verified app.",
          },
        },
      ];
    }

    const { reservationId, travelerEmail } = body;

    const status = await admin
      .firestore()
      .collection("reservation")
      .doc(reservationId)
      .delete();

    const msgToTraveler = {
      from: fromEmail,
      to: travelerEmail,
      subject: "Reservation Cancelled with Yugo Park",
      html: `<!DOCTYPE html>
      <html>
      <head>
          <style>
              .IFuOkc {
                  height: 400px;
                  width: 100%;
              }

              .logo {
                  width: 100px; 
                  height: 100px; 
                  margin-top: 15px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
      
              .title {
                  color: white; 
                  text-align: center; 
                  margin-top: 4rem; 
                  font-size: 3rem;
                  text-decoration: underline
              }
      
              .info {
                  margin-top: 24rem;
              }
      
              @media (max-device-width: 600px) { 
                  .IFuOkc {
                      height: 300px;
                      width: 100%;
                  }
      
                  .title {
                      color: white; 
                      text-align: center; 
                      margin-top: 3.75rem; 
                      font-size: 1.8rem;
                      text-decoration: underline
                  }
              }
          </style>
      </head>
      <body>
      <img src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a" 
      class="logo" />
          <h4 style="margin-left: 10px; color: black;">Hello Yugo customer</h4>
          <h4 style="margin-left: 10px; color: black;">We are sorry to inform you that your host has canceled
           your reservation for the spot located at 27/07/2022 on 05/08/2022. Below are details regarding your refund.</h4>
          <h4 style="margin-left: 10px; color: black;">For any further questions or concerns,
           please feel free to email us at ${fromEmail}</h4>
          <h4 style="margin-left: 10.1px; color: black;">Best regards,</h4>
          <h4 style="margin-left: 10.1px; color: black;">The Yugo Team</h4>
      </body>
      </html>`,
    };

    const res = sgMail.send(msgToTraveler).then(
      (e) => {
        console.log("Email Send");
        console.log(e);
      },
      (error) => {
        console.log(error);
        return error;
      }
    );

    return [
      {
        status,
        res,
      },
    ];
  });

exports.updateReservationBeforeStart = functions.pubsub
  .schedule("every 5 minutes")
  .onRun((context) => {
    const dateValue = new Date();
    const dateUTC = dateValue.toUTCString();
    console.log(dateUTC);

    admin
      .firestore()
      .collection("reservation")
      .where("tripStarted", "==", false)
      .get()
      .then((e) => {
        e.docs.forEach((doc) => {
          if (
            moment(dateUTC).format("MM-DD-YYYY").toString() ==
            moment(doc.data().startDate).format("MM-DD-YYYY").toString()
          ) {
            var thirminsbefore = moment(doc.data().startDate).hours();
            var currmins = moment().add(0, "minutes").hours();

            if (thirminsbefore - currmins <= 1) {
              doc.ref.update({
                tripStarted: true,
              });
              const tripStartEmail = {
                from: fromEmail,
                to: doc.data()?.travelerUser?.email,
                subject: "Your upcoming reservation is live",
                html: `
                <html>
                <head>
                  <style>
                    .IFuOkc {
                      height: 400px;
                      width: 100%;
                    }
              
                    .logo {
                      width: 100px;
                      height: 100px;
                      margin-top: 15px;
                      display: block;
                      margin-left: auto;
                      margin-right: auto;
                    }
              
                    .title {
                      color: white;
                      text-align: center;
                      margin-top: 4rem;
                      font-size: 3rem;
                      text-decoration: underline;
                    }
              
                    .info {
                      margin-top: 24rem;
                    }
              
                    @media (max-device-width: 600px) {
                      .IFuOkc {
                        height: 300px;
                        width: 100%;
                      }
              
                      .title {
                        color: white;
                        text-align: center;
                        margin-top: 3.75rem;
                        font-size: 1.8rem;
                        text-decoration: underline;
                      }
                    }
                  </style>
                </head>
                <body>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a"
                    class="logo"
                  />
                  <h3 style="margin-top: 2rem; margin-left: 10px; color: black">
                    Hi ${doc.data()?.travelerUser?.firstName},
                  </h3>
                  <p style="margin-left: 10px; color: black; font-weight: light">
                    Your trip of spot ${
                      doc.data()?.spotData?.spotName
                    } that was booked for the time ${doc.data()?.startDate} to
                    ${doc.data()?.endDate} is live now. <br />
                    Click on the "START TRIP" button on your upcoming reservations page to get
                    the trip started. <br />
                    Make sure to be prepared for the upcoming trip.
                  </p>
                  <h4 style="margin-left: 10.1px; color: black; margin-bottom: 0px">
                    Best regards,
                  </h4>
                  <h4 style="margin-left: 10.1px; color: black">The Yugo Team</h4>
                </body>
              </html>
              `,
              };
              sgMail
                .send(tripStartEmail)
                .then((e) => {
                  return e;
                })
                .catch((e) => {
                  return e;
                });
            } else {
              return e;
            }
          } else {
            return e;
          }
        });
      })
      .catch((e) => {
        return e;
      });
  });

exports.onTripFinish = functions.pubsub
  .schedule("every 5 minutes")
  .onRun((context) => {
    const dateValue = new Date();
    const dateUTC = dateValue.toUTCString();
    admin
      .firestore()
      .collection("reservation")
      .where("status", "==", "in progress")
      .get()
      .then((e) => {
        e.docs.forEach((doc) => {
          if (
            moment(dateUTC).format("MM-DD-YYYY").toString() ==
            moment(doc.data().endDate).format("MM-DD-YYYY").toString()
          ) {
            var endinghour = moment(doc.data().endDate).hours();
            var currhour = moment().add(0, "minutes").hours();
            var endingmiute = moment(doc.data().endDate).minutes();
            var currminute = moment().add(0, "minutes").minutes();

            if (endinghour - currhour == 0 && endingmiute - currminute <= 10) {
              doc.ref.update({
                status: "finished",
                paid: "not paid",
                review: false,
              });

              const tripFinishEmail = {
                from: fromEmail,
                to: doc.data()?.travelerUser?.email,
                subject: "Your reservation is about to finish",
                html: `
                <html>
                <head>
                  <style>
                    .IFuOkc {
                      height: 400px;
                      width: 100%;
                    }
              
                    .logo {
                      width: 100px;
                      height: 100px;
                      margin-top: 15px;
                      display: block;
                      margin-left: auto;
                      margin-right: auto;
                    }
              
                    .title {
                      color: white;
                      text-align: center;
                      margin-top: 4rem;
                      font-size: 3rem;
                      text-decoration: underline;
                    }
              
                    .info {
                      margin-top: 24rem;
                    }
              
                    @media (max-device-width: 600px) {
                      .IFuOkc {
                        height: 300px;
                        width: 100%;
                      }
              
                      .title {
                        color: white;
                        text-align: center;
                        margin-top: 3.75rem;
                        font-size: 1.8rem;
                        text-decoration: underline;
                      }
                    }
                  </style>
                </head>
                <body>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a"
                    class="logo"
                  />
                  <h3 style="margin-top: 2rem; margin-left: 10px; color: black">
                    Hi ${doc.data()?.travelerUser?.firstName},
                  </h3>
                  <p style="margin-left: 10px; color: black; font-weight: light">
                    Your trip of spot ${
                      doc.data()?.spotData?.spotName
                    } is going to be end
                    soon on ${doc.data()?.endDate}.
                    <br />
                    Feel free to give the review by clicking on the "Give Review" button on
                    your reservations page.<br />
                    So that it will help the community to find their desire spots.
                  </p>
                  <h4 style="margin-left: 10.1px; color: black; margin-bottom: 0px">
                    Best regards,
                  </h4>
                  <h4 style="margin-left: 10.1px; color: black">The Yugo Team</h4>
                </body>
              </html>              
                `,
              };

              sgMail
                .send(tripFinishEmail)
                .then((e) => {
                  return e;
                })
                .catch((e) => {
                  return e;
                });
            } else {
              return e;
            }
          } else {
            return e;
          }
        });
      })
      .catch((e) => console.log(e));
  });

exports.onReservationComplete = functions.pubsub
  .schedule("every 60 minutes")
  .onRun((context) => {
    const host = admin.firestore().collection("users");

    admin
      .firestore()
      .collection("reservation")
      .where("status", "==", "Finished")
      .where("paid", "==", "not paid")
      .get()
      .then(async (e) => {
        if (!e.empty) {
          e.docs.forEach((doc) => {
            const resData = doc.data();
            console.log(resData);
            doc.ref.update({
              noOfSpot: resData.noOfSpot + 1,
            });
            host
              .doc(resData.hostId)
              .get()
              .then((host) => {
                const hostData = host?.data();
                host.ref
                  .update({
                    wallet:
                      hostData?.wallet == undefined
                        ? Number(resData.totalPrice) -
                          Number(resData.servicesFees)
                        : hostData?.wallet +
                          Number(resData.totalPrice) -
                          Number(resData.servicesFees),
                  })
                  .then(() => {
                    const reservationCompleteEmail = {
                      from: fromEmail,
                      to: resData.hostEmail,
                      subject: "Your wallet has been credited",
                      html: `
                      <html>
                      <head>
                        <style>
                          body {
                            display: flex;
                            flex-direction: column;
                            max-width: 600px;
                            margin: auto;
                            justify-content: center;
                            padding: 20px;
                          }
                          h3 {
                            margin-top: 2rem;
                            color: black;
                          }
                          h4 {
                            color: black;
                            margin-bottom: 0px;
                          }
                          P {
                            margin: 10px 0px;
                          }
                          .IFuOkc {
                            height: 400px;
                            width: 100%;
                          }
                    
                          .logo {
                            width: 100px;
                            height: 100px;
                            margin-top: 15px;
                            display: block;
                            margin-left: auto;
                            margin-right: auto;
                          }
                    
                          .title {
                            color: white;
                            text-align: center;
                            margin-top: 4rem;
                            font-size: 3rem;
                            text-decoration: underline;
                          }
                    
                          .info {
                            margin-top: 24rem;
                          }
                    
                          @media (max-device-width: 600px) {
                            .IFuOkc {
                              height: 300px;
                              width: 100%;
                            }
                    
                            .title {
                              color: white;
                              text-align: center;
                              margin-top: 3.75rem;
                              font-size: 1.8rem;
                              text-decoration: underline;
                            }
                          }
                        </style>
                      </head>
                      <body>
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/yugo-97d77.appspot.com/o/yugo%20icon.png?alt=media&token=cbe7314b-f46e-42d6-ba76-c814488f4b7a"
                          class="logo"
                        />
                        <h3>Hi ${hostData?.firstName},</h3>
                        <p>
                          Your account has been credited with ${
                            Number(resData.totalPrice) -
                            Number(resData.servicesFees)
                          } for your last finished
                          reservation of ${
                            resData?.spotData?.spotName
                          } that was booked for the time ${
                        resData?.startDate
                      } to
                          ${resData?.endDate}
                        </p>
                        <p>Go to your TRANSACTION page to see your receipt.</p>
                        <p>Free free to revert back to us for any queries.</p>
                        <h4>
                          Best regards, <br />
                          The Yugo Team
                        </h4>
                      </body>
                    </html>
                       
                      `,
                    };
                    sgMail
                      .send(reservationCompleteEmail)
                      .then((e) => {
                        console.log("email sent", e);
                      })
                      .catch((e) => {
                        console.log("error sending email", e);
                      });
                    console.log("amount added to host wallet");
                  })
                  .catch((e) =>
                    console.log("error adding amount to host wallet", e)
                  );

                doc.ref
                  .update({
                    paid: "paid",
                  })
                  .then((e) =>
                    console.log("Reservation status paid updated", e)
                  )
                  .catch((e) =>
                    console.log("Error updating reservation status", e)
                  );
              })
              .catch((e) => console.log("error", e));
          });
        } else {
          console.log("Not found");
        }
      })
      .catch((e) => console.log(e));
  });
