import React from "react";
import Footer from "../../components/common/footer/Footer";
import CommonInfoPage from "../../components/common/info-page/CommonInfoPage";
import Navbar from "../../components/common/navbar/Navbar";

export default function TermsConditions() {
  return (
    <div>
      <Navbar />
      <CommonInfoPage title="Terms and Conditions" subtitle="Legal Terms">
        <h2>Terms and Conditions</h2>
      </CommonInfoPage>
      <Footer />
    </div>
  );
}
