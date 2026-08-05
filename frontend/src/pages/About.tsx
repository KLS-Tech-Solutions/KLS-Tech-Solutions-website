import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Compass, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";

const About = () => {
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
              About KLS Tech Solutions
            </h1>
            <p className="body-large">
              We're an engineering-first company focused on building intelligent 
              systems that solve real problems. No hype, no buzzwords — just 
              solid engineering and practical innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="p-8 rounded-xl border border-border bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To engineer intelligent systems that make everyday infrastructure 
                smarter, more efficient, and more secure. We believe technology 
                should work reliably in the background, solving problems without 
                adding complexity.
              </p>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-6">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where IoT systems are secure by default, intelligent by design, 
                and accessible to everyone. We're building the foundation for the next 
                generation of connected infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-narrow mx-auto">
          <SectionHeader
            label="Our Values"
            title="Engineering Principles"
            description="The core beliefs that guide how we work and what we build."
            centered
          />

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <Compass className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Technical Excellence</h3>
              <p className="text-sm text-muted-foreground">
                We don't cut corners. Every system we build is designed for 
                reliability, maintainability, and long-term performance.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Security First</h3>
              <p className="text-sm text-muted-foreground">
                Security isn't a feature — it's a foundation. We build secure 
                systems from the ground up, not as an afterthought.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Honest Engineering</h3>
              <p className="text-sm text-muted-foreground">
                We're transparent about what's possible and what isn't. 
                No overpromising, no marketing fluff — just honest assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                label="Our Team"
                title="Engineers Building for Engineers"
              />
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're a small, focused team of engineers with deep experience in 
                embedded systems, cloud architecture, and machine learning. We've 
                built systems for industries ranging from consumer electronics to 
                industrial automation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our backgrounds span hardware design, firmware development, backend 
                engineering, and security research. This cross-functional expertise 
                allows us to tackle complex problems that span the entire stack.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-secondary p-6 text-center">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">Small</div>
                <div className="text-sm text-muted-foreground">Focused Team</div>
              </div>
              <div className="rounded-xl border border-border bg-secondary p-6 text-center">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">R&D</div>
                <div className="text-sm text-muted-foreground">Phase</div>
              </div>
              <div className="col-span-2 rounded-xl border border-border bg-secondary p-6 text-center">
                <div className="text-lg font-semibold text-foreground mb-2">
                  Engineering-First Culture
                </div>
                <div className="text-sm text-muted-foreground">
                  We solve problems with technology, not marketing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card border-t border-border">
        <div className="container-narrow mx-auto text-center">
          <h2 className="heading-section text-foreground mb-4">
            Want to Learn More?
          </h2>
          <p className="body-large max-w-2xl mx-auto mb-10">
            We're always open to conversations about technology, partnerships, 
            or potential collaborations.
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

export default About;
