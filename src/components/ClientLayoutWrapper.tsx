"use client";

import { useState, createContext, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import InquiryModal from "./InquiryModal";

interface InquiryContextType {
  openInquiry: (category?: string) => void;
}

const InquiryContext = createContext<InquiryContextType>({
  openInquiry: () => {},
});

export const useInquiry = () => useContext(InquiryContext);

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState("General Inquiries");

  const openInquiry = (category: string = "General Inquiries") => {
    setInquiryCategory(category);
    setIsInquiryOpen(true);
  };

  return (
    <InquiryContext.Provider value={{ openInquiry }}>
      <Navbar onOpenInquiry={openInquiry} />
      <main className="min-h-screen pt-20 sm:pt-24">{children}</main>
      <Footer />
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialCategory={inquiryCategory}
      />
    </InquiryContext.Provider>
  );
}
