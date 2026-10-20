import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      {
        text: "By accessing or using Explicatio's website, mobile applications, or any associated services (collectively, the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes."
      }
    ]
  },
  {
    title: "2. Description of Service",
    content: [
      {
        text: "Explicatio provides accessible summaries and translations of peer-reviewed scientific research. Our platform curates, synthesizes, and presents complex academic literature in formats designed for general audiences. The Service includes free and premium subscription tiers with varying levels of access to content and features."
      }
    ]
  },
  {
    title: "3. User Accounts",
    content: [
      {
        subtitle: "Registration",
        text: "To access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account."
      },
      {
        subtitle: "Account Security",
        text: "You agree to notify us immediately of any unauthorized access to your account. We are not liable for losses resulting from unauthorized use of your account."
      },
      {
        subtitle: "Account Termination",
        text: "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or remain inactive for extended periods."
      }
    ]
  },
  {
    title: "4. Subscription and Payment",
    content: [
      {
        subtitle: "Billing",
        text: "Premium subscriptions are billed in advance on a monthly or annual basis. By subscribing, you authorize us to charge your payment method for the applicable fees."
      },
      {
        subtitle: "Cancellation",
        text: "You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. We do not provide refunds for partial subscription periods."
      },
      {
        subtitle: "Price Changes",
        text: "We reserve the right to modify subscription prices. Existing subscribers will be notified at least 30 days before any price increase takes effect."
      }
    ]
  },
  {
    title: "5. Acceptable Use",
    content: [
      {
        text: "You agree not to: (a) reproduce, distribute, or publicly display our content without authorization; (b) use automated systems to scrape or collect content; (c) attempt to gain unauthorized access to our systems; (d) use the Service for any unlawful purpose; (e) impersonate any person or entity; or (f) interfere with the proper functioning of the Service."
      }
    ]
  },
  {
    title: "6. Intellectual Property",
    content: [
      {
        subtitle: "Our Content",
        text: "All research summaries, translations, graphics, logos, and other materials on Explicatio are protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute our content without express written permission."
      },
      {
        subtitle: "User Content",
        text: "By submitting content such as notes, highlights, or research requests, you grant us a non-exclusive, royalty-free license to use, display, and incorporate such content in connection with the Service."
      },
      {
        subtitle: "Attribution",
        text: "Our summaries reference original peer-reviewed research. We provide citations and links to source materials where available. All rights to original research remain with the respective authors and publishers."
      }
    ]
  },
  {
    title: "7. Disclaimer of Medical Advice",
    content: [
      {
        text: "THE CONTENT PROVIDED BY EXPLICATIO IS FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. IT IS NOT INTENDED AS, AND SHOULD NOT BE CONSTRUED AS, MEDICAL, HEALTH, NUTRITIONAL, OR OTHER PROFESSIONAL ADVICE. Always consult qualified healthcare professionals before making decisions based on information found on our platform. We do not endorse or recommend any specific treatments, products, or procedures mentioned in our research summaries."
      }
    ]
  },
  {
    title: "8. Disclaimer of Warranties",
    content: [
      {
        text: "THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components. While we strive for accuracy in our research summaries, we do not guarantee the completeness, reliability, or currentness of any content."
      }
    ]
  },
  {
    title: "9. Limitation of Liability",
    content: [
      {
        text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, EXPLICATIO AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. Our total liability shall not exceed the amount you paid for the Service in the twelve months preceding the claim."
      }
    ]
  },
  {
    title: "10. Indemnification",
    content: [
      {
        text: "You agree to indemnify, defend, and hold harmless Explicatio and its affiliates from any claims, damages, losses, or expenses arising from your use of the Service, violation of these terms, or infringement of any third-party rights."
      }
    ]
  },
  {
    title: "11. Governing Law",
    content: [
      {
        text: "These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising from these terms or your use of the Service shall be resolved in the courts of competent jurisdiction."
      }
    ]
  },
  {
    title: "12. Severability",
    content: [
      {
        text: "If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect."
      }
    ]
  },
  {
    title: "13. Contact Information",
    content: [
      {
        text: "For questions about these Terms of Service, please contact us at legal@explicatio.co. We welcome your feedback and will address inquiries within a reasonable timeframe."
      }
    ]
  }
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <Link 
              to="/home" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-medium mb-4 block">
              Legal
            </span>
            
            <h1 className="font-sans font-extralight tracking-tight text-zinc-800 text-4xl md:text-5xl lg:text-6xl mb-6">
              Terms of Service
            </h1>
            
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mb-4">
              These terms govern your use of Explicatio's research summary platform. Please read them carefully before using our services.
            </p>
            
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
              Effective Date: January 2025
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 border-l-2 border-l-gray-900"
                >
                  <h2 className="font-mono text-sm font-bold uppercase tracking-tight text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.subtitle && (
                          <h3 className="font-sans font-medium text-gray-800 text-sm mb-2">
                            {item.subtitle}
                          </h3>
                        )}
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <p className="text-gray-500 text-sm mb-6">
              Questions about our terms or need clarification?
            </p>
            <a 
              href="mailto:legal@explicatio.co"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              Contact Our Legal Team
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
