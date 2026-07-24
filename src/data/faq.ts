export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Account & Trial" | "Bidding & Guarantees" | "Support & Purchases" | "Subscriptions";
  bullets?: string[];
  links?: { label: string; href: string }[];
}

export const faqsData: FAQItem[] = [
  {
    id: "how-we-work",
    category: "General",
    question: "How does RFPNexa work?",
    answer:
      "RFPNexa is a specialized e-procurement search engine that connects businesses with federal, state, and local government contracts. Instead of wasting time browsing countless public portals, you can use our platform to instantly find, purchase, and download official RFP documents, complete with Statements of Work (SOW) and procurement contact information.\n\nPlease note that while we provide comprehensive insights and official documentation, your final bid proposal is submitted directly to the government authority. All listings on our platform are sourced directly from global public and semi-government organizations.",
  },
  {
    id: "try-before-subscribe",
    category: "Account & Trial",
    question: "Can I try RFPNexa before subscribing? How do I register?",
    answer:
      "Yes! RFPNexa is the only bid database service providing free search capabilities so you can explore active government tenders before subscribing. While document downloads require a subscription or purchase, creating an account is 100% free.\n\nTo register, click on the 'Get Started' or 'Register' button and follow the simple on-screen instructions.",
  },
  {
    id: "winning-commitment",
    category: "Bidding & Guarantees",
    question: "Is there any commitment or guarantee that I will win a contract?",
    answer:
      "No. Accessing documents through our platform does not guarantee or commit that you will be awarded the contract, RFP, or tender. RFPNexa provides official solicitation files and direct contact information for the relevant public authority.\n\nBeyond providing this verified data, we are not involved in the bidding, evaluation, or decision-making process. You will communicate and negotiate directly with the issuing government entity.",
  },
  {
    id: "purchase-issues",
    category: "Support & Purchases",
    question: "What if something is wrong with an RFP document after purchase, or I have a purchase query?",
    answer:
      "You will receive immediate access to your documents after purchasing or subscribing. If you encounter any technical glitch, missing attachment, or formatting issue with an RFP document, our team is here to support you!\n\nSimply reach out to us at info@rfpnexa.com, and our support team will resolve it promptly.",
  },
  {
    id: "subscription-management",
    category: "Subscriptions",
    question: "How do I buy or cancel a subscription, and manage my account?",
    answer:
      "Managing your RFPNexa account and subscription is simple directly from your dashboard:",
    bullets: [
      "Subscribe: Click the 'Subscription' or 'Pricing' button to choose your plan.",
      "Cancel Subscription: Click the 'Cancel Subscription' button inside your dashboard at any time.",
      "Update Account Details: Click 'Edit Profile' to update your email address, residential/corporate address, and contact numbers. (Keeping your email updated ensures you never miss tailored RFP alerts).",
      "Payment & Subscription History: Click 'Payment History & Subscription History' to view past receipts, invoices, and active plans.",
    ],
    links: [
      { label: "View Subscription Plans", href: "/pricing" },
      { label: "Contact Support", href: "/contactus" },
    ],
  },
];
