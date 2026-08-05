import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Brain, Shield, Droplets, Factory, Settings, ChevronRight, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import FeatureCard from "@/components/ui/FeatureCard";
import SectionHeader from "@/components/ui/SectionHeader";

const Index = () => {

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative container-narrow mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="heading-display text-foreground mb-6 animate-fade-up">
              Smart Living,{" "}
              <span className="text-gradient">Engineered</span>
            </h1>
            
            <p className="body-large max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              We design and develop intelligent IoT systems powered by AI, 
              with enterprise-grade security at the core. From concept to deployment, 
              engineered with precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/solutions">
                  Build Custom Solution
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding border-t border-border">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="What We Do"
            title="Engineering Excellence Across Three Pillars"
            description="We bring together IoT hardware, AI intelligence, and robust security architecture to create systems that last."
            centered
          />

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Cpu}
              title="IoT Product Engineering"
              description="Custom hardware and firmware development for connected devices. From sensors to gateways, designed for reliability and scale."
            />
            <FeatureCard
              icon={Brain}
              title="AI-Driven Intelligence"
              description="Machine learning models and intelligent automation that turn raw data into actionable insights and autonomous decisions."
            />
            <FeatureCard
              icon={Shield}
              title="Secure System Architecture"
              description="End-to-end security built in from day one. Encrypted communications, secure boot, and compliance-ready infrastructure."
            />
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-narrow mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Zap className="h-3 w-3" />
                Under Research & Development
              </div>
              
              <h2 className="heading-section text-foreground mb-4">
                Smart Water Monitor
              </h2>
              
              <p className="body-large mb-8">
                Our flagship IoT solution for intelligent water management. 
                Real-time monitoring, predictive leak detection, and automated 
                flow control — all secured by end-to-end encryption.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Real-time consumption analytics",
                  "AI-powered leak detection & alerts",
                  "Automated valve control",
                  "Mobile & web dashboard",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild variant="enterprise" size="lg">
                <Link to="/products#smart-water-monitor">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl border border-border bg-gradient-to-br from-secondary to-card p-8 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                  <Droplets className="relative h-32 w-32 text-primary" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-xl border border-primary/20 bg-card/50" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-lg border border-border bg-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <Factory className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Industrial Automation</h4>
                  <p className="text-sm text-muted-foreground">Factory monitoring, predictive maintenance, process optimization.</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <Settings className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Home Automation</h4>
                  <p className="text-sm text-muted-foreground">Smart home systems with local control and cloud connectivity.</p>
                </div>
                <div className="col-span-2 rounded-xl border border-border bg-card p-6">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Secure Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">Enterprise-grade security for critical systems and sensitive data.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionHeader
                label="Custom Solutions"
                title="Tailored Engineering for Your Needs"
                description="From industrial automation to smart home systems, we partner with you to design, develop, and deploy solutions that fit your exact requirements."
              />
              
              <Button asChild variant="hero" size="lg">
                <Link to="/solutions">
                  Explore Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why KLS Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="Why KLS Tech Solutions"
            title="Engineering-First Mindset"
            description="We're not a marketing company that builds tech. We're engineers who solve real problems."
            centered
          />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Technical Depth",
                description: "From embedded firmware to cloud architecture, we understand every layer of the stack.",
              },
              {
                title: "Security by Design",
                description: "Security isn't an afterthought. It's built into every component from day one.",
              },
              {
                title: "Long-term Thinking",
                description: "We design systems that scale and evolve. No shortcuts, no technical debt.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-lg font-bold text-primary">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            Let's Build Something Intelligent
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            Ready to bring your IoT vision to life? We're here to help you design, 
            develop, and deploy systems that make a difference.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
