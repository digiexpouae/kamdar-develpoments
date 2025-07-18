import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Term = () => {
  return (
    <>
      <Header />

      <div className="w-full bg-white text-black pt-40">
        <h2 className="my-heading text-center text-black text-[42px] font-medium" style={{fontFamily:'Luxerie, sans-serif'}}>
          TERMS AND CONDITIONS
        </h2>

        <section className="py-10 w-full px-4 mx-auto md:w-[662px] text-black font-secondary text-sm rich-text-block">
          <table className="w-full border-separate border-spacing-y-4">
            <tbody>
              <tr>
                <td className="align-top text-black font-medium">
                  We, us, our or Kamdar
                </td>
                <td className="align-top text-black">
                  Kamdar Development and any of its affiliates and/or subsidiaries.
                </td>
              </tr>
              <tr>
                <td className="align-top pr-4 text-black font-medium">
                  You, you and yours
                </td>
                <td className="align-top text-black">
                  References to the person accessing the website.
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-6 font-bold">Terms and Conditions:</p>
          <p>
            These are general Terms and Conditions of Kamdar Development (the ‘Company’) governing
            your access and use of the ‘website’. If you do not agree with them, please do not use
            the website. By continuing to use the website, contents and/or any of the services
            shown on the site, you agree to be bound by these terms and conditions.
          </p>

          <p className="mt-4 font-bold">Acceptance</p>
          <p>
            You undertake that your use of the website (which includes all contents on the screen,
            web links, emails and other services and information, along with the subsequent changes
            in due course [‘content’]) means you fully agree to the terms and conditions. Your
            eligibility to the products and services offered on the website is subject to Kamdar
            Development’s determination and acceptance. You also undertake that your use of the
            website shall not:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Violate the respective applicable laws</li>
            <li>
              Harm the public image of the website and will only be used for all defined, permitted
              and productive means
            </li>
            <li>
              Represent any fraudulent business activity; and that your use of the website and any
              consequential business decision will be at your own risk
            </li>
          </ul>

          <p className="mt-4 font-bold">Copyright © Kamdar Development. All Rights Reserved.</p>
          <p>
            Copyright in the pages and in the screens displaying the pages, along with the
            information and material therein and in their arrangement, is owned by Kamdar
            Development unless otherwise indicated. Re-use of any content is strictly prohibited
            unless otherwise stated.
          </p>

          <p className="mt-4 font-bold">Trademarks</p>
          <p>
            Kamdar Development, its subsidiaries, affiliates, contractors and/or participating
            corporations, are the owners of the trade and service marks appearing on this website
            and all rights are reserved in respect of such trade and service marks.
          </p>

          <p className="mt-4 font-bold">No warranty</p>
          <p>
            The Company does not warrant the accuracy, correctness, completeness and acceptance of
            the content and/or any other information and/or materials available on the site. No
            warranties of any kind are given, whether express, implied or by laws, including but not
            limited to the warranties of non-infringement of third party rights, security, fitness,
            quality, compatibility, accuracy and safety.
          </p>

          <p className="mt-4 font-bold">Limitation of liability</p>
          <p>
            Under no circumstance will Kamdar be liable for any features, functions (programming
            errors, other errors, linking, rectification of the errors, updates, omissions), and
            safety mechanisms built into the website (including loss/damage of any personal
            data/information, or any loss whether foreseen, foreseeable, known or otherwise). Kamdar
            and/or any of its affiliates will not be liable for any consequential, incidental
            damage, whether direct or indirect, arising out of the use of the website.
          </p>

          <p className="mt-4">
            Contents of the website have not been investigated or verified and are not continuously
            monitored. The Company reserves all rights to disclose information as it deems necessary
            to satisfy any applicable law, or refuse to disclose, edit, or to remove any content or
            information or materials, in whole or in part, at its sole discretion.
          </p>

          <p className="mt-4 font-bold">Submission</p>
          <p>
            All information submitted to Kamdar via this site shall be deemed (and remain) the
            property of Kamdar, which shall be free to use, for any purpose, any ideas, concepts,
            know-how or techniques contained in information, a visitor to this site provides Kamdar
            through this site. Kamdar shall not be subject to any obligations of confidentiality or
            privacy regarding information submitted, except as agreed by Kamdar or as otherwise
            specifically agreed or required by law.
          </p>

          <p className="mt-4 font-bold">Third Party Links</p>
          <p>
            Links to third party websites on the website are provided solely for your convenience.
            If You use these links, You leave the website. We have not reviewed all of these third
            party websites. We do not control and are not responsible for these third party websites
            or their content or availability. We therefore do not endorse or make any representations
            about any of the third party websites, or any material found there, or any results that
            may be obtained from using them. If You decide to access any of the third party websites
            linked to the website, You do so entirely at your own risk.
          </p>

          <p className="mt-4 font-bold">We are not responsible for viruses</p>
          <p>
            We do not guarantee that our site will be secure or free from bugs or viruses. You are
            responsible for configuring your information technology, computer programs and platform
            to access our site. You should use your own virus protection software.
          </p>

          <p className="mt-4 font-bold">Variations and modifications</p>
          <p>
            These terms and conditions are subject to change at any time without notice and even
            after any such change, will not alter the obligation of the user.
          </p>
          <p>
            We reserve the right at any time, and from time to time, to update, revise, supplement
            and otherwise modify these Terms and Conditions and to impose new and/or additional
            rules, policies, terms and/or conditions on your use of the website. They will be
            effective immediately and incorporated into these Terms and Conditions. Your continued
            use of the website constitutes your acceptance of all terms.
          </p>

          <p className="mt-4 font-bold">Governing laws and jurisdiction</p>
          <p>
            Your use of the Company website, its content, services and/or any information/material
            posted or available on this website, shall be governed by the law of the United Arab
            Emirates and you agree to submit to the exclusive jurisdiction of the courts of the
            United Arab Emirates.
          </p>

          <p className="mt-4 font-bold">Disclaimer</p>
          <p>
            No representation or warranty of any kind whatsoever is given, express or implied, for
            the accuracy, correctness, completeness, fitness to the purpose or non-infringement of
            any content or any other information or material posted or available on the website. Any
            tangible or intangible harm/damage or any consequential or incidental damage thereof of
            any kind to the user, by accessing the website and/or any breach of the undertaking, is
            entirely at the user's own risk.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Term;
