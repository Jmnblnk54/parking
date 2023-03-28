import React from "react";
import Footer from "../../components/common/footer/Footer";
import CommonInfoPage from "../../components/common/info-page/CommonInfoPage";
import Navbar from "../../components/common/navbar/Navbar";

export default function Privacy() {
  return (
    <div>
      <Navbar />
      <CommonInfoPage title="Yugo Privacy" subtitle="Legal Terms">
        <h2>Privacy Policy</h2>
      </CommonInfoPage>
      <Footer />
    </div>
  );
}
