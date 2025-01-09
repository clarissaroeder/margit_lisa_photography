"use client";

import { useState } from "react";
import clsx from "clsx";

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phoneNumber, message })
      });
      console.log(response)
      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      } else {
        setError(data.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error); // Debugging
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-12 sm:py-16 lg:px-8 font-[family-name:var(--font-geist-sans)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
      </div>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-balance text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl font-[family-name:var(--font-geist-mono)]">Contact</h2>
        <p className="mt-2 text-gray-600">For licensing and purchase inquiries as well as press requests, please fill out the form below.</p>
      </div>

      {isSubmitted ? (
        <div className="mt-10 max-w-xl mx-auto p-6 bg-lime-100 border border-lime-300 text-lime-700 rounded">
          <div className="flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            Your message was sent successfully! Thank you for reaching out.
            </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl sm:mt-14">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                  Name
                </div>
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-custom-orange-2"
                />
              </div>
            </div>
            {/* <div>
              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                Nachname
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-custom-orange-2"
                />
              </div>
            </div> */}
            <div className="sm:col-span-1">
              <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                <div className="flex items-center">
                  <EnvelopeIcon className="mr-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                  Email
                </div>
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-custom-orange-2"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                <div className="flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                  Phone
                </div>
              </label>
              <div className="mt-2.5">
                <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-custom-orange-2">
                  {/* <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      aria-label="Country"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>US</option>
                      <option>CA</option>
                      <option>EU</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div> */}
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                <div className="flex items-center">
                  <ChatBubbleBottomCenterTextIcon className="mr-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                  Message
                </div>
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-custom-orange-2"
                  required
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="mt-4 text-red-600 text-sm text-center">
                {error}
            </div>
          )}
          <div className="mt-10">
          <button
            type="submit"
            className={clsx(
              'block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm',
              'bg-custom-orange-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-orange-2',
              {
                'opacity-50 cursor-not-allowed': isSubmitting,
                'hover:bg-custom-orange-1': !isSubmitting,
              }
            )}
            disabled={isSubmitting}
          >
            <div className="flex items-center justify-center">
              <PaperAirplaneIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              {isSubmitting ? 'Sending...' : 'Submit'}
            </div>
          </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ContactForm;