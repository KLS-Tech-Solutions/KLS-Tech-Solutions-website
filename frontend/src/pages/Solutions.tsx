import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Home, Building2, Cpu, Settings, Shield, Workflow, Cog } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";

const Solutions = () => {
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
            <h1 className="heading-display text-foreground mb-6">
              Custom Solutions
            </h1>
            <p className="body-large">
              We partner with organizations to design, develop, and deploy 
              tailored IoT and automation solutions. From concept to production, 
              engineered for your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="Industries We Serve"
            title="Tailored for Your Sector"
            description="Our engineering expertise spans across multiple industries, with solutions designed for each sector's unique challenges."
            centered
          />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group p-8 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
              <Factory className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Industrial</h3>
              <p className="text-muted-foreground mb-4">
                Manufacturing automation, predictive maintenance, process monitoring, 
                and industrial IoT infrastructure.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Factory floor monitoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Equipment health tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Production analytics
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
              <Home className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Residential</h3>
              <p className="text-muted-foreground mb-4">
                Smart home systems with local-first control, privacy-focused 
                architecture, and seamless integration.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Home automation hubs
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Energy management
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Security & monitoring
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
              <Building2 className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Commercial</h3>
              <p className="text-muted-foreground mb-4">
                Building management, occupancy optimization, and enterprise-grade 
                infrastructure solutions.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Building automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  HVAC optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Access control systems
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="Our Capabilities"
            title="End-to-End Engineering"
            description="From hardware design to cloud infrastructure, we handle every layer of the stack."
          />

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Hardware Design</h4>
                <p className="text-muted-foreground">
                  Custom PCB design, sensor integration, power management, and enclosure engineering. 
                  From prototype to production-ready designs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Firmware Development</h4>
                <p className="text-muted-foreground">
                  Embedded systems programming, RTOS implementation, OTA updates, and 
                  secure bootloader development.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Workflow className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Cloud Infrastructure</h4>
                <p className="text-muted-foreground">
                  Scalable backend architecture, real-time data pipelines, API development, 
                  and multi-tenant platforms.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Security Architecture</h4>
                <p className="text-muted-foreground">
                  End-to-end encryption, certificate management, secure provisioning, 
                  and compliance engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="Our Process"
            title="How We Work"
            description="A structured approach to delivering reliable, scalable solutions."
            centered
          />

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your requirements, constraints, and goals.",
              },
              {
                step: "02",
                title: "Design",
                description: "Architecture planning, component selection, and prototyping.",
              },
              {
                step: "03",
                title: "Development",
                description: "Hardware, firmware, and software development with iterative testing.",
              },
              {
                step: "04",
                title: "Deployment",
                description: "Production support, documentation, and ongoing maintenance.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary text-xl font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card border-t border-border">
        <div className="container-narrow mx-auto text-center">
          <Cog className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="heading-section text-foreground mb-4">
            Let's Discuss Your Project
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            Have a specific challenge in mind? We'd love to hear about it. 
            Schedule a consultation to explore how we can help.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
