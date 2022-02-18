import React from "react";
import { useSelector } from "react-redux";
import PaymentDetailCard from "../Components/PaymentDetailCard";

function PaymentPage() {
  const { showDetail } = useSelector((state) => state.client);
  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        {showDetail && <PaymentDetailCard />}
      </div>
    </>
  );
}

export default PaymentPage;
