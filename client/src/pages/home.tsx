import DocumentSimplifier from "@/components/document-simplifier";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top government bar */}
          <div className="flex items-center justify-between py-2 text-sm border-b border-primary-foreground/20">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                Helpline: 1947
              </span>
              <span className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                help@kanoon-saral.gov.in
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="hover:bg-primary-foreground/10 px-2 py-1 rounded">
                <i className="fas fa-globe mr-1"></i>
                हिन्दी | English
              </button>
            </div>
          </div>
          
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <i className="fas fa-balance-scale text-accent-foreground text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Kanoon Saral</h1>
                <p className="text-sm opacity-90">कानून सरल | Legal Document Simplifier</p>
                <p className="text-xs opacity-75">Government of India Initiative</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-accent transition-colors">Home</a>
              <a href="#" className="hover:text-accent transition-colors">Services</a>
              <a href="#" className="hover:text-accent transition-colors">About</a>
              <a href="#" className="hover:text-accent transition-colors">Help</a>
              <a href="#" className="hover:text-accent transition-colors">Contact</a>
            </nav>
            
            <button className="md:hidden text-primary-foreground">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="floating-animation mb-6">
              <i className="fas fa-file-contract text-6xl text-accent"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Make Legal Documents Simple
            </h2>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              कानूनी दस्तावेजों को आसान भाषा में समझें | Convert complex legal text to plain Indian English
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex items-center">
                <i className="fas fa-shield-alt mr-2 text-accent"></i>
                <span>Government Certified</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-lock mr-2 text-accent"></i>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-language mr-2 text-accent"></i>
                <span>Hindi-English Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <DocumentSimplifier />

      {/* Trust Section */}
      <section className="bg-muted py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-center text-foreground mb-8">
              Why Trust Kanoon Saral? / कानून सरल पर क्यों भरोसा करें?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-2xl text-primary"></i>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Government Certified</h4>
                <p className="text-muted-foreground text-sm">
                  Certified by Government of India with highest security standards
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-secret text-2xl text-secondary"></i>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Privacy Protected</h4>
                <p className="text-muted-foreground text-sm">
                  Your documents are automatically deleted after processing
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-2xl text-accent"></i>
                </div>
                <h4 className="font-semibold text-foreground mb-2">1M+ Users Served</h4>
                <p className="text-muted-foreground text-sm">
                  Trusted by millions of Indians for legal document simplification
                </p>
              </div>
            </div>
            
            {/* Government Disclaimer */}
            <div className="mt-8 bg-card border border-border rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-xl text-primary mt-1"></i>
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Important Disclaimer</h5>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This service provides simplified explanations for educational purposes only. For legal advice or official interpretation, please consult a qualified lawyer. This service is provided by the Government of India as a digital initiative to improve legal literacy among citizens.
                    <br /><br />
                    यह सेवा केवल शैक्षिक उद्देश्यों के लिए सरलीकृत व्याख्या प्रदान करती है। कानूनी सलाह या आधिकारिक व्याख्या के लिए, कृपया एक योग्य वकील से सलाह लें।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h5 className="font-semibold mb-4">About Kanoon Saral</h5>
              <p className="text-sm opacity-90 mb-4">
                Government of India's initiative to make legal documents accessible to every citizen in simple language.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="hover:text-accent transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Accessibility</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h5 className="font-semibold mb-4">Contact Information</h5>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <i className="fas fa-phone mr-2"></i>
                  <span>Helpline: 1947</span>
                </p>
                <p className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>help@kanoon-saral.gov.in</span>
                </p>
                <p className="flex items-start">
                  <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                  <span>Ministry of Law & Justice<br />Government of India<br />New Delhi - 110001</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-primary-foreground/20 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm">
              <p className="opacity-90">
                © 2024 Government of India. All rights reserved. | भारत सरकार के सभी अधिकार सुरक्षित हैं।
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="opacity-75">Last updated: Dec 2024</span>
                <a href="#" className="hover:text-accent transition-colors">Site Map</a>
                <a href="#" className="hover:text-accent transition-colors">RTI</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
