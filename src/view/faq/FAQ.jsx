import React from "react";
import Footer from "../../components/common/footer/Footer";
import CommonInfoPage from "../../components/common/info-page/CommonInfoPage";
import Navbar from "../../components/common/navbar/Navbar";

export default function FAQ() {
  return (
    <div>
      <Navbar />
      <CommonInfoPage
        title="FAQs"
        subtitle="Common questions from our Hosts"
      ></CommonInfoPage>
      <Footer />
    </div>
  );
}
