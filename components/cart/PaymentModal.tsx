import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface PaymentModalProps {
  isOpen: boolean;
  paymentUrl: string;
  onClose?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, paymentUrl, onClose }) => {
  const [countdown, setCountdown] = useState(5);
 const t=useTranslations("Checkout")

  useEffect(() => {
    console.log(isOpen)
    if (!isOpen) return;

    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = paymentUrl; // automatyczne przekierowanie
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, paymentUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1A1A1A] rounded-3xl border border-[#404040] p-8 shadow-2xl text-center max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-white mb-4">{t("order_success")}</h2>
        <p className="text-[#A5A5A5] mb-4">{t("redirecting_to_payment")}<span className="font-bold">{countdown}s</span></p>
        <button
          className="px-6 py-3 bg-[#EB4036] hover:bg-red-600 rounded-xl text-white font-semibold transition-colors"
          onClick={() => window.location.href = paymentUrl}
        >
         {t("go_to_payment_now")}
        </button>
      </motion.div>
    </div>
  );
};
