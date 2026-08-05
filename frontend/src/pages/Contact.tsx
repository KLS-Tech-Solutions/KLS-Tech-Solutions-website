import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/ui/SectionHeader";
import { getContactData, submitContactForm } from "@/services/contactService";
import type { ContactData } from "@/services/contactService";
import { contactInfo, contactLinks } from "@/config/contact";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch contact page data (placeholder GET only, no POST)
    const fetchContactData = async () => {
      try {
        setContactLoading(true);
        setContactError(null);
        const data = await getContactData();
        setContactData(data);
      } catch (error) {
        // Fail gracefully - don't break UI rendering
        setContactError(error instanceof Error ? error.message : 'Failed to fetch contact data');
        console.error('Contact data fetch failed:', error);
      } finally {
        setContactLoading(false);
      }
    };

    fetchContactData();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      if (response.success) {
        toast({
          title: "Message Sent!",
          description: response.message,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Contact Us
            </h1>
            <p className="body-large">
              Have a question or want to discuss a potential project? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Phone</h4>
                    <a 
                      href={contactLinks.phone}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Email</h4>
                    <a 
                      href={contactLinks.email}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784 0.013 3.808.072 1.05.06 1.77.278 2.392.6a5.9 5.9 0 0 1 2.13 1.36 5.9 5.9 0 0 1 1.36 2.13c.322.622.54 1.342.6 2.392.057 1.024.072 1.378.072 3.808 0 2.43-.015 2.784-.072 3.808-.06 1.05-.278 1.77-.6 2.392a5.9 5.9 0 0 1-1.36 2.13 5.9 5.9 0 0 1-2.13 1.36c-.622.322-1.342.54-2.392.6-1.024.057-1.378.072-3.808.072-2.43 0-2.784-.015-3.808-.072-1.05-.06-1.77-.278-2.392-.6a5.9 5.9 0 0 1-2.13-1.36 5.9 5.9 0 0 1-1.36-2.13c-.322-.622-.54-1.342-.6-2.392-.057-1.024-.072-1.378-.072-3.808 0-2.43.013-2.784.072-3.808.06-1.05.278-1.77.6-2.392a5.9 5.9 0 0 1 1.36-2.13 5.9 5.9 0 0 1 2.13-1.36c.622-.322 1.342-.54 2.392-.6C9.531 2.013 9.885 2 12.315 2zm0-2C9.928 0 9.539.013 8.5.06 7.35.118 6.5.345 5.75.65a7.9 7.9 0 0 0-2.85 1.82A7.9 7.9 0 0 0 1.08 5.32c-.305.75-.532 1.6-.59 2.75C.443 9.161.43 9.55.43 11.937c0 2.388.013 2.777.06 3.816.058 1.15.285 2 .59 2.75a7.9 7.9 0 0 0 1.82 2.85 7.9 7.9 0 0 0 2.85 1.82c.75.305 1.6.532 2.75.59 1.039.047 1.428.06 3.816.06 2.388 0 2.777-.013 3.816-.06 1.15-.058 2-.285 2.75-.59a7.9 7.9 0 0 0 2.85-1.82 7.9 7.9 0 0 0 1.82-2.85c.305-.75.532-1.6.59-2.75.047-1.039.06-1.428.06-3.816 0-2.388-.013-2.777-.06-3.816-.058-1.15-.285-2-.59-2.75a7.9 7.9 0 0 0-1.82-2.85A7.9 7.9 0 0 0 18.25.65c-.75-.305-1.6-.532-2.75-.59C14.461.013 14.072 0 11.685 0h.63z" clipRule="evenodd"/>
                      <path fillRule="evenodd" d="M12.315 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.315 16a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324z" clipRule="evenodd"/>
                      <circle cx="18.31" cy="5.594" r="1.445"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Instagram</h4>
                    <a 
                      href={contactLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      @{contactInfo.instagram}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-xl border border-border bg-card">
                <h4 className="font-semibold text-foreground mb-3">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 1-2 business days. For urgent matters, 
                  please indicate so in your message subject.
                </p>
                {/* Backend status indicator (non-intrusive) */}
                {contactData && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      {contactData.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-8">
                <SectionHeader
                  title="Send us a Message"
                  description="Fill out the form below and we'll get back to you as soon as possible."
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className={`ml-2 h-4 w-4 ${isSubmitting ? "animate-spin" : ""}`} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="section-padding bg-card border-t border-border">
        <div className="container-narrow mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Prefer a Direct Conversation?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            If you'd like to schedule a call to discuss your project in detail, 
            mention it in your message and we'll coordinate a time that works.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
