'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact';

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          from_name: data.name,
          subject: `Bombers Website: ${data.subject}`,
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          message: data.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.name
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
            } focus:outline-none`}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
            } focus:outline-none`}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone field (optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.phone
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
            } focus:outline-none`}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Subject field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.subject
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
            } focus:outline-none`}
          />
          {errors.subject && (
            <p id="subject-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.message
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:border-bombers-yellow focus:ring-2 focus:ring-bombers-yellow/20'
            } focus:outline-none resize-y`}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-bombers-yellow text-bombers-navy py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Success message */}
      {submitStatus === 'success' && (
        <div
          role="status"
          className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
        >
          <p className="text-green-800 font-medium">
            Thank you for your message! We&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {/* Error message */}
      {submitStatus === 'error' && (
        <div
          role="alert"
          className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
        >
          <p className="text-red-800 font-medium mb-1">
            Sorry, there was an error sending your message.
          </p>
          <p className="text-red-700 text-sm">
            Please try again or email us directly at{' '}
            <a
              href="mailto:ofallonbombers@gmail.com"
              className="underline hover:text-red-900"
            >
              ofallonbombers@gmail.com
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
