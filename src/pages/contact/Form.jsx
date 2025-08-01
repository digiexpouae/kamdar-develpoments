import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 2 },
  }),
};

const Form = ({ backgroundImage = null }) => {
  const router = useRouter();

  const [formType, setFormType] = useState('sales');

  const getHubSpotEndpoint = () => {
    switch (formType) {
      case 'sales':
        return {
          portalId: '6760817',
          formId: 'd2238bc6-b04b-4de0-b12d-bfcc7a80a38e',
        };
      case 'general':
        return {
          portalId: '6760817',
          formId: 'd2238bc6-b04b-4de0-b12d-bfcc7a80a38e',
        };
      default:
        return {
          portalId: '6760817',
          formId: 'd2238bc6-b04b-4de0-b12d-bfcc7a80a38e',
        };
    }
  };

  return (
    <>
      <section 
        className={`w-full h-[600px] md:h-[600px] py-16 px-4 md:px-0 flex justify-center items-center ${
          backgroundImage ? 'bg-cover bg-center' : 'bg-white'
        } text-white  relative`}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      >
        {backgroundImage && <div className="absolute inset-0 " />}
        <div className="bg-layer bg-base" />
        <motion.div
          className="bg-layer bg-overlay"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3 }}
        />

        <motion.div
          className="reveal-on-scroll max-w-xl w-full bg-transparent p-6 md:p-10 rounded-lg relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.h2
            className="text-4xl md:text-7xl font-bold text-center text-black"
            style={{ fontFamily: 'Luxerie' }}
            custom={0}
            variants={fadeUp}
          >
            REGISTER NOW
          </motion.h2>

          <motion.p
            className="text-center text-sm mb-8 text-black font-lexend"
            custom={1}
            variants={fadeUp}
          >
            Send an enquiry by filling in the form below
          </motion.p>

          <motion.form
                     className="space-y-4 font-lexend font-[300]"
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     variants={fadeUp}
                     onSubmit={async (e) => {
                       e.preventDefault();
         
                       const { firstname, lastname, email, phone, buyertype, timeframe, apttype, areyou } = e.target;
         
                       const payload = {
                         fields: [
                           { name: 'firstname', value: firstname?.value.trim() },
                           { name: 'lastname', value: lastname?.value.trim() },
                           { name: 'email', value: email?.value.trim() },
                           { name: 'phone', value: phone?.value.trim() },
                           { name: 'buyer_or_broker', value: buyertype?.value },
                           { name: 'buying_timeframe', value: timeframe?.value },
                           { name: 'apartment_type', value: apttype?.value },
                         ],
                       };
         
                       const { portalId, formId } = getHubSpotEndpoint();
         
                       try {
                         const response = await fetch(
                           `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
                           {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify(payload),
                           }
                         );
         
                         if (response.ok) {
                           e.target.reset();
                           router.push('/thankyou');
                         } else {
                           const errorText = await response.text();
                           console.error('HubSpot Error:', errorText);
                           alert('Form submission failed. Check console.');
                         }
                       } catch (err) {
                         console.error('Submission Error:', err);
                         alert('Network error. Try again.');
                       }
                     }}
                   >
                     <motion.div className="flex gap-4" custom={2} variants={fadeUp}>
                       <input
                         type="text"
                         name="firstname"
                         placeholder="First name"
                         required
                         className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
                       />
                       <input
                         type="text"
                         name="lastname"
                         placeholder="Last name"
                         required
                         className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
                       />
                     </motion.div>
         
                     <motion.div className="flex gap-4" custom={3} variants={fadeUp}>
                       <input
                         type="text"
                         name="phone"
                         placeholder="Mobile number"
                         required
                         className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
                       />
                       <input
                         type="email"
                         name="email"
                         placeholder="Email"
                         required
                         className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
                       />
                     </motion.div>
         
                     <motion.div custom={4} variants={fadeUp}>
                       <select
                         name="buyertype"
                         required
                         className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black"
                       >
                         <option  value="" disabled selected >Buyer or Broker</option>
                         <option value="Buyer">Buyer</option>
                         <option value="Broker">Broker</option>
                       </select>
                     </motion.div>
         
                     <motion.div custom={5} variants={fadeUp}>
                       <select
                         name="timeframe"
                         required
                         className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black"
                       >
                         <option  value="" disabled selected >Buying Timeframe</option>
                         <option value="0-3 months">0–3 Months</option>
                         <option value="3-6 months">3–6 Months</option>
                         <option value="Unsure">Unsure</option>
                       </select>
                     </motion.div>
         
                     <motion.div custom={6} variants={fadeUp}>
                       <select
                         name="apttype"
                         required
                         className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black"
                       >
                         <option value=""disabled selected >Apartment Type</option>
                         <option value="Studio">Studio</option>
                         <option value="1 bed">1 Bed</option>
                         <option value="2 bed">2 Bed</option>
                       </select>
                     </motion.div>
         
         
                     <motion.button
                       type="submit"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="w-full px-6 py-3 rounded-md bg-black text-white font-[300] shadow-md hover:opacity-90"
                       custom={8}
                       variants={fadeUp}
                     >
                       Submit
                     </motion.button>
                   </motion.form>
        </motion.div>
      </section>
    </>
  );
};

export default Form;
