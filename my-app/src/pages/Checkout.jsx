import React, { useState } from "react";
import AddressStep from "./checkout/AddressStep";
import PaymentStep from "./checkout/PaymentStep";

export default function Checkout() {
  const [step, setStep] = useState(1); 
  const [addressSelection, setAddressSelection] = useState({
    shippingId: null,
    receiptId: null,
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <StepDot active={step === 1}>1</StepDot>
        <span className={step === 1 ? "font-bold text-[#252B42]" : "text-[#737373]"}>Address</span>
        <div className="w-10 h-[2px] bg-gray-200" />
        <StepDot active={step === 2}>2</StepDot>
        <span className={step === 2 ? "font-bold text-[#252B42]" : "text-[#737373]"}>Payment</span>
      </div>

      {step === 1 ? (
        <AddressStep
          onContinue={(sel) => {
            setAddressSelection(sel);
            setStep(2);
          }}
        />
      ) : (
        <PaymentStep
          addressSelection={addressSelection}
          onBack={() => setStep(1)}
        />
      )}
    </main>
  );
}

function StepDot({ active, children }) {
  return (
    <div
      className={
        "w-6 h-6 rounded-full grid place-items-center text-xs font-bold " +
        (active ? "bg-[#23A6F0] text-white" : "bg-gray-200 text-gray-600")
      }
    >
      {children}
    </div>
  );
}
