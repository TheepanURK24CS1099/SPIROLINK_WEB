import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nProvider';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'general',
  });

  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(
        t('contactFormErrorRequired') || 'Please fill in all required fields'
      );
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        t('contactFormErrorEmail') || 'Please enter a valid email'
      );
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: 'general',
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        t('contactFormErrorSubmit') ||
          'Failed to send message. Please try again.'
      );
      setStatus('error');
    }
  };

  return (
    <>
      {/* HERO */}
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-40">
        <h1 className="text-6xl font-bold text-white mb-6">
          {t('contactPageTitle')}
        </h1>
        <p className="text-xl text-slate-300">
          {t('contactPageDescription')}
        </p>
      </Section>

      {/* CONTACT INFO */}
      <Section className="bg-white">
        <SectionHeading
          title="Contact Information"
          subtitle="Multiple ways to reach us"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <InfoCard icon={Mail} title="Email" value="contact@spirolink.com" />
          <InfoCard icon={Phone} title="Phone" value="+1 (617) 680-4300" />
          <InfoCard
            icon={MapPin}
            title="Office"
            value="Plano, TX, USA"
          />
        </div>
      </Section>

      {/* FORM */}
      <Section className="bg-slate-900 text-white">
        <SectionHeading
          title="Send us a Message"
          subtitle="We'll respond within 24 hours"
          centered
          dark
        />

        <div className="max-w-2xl mx-auto mt-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input"
            />

            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="input"
            >
              <option value="general">General Inquiry</option>
              <option value="pon-ftth">PON & FTTH</option>
              <option value="microwave">Microwave</option>
              <option value="optical">Optical Long Haul</option>
              <option value="wifi">Wi-Fi Network</option>
              <option value="quote">Request Quote</option>
            </select>

            <textarea
              name="message"
              placeholder="Message *"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="input"
              required
            />

            {status === 'success' && (
              <p className="text-green-400">
                Message sent successfully!
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400">{errorMessage}</p>
            )}

            <Button type="submit" disabled={status === 'loading'} size="lg">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}

/* ===============================
   INFO CARD COMPONENT
================================ */
function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <div className="p-6 border rounded-xl text-center">
      <Icon className="w-10 h-10 mx-auto text-blue-600 mb-4" />
      <h3 className="font-bold">{title}</h3>
      <p className="text-slate-600">{value}</p>
    </div>
  );
}
