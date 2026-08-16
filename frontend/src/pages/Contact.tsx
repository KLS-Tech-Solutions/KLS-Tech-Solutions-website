import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import IconTile from "@/components/common/IconTile";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pageMeta } from "@/config/seo";
import { contactInfo, contactLinks } from "@/config/site";
import { useToast } from "@/hooks/use-toast";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { submitContactForm } from "@/services/contactService";
import { cn } from "@/lib/utils";

const contactChannels = [
  {
    icon: Phone,
    label: "Phone",
    value: contactInfo.phone,
    href: contactLinks.phone,
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: contactLinks.email,
    external: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: `@${contactInfo.instagram}`,
    href: contactLinks.instagram,
    external: true,
  },
] as const;

const Contact = () => {
  const { toast } = useToast();

  /**
   * The form is now managed by react-hook-form with a zod resolver. The
   * previous implementation held six useState values and validated nothing
   * beyond the browser's `required` attribute — react-hook-form and zod were
   * already installed as dependencies but unused.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Honeypot tripped — silently accept without sending anything upstream.
    if (values.website) return;

    try {
      const response = await submitContactForm({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        subject: values.subject,
        message: values.message,
      });

      if (response.success) {
        toast({ title: "Message sent", description: response.message });
        reset();
      }
    } catch (error) {
      toast({
        title: "Message could not be sent",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again, or email us directly.",
        variant: "destructive",
      });
    }
  };

  /** Shared field styling, including the invalid state. */
  const fieldClass = (hasError: boolean) =>
    cn("bg-background", hasError && "border-destructive focus-visible:ring-destructive");

  return (
    <Layout>
      <Seo {...pageMeta.contact} />
      <JsonLd
        data={[breadcrumbSchema([{ name: "Contact", path: "/contact" }]), contactPageSchema()]}
      />

      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your project"
        description="Have a question or want to discuss a potential project? We'd love to hear from you."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        visual="contact"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---- Contact details ---- */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="heading-card mb-6 text-foreground">Get in touch</h2>

              <ul className="space-y-5">
                {contactChannels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex gap-4 rounded-lg"
                    >
                      <IconTile
                        icon={channel.icon}
                        size="sm"
                        className="transition-transform group-hover:scale-105"
                      />
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                          {channel.label}
                        </span>
                        <span className="block break-all text-sm text-muted-foreground transition-colors group-hover:text-primary">
                          {channel.value}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}

                <li className="flex gap-4">
                  <IconTile icon={MapPin} size="sm" />
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">Location</span>
                    <span className="block text-sm text-muted-foreground">
                      {contactInfo.location}
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  Response time
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We typically respond within {contactInfo.responseTime}. For urgent matters, please
                  indicate so in your message subject.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-6">
                <h3 className="mb-2 font-semibold text-foreground">Prefer a direct conversation?</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  If you'd like to schedule a call to discuss your project in detail, mention it in
                  your message and we'll coordinate a time that works.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Form ---- */}
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:p-10">
                <h2 className="heading-card text-foreground">Send us a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible. Fields
                  marked with an asterisk are required.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
                  {/* Honeypot — hidden from users, visible to naive bots. */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Your name <span aria-hidden="true">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={fieldClass(Boolean(errors.name))}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="mt-2 text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Email address <span aria-hidden="true">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={fieldClass(Boolean(errors.email))}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-2 text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Phone number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={fieldClass(Boolean(errors.phone))}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="mt-2 text-sm text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your company"
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? "company-error" : undefined}
                        className={fieldClass(Boolean(errors.company))}
                        {...register("company")}
                      />
                      {errors.company && (
                        <p id="company-error" role="alert" className="mt-2 text-sm text-destructive">
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Subject <span aria-hidden="true">*</span>
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Project inquiry"
                      aria-required="true"
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={fieldClass(Boolean(errors.subject))}
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p id="subject-error" role="alert" className="mt-2 text-sm text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us about your project or inquiry..."
                      aria-required="true"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn("resize-none", fieldClass(Boolean(errors.message)))}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-2 text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                    <Send
                      className={cn("h-4 w-4", isSubmitting && "animate-pulse")}
                      aria-hidden="true"
                    />
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
