import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../../../public/assets/bg_5.png';
import formBg from '../../../public/assets/formbg.png';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 2 },
  }),
};

const Form = () => {
  return (
    <>
      <style>{`
        .section6-shadow {
          position: relative;
        }
        .section6-shadow::before,
        .section6-shadow::after {
          content: '';
          position: absolute;
          top: 0;
          width: 60px;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }
        .section6-shadow::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .section6-shadow::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .bg-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
        }
        .bg-base {
          background-image: url(${formBg.src});
          z-index: 1;
        }
        .bg-overlay {
          background-image: url(${bgImage.src});
          z-index: 2;
        }
      `}</style>

      <section className="w-full h-[600px] md:h-[600px] py-16 px-4 md:px-0 flex justify-center items-center bg-black text-white section6-shadow relative">
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

              const firstName = e.target.firstname?.value.trim();
              const lastName = e.target.lastname?.value.trim();
              const email = e.target.email?.value.trim();
              const phone = e.target.phone?.value.trim();
              const category = e.target.category?.value.toLowerCase();

              // Form ID mapping
              const FORM_IDS = {
                sales: '3081f524-7f7b-4fdf-9fa0-86acd4874ebf',
                general: 'd39ab5ce-eb91-4294-81d2-0e85dcead7a2',
              };

              const selectedFormId = FORM_IDS[category];

              if (!selectedFormId) {
                alert('Please select either Sales or General');
                return;
              }

              const payload = {
                fields: [
                  { name: 'firstname', value: firstName },
                  { name: 'lastname', value: lastName },
                  { name: 'email', value: email },
                  { name: 'phone', value: phone },
                  { name: 'category', value: category}
                ],
              };

              try {
                const response = await fetch(
                  `https://api.hsforms.com/submissions/v3/integration/submit/243319543/${selectedFormId}`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                  }
                );

                if (response.ok) {
                  alert('Form submitted successfully!');
                  e.target.reset();
                } else {
                  const errorText = await response.text();
                  console.error('HubSpot Error:', errorText);
                  alert('Form submission failed. See console for details.');
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
                placeholder="Phone number"
                className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-1/2 px-4 py-2 bg-transparent border border-black rounded-md text-black placeholder-black"
              />
            </motion.div>

            <motion.div custom={4} variants={fadeUp}>
              <select
                name="category"
                className="w-full px-4 py-2 bg-transparent border border-black rounded-md text-black"
                required
              >
                <option value="">Are you?</option>
                <option value="sales">Sales</option>
                <option value="general">General</option>
              </select>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-md bg-black text-white font-[300] shadow-md hover:opacity-90"
              custom={6}
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
