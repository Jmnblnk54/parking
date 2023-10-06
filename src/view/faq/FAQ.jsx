import React from "react";
import styled from "styled-components";
import Footer from "../../components/common/footer/Footer";
import CommonInfoPage from "../../components/common/info-page/CommonInfoPage";
import Navbar from "../../components/common/navbar/Navbar";

export default function FAQ() {
  return (
    <div className="faq">
      <Navbar />
      <CommonInfoPage title="FAQs" subtitle="Common questions from our Hosts">
        <h2> FAQs</h2>
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: What if a traveler returns to their spot on time, but the vehicle
            has been towed by the HOA, city officials, etc.?{" "}
          </h3>
          A: If a traveler's vehicle has been towed, they can first reach out to
          the host via DM or phone number, if listed, to resolve the issue. If
          the host is unresponsive or unaware of the situation, the traveler can
          report the problem through the parking app. Our team will then provide
          information on where and how to retrieve their vehicle and ensure the
          matter is resolved promptly. The host will be charged a fine, as
          outlined in the Terms and Conditions of the listing agreement, due to
          their failure to familiarize themselves with the HOA rules or city
          ordinances.
        </p>
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: What if a traveler wants to stay past their assigned reservation
            time slot?
          </h3>
          A: Travelers can quickly check the availability of their parking spot
          for the remainder of the day through the parking app. If no
          reservations are scheduled after theirs, they can extend their
          reservation as needed for the specified rate.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: How does parking ensure hosts' and travelers' safety and
            security?
          </h3>
          A: parking is committed to providing all users with a safe and secure
          platform. Our app requires all hosts and travelers to undergo a
          verification process before using the service. Additionally, we have
          implemented a user rating system to help maintain a trustworthy
          community. Users can also report suspicious or inappropriate behavior,
          which our team will promptly investigate.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: Can I cancel or modify my reservation?
          </h3>
          A: Yes, parking understands that plans can change. Travelers can
          cancel or modify their reservations within the app, subject to the
          cancellation policy. Please review the specific procedure for the
          parking space you've reserved to understand the terms and conditions
          for cancellations and modifications.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: Are there any fees associated with using the parking app?
          </h3>
          A: parking charges a small service fee to hosts and travelers to cover
          the costs of maintaining and improving our platform. This fee will be
          displayed during the reservation and listing process.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: How do I list my parking space on parking?
          </h3>
          A: Listing your parking space on parking is simple. First, create an
          account and complete the verification process. Next, provide
          information about your parking space, including its location,
          dimensions, and specific rules or restrictions. You can also set your
          space's price and availability, whether hourly, daily, weekly, or
          monthly. Once you've submitted your listing, it will be reviewed by
          our team and made available for travelers to reserve.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: How do I get paid for renting out my parking space?
          </h3>
          A: parking processes payments securely through our platform. When a
          traveler reserves a parking space, the price is held until the
          reservation is completed; after the reservation period ends, the funds
          are transferred to your preferred payout method minus the service fee.
          Payout methods include direct deposit (for a small fee), weekly
          payouts, or other available options depending on location.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: What if there's a dispute between a host and a traveler?
          </h3>
          A: If a dispute arises between a host and a traveler, we encourage
          both parties to communicate and try to resolve the issue amicably.
          Contact parking's support team for assistance if a resolution cannot
          be reached. We will review the situation and work with both parties
          for a fair and reasonable outcome.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: How do I report a problem with a parking space or user?
          </h3>
          A: If you encounter an issue with a parking space or another user, you
          can report it through the parking app. Please provide as much
          information as possible, including photos or screenshots if
          applicable, to help our support team investigate and resolve the
          issue.
        </p>{" "}
        <p>
          <h3 style={{ color: "green" }}>
            {" "}
            Q: Is parking available in my area?
          </h3>
          A: parking is currently expanding its services throughout the United
          States. To check if parking is available in your area, simply download
          the app and enter your location. If parking is unavailable in your
          city, we encourage you to sign up for updates on our website as we
          continue to grow our coverage.
        </p>
      </CommonInfoPage>
      <Footer />
    </div>
  );
}
export const Wrapper = styled.div`
  .faq {
    p {
      text-align: justify;
    }
  }
`;
