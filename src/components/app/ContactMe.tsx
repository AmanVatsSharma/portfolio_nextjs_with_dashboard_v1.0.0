'use client'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactMe = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      // Convert form data to URL encoded string
      const formBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value);
      });
      
      // Create a hidden form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbxH4WKUqL8lHki_MnGDU04iMT07Kf23-HyRgEQmiCR5n0cxvWgda4d3JodayIzSUiwo1g/exec';
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      // Add form to body and submit
      document.body.appendChild(form);
      form.submit();
      
      // Clean up the form
      document.body.removeChild(form);
      
      // Show success message
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen relative flex flex-col text-center md:text-left md:flex-row max-w-7xl px-4 sm:px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-16 sm:top-24 uppercase tracking-[15px] sm:tracking-[20px] text-gray-500 text-xl sm:text-2xl">
        Contact{" "}
      </h3>

      <div className="pt-28 sm:pt-36 flex flex-col space-y-4 sm:space-y-6 md:space-y-10">
        <h4 className="text-lg sm:text-xl md:text-4xl font-semibold text-center">
          I have got just what you need.{" "}
          <span className="decoration-[#f7ab0a]/50 underline">Lets Talk.</span>
        </h4>

        <div className="space-y-6 sm:space-y-10">
          <motion.div 
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 sm:space-x-5 justify-center group cursor-pointer"
          >
            <PhoneIcon className="text-[#f7ab0a] h-5 w-5 sm:h-6 sm:w-6 animate-pulse group-hover:animate-bounce" />
            <p className="text-base sm:text-lg md:text-xl group-hover:text-[#f7ab0a] transition-colors">+91 996 373 0111</p>
          </motion.div>

          <motion.div 
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 sm:space-x-5 justify-center group cursor-pointer"
          >
            <MapPinIcon className="text-[#f7ab0a] h-5 w-5 sm:h-6 sm:w-6 animate-pulse group-hover:animate-bounce" />
            <p className="text-base sm:text-lg md:text-xl group-hover:text-[#f7ab0a] transition-colors">Gurugram, Haryana.</p>
          </motion.div>

          <motion.div 
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 sm:space-x-5 justify-center group cursor-pointer"
          >
            <EnvelopeIcon className="text-[#f7ab0a] h-5 w-5 sm:h-6 sm:w-6 animate-pulse group-hover:animate-bounce" />
            <p className="text-base sm:text-lg md:text-xl break-all sm:break-normal group-hover:text-[#f7ab0a] transition-colors">aman95026@gmail.com</p>
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-full sm:w-fit mx-auto relative"
        >
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative group">
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="contactInput peer"
                type="text"
                disabled={isSubmitting}
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f7ab0a]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
            <div className="relative group">
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                className="contactInput peer"
                type="email"
                disabled={isSubmitting}
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f7ab0a]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </div>

          <div className="relative group">
            <input
              {...register("subject", { required: true })}
              placeholder="Subject"
              className="contactInput peer"
              type="text"
              disabled={isSubmitting}
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f7ab0a]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          <div className="relative group">
            <textarea
              {...register("message", { required: true })}
              placeholder="Message"
              className="contactInput min-h-[100px] peer"
              disabled={isSubmitting}
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#f7ab0a]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#f7ab0a] py-3 sm:py-5 px-5 md:px-10 rounded-md text-black font-bold text-base sm:text-lg transition-all shadow-md hover:shadow-xl
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#f7ab0a]/90'}`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </div>
            ) : 'Submit'}
          </motion.button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-sm text-center"
            >
              Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              Failed to send message. Please try again later.
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default ContactMe;
