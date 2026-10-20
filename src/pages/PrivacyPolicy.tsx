import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account, we collect information such as your name, email address, and any profile information you choose to provide. If you subscribe to our premium services, we collect payment information through our secure payment processors."
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform, including the research summaries you view, your reading history, saved studies, and time spent on various sections. This helps us personalize your experience and improve our content."
      },
      {
        subtitle: "Device and Technical Information",
        text: "We collect device identifiers, browser type, operating system, IP address, and general location data to ensure optimal performance and security of our services."
      }
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "We use your information to provide, maintain, and improve our research summary services, including personalizing content recommendations based on your interests and reading history."
      },
      {
        subtitle: "Communication",
        text: "We may send you service-related announcements, updates about new research summaries in your areas of interest, and responses to your inquiries. You can opt out of non-essential communications at any time."
      },
      {
        subtitle: "Analytics and Improvement",
        text: "We analyze usage patterns to enhance our platform, develop new features, and ensure our research translations meet the needs of our community."
      }
    ]
  },
  {
    title: "3. Data Sharing and Disclosure",
    content: [
      {
        subtitle: "Third-Party Service Providers",
        text: "We share information with trusted service providers who assist us in operating our platform, processing payments, and analyzing usage. These providers are contractually obligated to protect your information."
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information when required by law, to protect our rights, or in response to valid legal processes such as subpoenas or court orders."
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change."
      }
    ]
  },
  {
    title: "4. Data Security",
    content: [
      {
        text: "We implement industry-standard security measures to protect your personal information, including encryption in transit and at rest, secure authentication protocols, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
      }
    ]
  },
  {
    title: "5. Your Rights and Choices",
    content: [
      {
        subtitle: "Access and Correction",
        text: "You can access, update, or correct your personal information through your account settings at any time."
      },
      {
        subtitle: "Data Portability",
        text: "You may request a copy of your personal data in a structured, commonly used format."
      },
      {
        subtitle: "Deletion",
        text: "You can request deletion of your account and associated personal data. Some information may be retained as required by law or for legitimate business purposes."
      },
      {
        subtitle: "Marketing Preferences",
        text: "You can opt out of marketing communications by clicking the unsubscribe link in any email or adjusting your notification settings."
      }
    ]
  },
  {
    title: "6. Cookies and Tracking Technologies",
    content: [
      {
        text: "We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze platform usage. You can manage cookie preferences through your browser settings. Some features may not function properly if cookies are disabled."
      }
    ]
  },
  {
    title: "7. Children's Privacy",
    content: [
      {
        text: "Explicatio is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately."
      }
    ]
  },
  {
    title: "8. International Data Transfers",
    content: [
      {
        text: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws."
      }
    ]
  },
  {
    title: "9. Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes through email or a prominent notice on our platform. Your continued use after such modifications constitutes acceptance of the updated policy."
      }
    ]
  },
  {
    title: "10. Contact Us",
    content: [
      {
        text: "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@explicatio.co. We are committed to addressing your concerns and will respond within a reasonable timeframe."
      }
    ]
  }
];

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mb-4">
              Your privacy matters to us. This policy explains how Explicatio collects, uses, and protects your personal information when you use our research summary platform.
            </p>
            
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
              Last Updated: January 2025
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
              Have questions about how we handle your data?
            </p>
            <a 
              href="mailto:privacy@explicatio.co"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              Contact Our Privacy Team
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
