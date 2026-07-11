export const pricingPlans = [
  {
    name: "Basic",
    price: 0,
    description:
      "For individuals and small teams exploring public opportunities.",
    features: ["Public tender access", "5 monthly alerts", "Standard search"],
    button: "Get Started",
    featured: false,
  },

  {
    name: "Enterprise",
    price: 499,
    description: "Professional procurement departments and enterprises.",
    features: [
      "Full Market Database",
      "AI-Powered Matching",
      "Direct Procurement Inbox",
      "Unlimited Alerts",
    ],
    button: "Start 14-Day Trial",
    featured: true,
  },

  {
    name: "Custom",
    price: null,
    description: "Tailored procurement solutions for global institutions.",
    features: [
      "Dedicated Support",
      "API Access",
      "White Labeling",
      "Global Compliance",
    ],
    button: "Talk To Sales",
    featured: false,
  },
];
