"use client";

import Container from "@/components/ui/container";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, topic, content }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(
          result.message ||
            "Wiadomość została wysłana poprawnie. Odpowiemy jak najszybciej to możliwe na podany adres email."
        );
      } else {
        setErrorMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="flex max-lg:flex-col w-full gap-10 h-[60vh]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-[#000] lg:w-[50%] "
        >
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium  text-[rgb(235,64,54)]"
            >
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium  text-[rgb(235,64,54)]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium  text-[rgb(235,64,54)]"
            >
              Your Message
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
        <div className="lg:w-[50%] flex flex-col gap-5">
          <h2 className="text-[2.5rem] font-semibold uppercase">
            Skontaktuj się z nami
          </h2>
          <p>
            Masz projekt na myśli? Skontaktuj się z nami przez formularz
            kontaktowy, a my odpowiemy jak najszybciej. Z przyjemnością pomożemy
            Ci w realizacji Twojego pomysłu, zapewniając fachową pomoc i
            najwyższą jakość wykonania. Czekamy na Twoje pytania i propozycje –
            razem stworzymy coś wyjątkowego!
          </p>
        </div>
      </div>
    </Container>
  );
}
