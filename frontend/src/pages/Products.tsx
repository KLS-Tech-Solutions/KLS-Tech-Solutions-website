import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Gauge, Bell, Smartphone, Shield, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCard from "@/components/ui/FeatureCard";

const Products = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding border-b border-border">
        <div className="container-narrow mx-auto">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <img 
                src="/kls-logo-nobg.png" 
                alt="KLS Solutions Logo" 
                className="h-32 w-auto drop-shadow-lg transition-all duration-300"
                style={{ 
                  filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 30px rgba(6, 182, 212, 0.4))'
                }}
              />
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Zap className="h-3 w-3" />
              R&D Phase
            </div>
            <h1 className="heading-display text-foreground mb-6">
              Our Products
            </h1>
            <p className="body-large">
              Intelligent IoT solutions designed for reliability, security, and real-world impact. 
              Currently in research and development phase.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Water Monitor Section */}
      <section id="smart-water-monitor" className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeader
                label="Flagship Product"
                title="Smart Water Monitor"
                description="A comprehensive IoT solution for intelligent water management in residential and commercial settings."
              />

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Real-Time Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Continuous flow measurement with precision sensors. Track consumption patterns 
                      and identify anomalies instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">AI-Powered Leak Detection</h4>
                    <p className="text-sm text-muted-foreground">
                      Machine learning algorithms analyze usage patterns to detect leaks and 
                      potential issues before they become problems.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Droplets className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Automated Valve Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatic shutoff capability in case of detected leaks or abnormal flow. 
                      Remote control via mobile app.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Mobile & Web Dashboard</h4>
                    <p className="text-sm text-muted-foreground">
                      Intuitive interfaces for monitoring, analytics, and control. Available on 
                      iOS, Android, and web browsers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Enterprise Security</h4>
                    <p className="text-sm text-muted-foreground">
                      End-to-end encryption, secure boot, and regular firmware updates. 
                      Designed for privacy and data protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-secondary to-background flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src="/model2.jpeg" 
                    alt="Smart Water Monitor Product" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm font-medium text-primary">Under Development</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Target Market</span>
                    <span className="text-sm font-medium text-foreground">Residential & Commercial</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">Architecture</span>
                    <span className="text-sm font-medium text-foreground">Edge + Cloud</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="Technical Overview"
            title="Built for Reliability"
            description="Designed with industrial-grade components and proven technologies."
            centered
          />

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Gauge}
              title="Precision Sensors"
              description="High-accuracy flow sensors with ±1% measurement precision. Suitable for both low and high flow rates."
            />
            <FeatureCard
              icon={Shield}
              title="Secure Architecture"
              description="TLS 1.3 encryption, secure element for key storage, and tamper detection. GDPR-compliant data handling."
            />
            <FeatureCard
              icon={Smartphone}
              title="Multi-Platform"
              description="Native mobile apps for iOS and Android. Web dashboard for comprehensive analytics and management."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            Interested in Our Products?
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            We're currently in R&D phase. Reach out to learn more about our 
            development timeline or discuss potential partnerships.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
