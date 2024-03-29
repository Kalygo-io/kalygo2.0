import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Layout1a from "@/layout/layout1a";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function TermsOfService() {
  return (
    <>
      <Layout1a>
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <p className="text-base font-semibold leading-7 text-blue-600">
              6-15-2023
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-6 text-xl leading-8"></p>
            <div className="mt-10 max-w-2xl mx-auto">
              <p>
                This Terms of Service for the various SaaS products owned and
                developed by CMD Software, Inc. (&quot;Company&quot;,
                &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), describes
                how and why we might collect, store, use, and/or share
                (&quot;process&quot;) your information when you use our services
                (&quot;Services&quot;). Reading this document will help you
                understand your rights and choices. If you do not agree with our
                policies and practices, please do not use our Services. If you
                have any questions or concerns, please contact us.
              </p>
              <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      What personal information do we process?
                    </strong>{" "}
                    When you visit, use, or navigate our Services, we may
                    process personal information depending on how you interact
                    with CMD Software, Inc. products such as Kalygo and Kalygo
                    2.0. View our privacy policy for more information regarding
                    how personal information is stored and processed.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Do we process any sensitive personal information?
                    </strong>{" "}
                    If documents containing sensitive personal information are
                    uploaded then yes.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Do we receive any information from third parties?
                    </strong>{" "}
                    We may receive information from public databases, marketing
                    partners, social media platforms, and other outside sources.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      How do we process your information?
                    </strong>{" "}
                    We process your information to provide, improve, and
                    administer our Services, communicate with you, for security
                    and fraud prevention, and to comply with law. We may also
                    process your information for other purposes with your
                    consent. We process your information only when we have a
                    valid legal reason to do so that falls within the realm of
                    operating, developing, and delivering the marketed services
                    offered. Please contact us if you have any questions or
                    concerns.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      In what situations and with which parties do we share
                      personal information?
                    </strong>{" "}
                    We may share information with specific third parties. Learn
                    more about when and with whom we share user data in our
                    privacy policy.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      What are your rights?
                    </strong>{" "}
                    Depending on where you are located geographically, the
                    applicable privacy law may mean you have certain rights
                    regarding your personal and sensitive data.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      How do you exercise your rights?
                    </strong>{" "}
                    The easiest way to exercise your rights is by submitting a
                    data subject access request, or by contacting us. We will
                    consider and act upon any request in accordance with
                    applicable data protection laws.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                We operate the websites https://kalygo.io and https://kalygo2.io
                as well other related products and services that refer or link
                to these legal terms.
              </p>
              <p className="mt-8">
                You can contact us by email at legal@cmdlabs.io, or by mail at
                225 NE 59th St, Miami, FL, 33137, USA, Miami, FL 33137, United
                States.
              </p>
              <p className="mt-8">
                These legal terms constitute a legally binding agreement made
                between you, whether personally or on behalf of an entity, and
                CMD Software, Inc. concerning your access to and use of the
                Services. You agree that by accessing the Services, you have
                read, understood, and agreed to be bound by all of these terms.
                IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
                EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                DISCONTINUE USE IMMEDIATELY.
              </p>
              <p className="mt-8">
                We will provide you with prior notice of any scheduled changes
                to the Services you are using. Changes to legal terms will
                become effective seven days after the notice is given, except if
                the changes apply to new functionality, security updates, bug
                fixes, and a court order, in which case the changes will be
                effective immediately. By continuing to use the Services after
                the effective date of any changes, you agree to be bound by the
                modified terms. If you disagree with such changes, you may
                terminate Services as per the section &quot;TERM AND
                TERMINATION&quot;.
              </p>
              <p className="mt-8">
                The Services are intended for users who are at least 18 years
                old. Persons under the age of 18 are not permitted to use or
                register for the Services.
              </p>
              <p className="mt-8">
                We recommend that you print a copy of these legal terms for your
                records.
              </p>
            </div>
            <div className="mt-16 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Table of Contents
              </h2>
              <ul className="mt-8">
                <li>1. Our Services</li>
                <li>2. Intellectual Property Rights</li>
                <li>3. User Representations</li>
                <li>4. User Registration</li>
                <li>5. Purchases and Payment</li>
                <li>6. Free Trial</li>
                <li>7. Cancellation</li>
                <li>8. Prohibited Activities</li>
                <li>9. User Generated Contributions</li>
                <li>10. Contribution License</li>
                <li>11. Guidelines for Reviews</li>
                <li>12. Social Media</li>
                {/* <li>13. 3rd-party Websites and Content</li>
              <li>14. Advertisers</li>
              <li>15. Services Management</li>
              <li>16. Privacy Policy</li>
              <li>17. Copyright Infringements</li>
              <li>18. Term and Termination</li>
              <li>19. Midofications and Interruptions</li>
              <li>20. Governing Law</li>
              <li>21. Dispute Resolution</li>
              <li>22. Corrections</li>
              <li>23. Disclaimer</li>
              <li>24. Limitations of Liability</li>
              <li>25. Indemnification</li>
              <li>24. User Data</li> */}
              </ul>

              <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">1.</strong>{" "}
                  </span>
                  The information provided when using the Services is not
                  intended for distribution to or use by any person or entity in
                  any jurisdiction or country where such distribution or use
                  would be contrary to law or regulation or which would subject
                  us to any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Services from other locations do so on their own initiative
                  and are solely responsible for compliance with local laws, if
                  and to the extent local laws are applicable.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">2.</strong>
                  </span>
                  We are the owner or the licensee of all intellectual property
                  rights in our Services, including all source code, databases,
                  functionality, software, website designs, audio, video, text,
                  photographs, and graphics, in the Service, as well as the
                  trademarks, service marks, and logos contained therein unless
                  otherwise specified. Content and marks are protected by
                  copyright and trademark law and treaties in the United States
                  and around the world. Content and marks are provided in or
                  through the services for personal, non-commercial use or
                  internal business purpose only. While many components of the
                  source code powering Kalygo are available to be audited and
                  reused under open source licensing as long as use does not
                  infringe upon specific clauses within these terms, CMD
                  Software, Inc. waives liability for any damages arising from
                  valid open source reuse of the software components made
                  available on the relevant company .git repos.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">3.</strong>{" "}
                  </span>
                  By using the services you represent and warrant that: (1) all
                  registration information will be true, accurate, current, and
                  complete; (2) you will maintain the accuracy of such
                  information and promptly update such registration information
                  as necessary; (3) you have the legal capacity and you agree to
                  comply with these Legal Terms; (4) you are not a minor in the
                  jurisdiction in which you reside; (5) you will not access the
                  Services through automated or non-human means, whether through
                  a bot, script or otherwise; (6) you will not use the Services
                  for any illegal or unauthorized purpose; and (7) your use of
                  the Services will not violate any applicable law or
                  regulation. If you provide any information that is untrue,
                  inaccurate, not current, or incomplete, we have the right to
                  suspend or terminate your account and refuse any and all
                  current or future use of the Services (or any portion
                  thereof).
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">4.</strong>{" "}
                  </span>
                  You may be required to register to use the Services. You agree
                  to keep your password confidential and will be responsible for
                  all use of your account and password. We reserve the right to
                  remove, reclaim, or change a username (or email) you select if
                  we determine, in our sole discretion, that such username is
                  inappropriate, obscene, or otherwise objectionable.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">5.</strong>{" "}
                  </span>
                  We accept the following forms of payment: Visa, Mastercard,
                  American Express, Discover, PayPal, ALGO, BTC, and ETH. You
                  agree to provide current, complete, and accurate purchase and
                  account information for all the purchases and/or subscriptions
                  made via the Services. You further agree to promptly update
                  account and payment information, including email address,
                  payment method, and payment card expiration date, so that we
                  can complete your transactions and contact you as needed.
                  Sales tax will be added to the price of purchases as deemed
                  required by us. We may change prices at any time. All payments
                  shall be in US dollars. You agree to pay all charges at the
                  prices then in effect for your purchases and any applicable
                  shipping fees, and you authorize us to charge your chosen
                  payment provider for any such amounts upon placing your order.
                  If your order is subject to recurring charges, then you
                  consent to our charging your payment method on a recurring
                  basis without requiring your prior approval for each recurring
                  charge, until such time as you cancel the applicable order. We
                  reserve the right to correct any errors or mistakes in
                  pricing, even if we have already requested or received
                  payment. We reserve the right to refuse any order placed
                  through the Services. We may, in our sole discretion, limit or
                  cancel quantities purchased per person, per household, or per
                  order. These restrictions may include orders placed by or
                  under the same customer account, the same payment method,
                  and/or orders that use the same billing or shipping addresses.
                  We reserve the right to limit or prohibit orders that, in our
                  sole judgment, appear to be placed by dealers, resellers, or
                  distributors.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">6.</strong>{" "}
                  </span>
                  We will offer a 30-day free trial to new users who register
                  with the Services. The account will be charged according to
                  the user&apos;s chosen subscription at the end of the free
                  trial.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">7.</strong>{" "}
                  </span>
                  You can cancel your subscription at any time by logging into
                  your account. Your cancellation will take effect at the end of
                  the current paid term. If you are unsatisfied with our
                  Services, please provide us with feedback. You can also email
                  us at help@cmdlabs.io if you have issues cancelling your
                  account.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">8.</strong>{" "}
                  </span>
                  You may not access or use the Services for any purpose other
                  than that for which we make the Services available. The
                  Services may not be used in connection with any commercial
                  endeavors except those that are specifically endorsed or
                  approved by us.
                  <br />
                  <br />
                  As a user of the Services, you agree not to:
                  <br />
                  <br />
                  - systematically retrieve data or other content from the
                  Services to create or compile a collection, compilation,
                  database, or directory without written permission from us.
                  <br />
                  - Trick or defraud, or mislead us and other users, especially
                  in any attempt to learn sensitive account information such as
                  user passwords.
                  <br />
                  - Circumvent, disable, or otherwise interfere with
                  security-related features of the Services, including features
                  that prevent or restrict the use or copying of any Content or
                  enforce limitations on the use of the Services and/or the
                  Content contained therein.
                  <br />
                  - Disparage, tarnish, or otherwise harm, in our opinion, us
                  and/or the Services.
                  <br />
                  - Use any information obtained from the Services in order to
                  harass, abuse, or harm another person.
                  <br />
                  - Make improper use of our support services or submit false
                  reports of abuse or misconduct.
                  <br />
                  - Use the Services in a manner inconsistent with any
                  application laws or regulations.
                  <br />
                  - Engage in unauthorized framing of or linking to the
                  Services.
                  <br />
                  - Upload or transmit (or attempt to upload or to transmit)
                  viruses, Trojan horses, or other material, including excessive
                  use of capital letters and spamming (continuous posting of
                  repetitive text), that interferes with any party&apos;s
                  uninterrupted use and enjoyment of the Service or modifies,
                  impairs, disrupts, alters, or interferes with the use,
                  features, functions, operation, or maintenance, of the
                  Services.
                  <br />
                  - Engage in any automated use of the system, such as using
                  scripts to send comments or message, or using any data mining,
                  robots, or similar data gathering and extraction tools.
                  <br />
                  - Delete the copyright or other proprietary rights notice from
                  any Content.
                  <br />
                  - Attempt to impersonate another user or person or use the
                  username of another user.
                  <br />
                  - Upload or transmit any material that acts as a passive or
                  active information collection or transmission mechanism,
                  including without limitation, clear graphic interchange
                  formats (gifs), 1x1 pixels, web bugs, cookies, or other
                  similar devices referred to as spyware or pcms.
                  <br />
                  - Interfere with, disrupt, or create an undue burden on the
                  Service or the networks or services connected to the Service.
                  <br />
                  - Harass, annoy, intimidate, or threaten any of our employees
                  or agents engaged in providing any portion of the Services to
                  you.
                  <br />
                  - Attempt to bypass any measure of the Services designed to
                  prevent or restrict access to the Service, or any portion of
                  the Services.
                  <br />
                  - Copy or adapt the software powering the Kalygo or Kalygo 2.0
                  platform, unless otherwise allowed through Open Source
                  licensing.
                  <br />
                  - Except as permitted by applicable law, decipher, decompile,
                  disassemble, or reverse engineer any of the software
                  comprising or in any way making up a part of the Services.
                  <br />
                  - Except as may be the result of standard search engine or
                  Internet browser usage, use, launch, develop, distribute any
                  automated system, including without limitation, any spider,
                  robot, cheat utility, scraper, or offline reader that accesses
                  the Services, or use or launch any unauthorized script or
                  other software.
                  <br />
                  - Use a buying agent or purchasing agent to make purchases on
                  the Services.
                  <br />
                  - Make any unauthorized use of the Services, including
                  collecting usernames and/or email addresses of users by
                  electronic or other means for the purpose of sending
                  unsolicited email, or creating user accounts by automated
                  means or under false pretenses
                  <br />- Use the Services as part of any effort to compete with
                  us or otherwise use the Services and/or the Content for any
                  revenue-generating endeavor or commercial enterprise
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">9.</strong>{" "}
                  </span>
                  The Services may invite you to chat, contribute to , or
                  participate in blogs, message boards, online forums, and other
                  functionality and may provide you with the opportunity to
                  create, submit, post, display, transmit, perform, publish,
                  distribute, or broadcast content and materials to us or on the
                  Services, including but not limited to text, writings, video,
                  audio, photographs, graphics, comments, suggestions, or
                  personal information or other material (collectively,
                  &quot;Contributions&quot;). Contributions may be viewable by
                  other users of the Services and through third-party website.
                  As such, any Contributions your transmit may be treated as
                  non-confidential and non-proprietary. When you create or make
                  available any Contributions, you thereby represent and warrant
                  that:
                  <br />
                  <br />
                  - The creation, distribution, transmission, public display, or
                  performance, and the accessing, downloading, or copying of
                  your Contributions do not and will not infringe the
                  proprietary rights, including but not limited to the
                  copyright, patent, trademark, trade secret, or moral rights of
                  any third party.
                  <br />
                  - You are the creator and owner of or have the necessary
                  licenses, rights, consents, releases, and permissions to use
                  and to authorize us, the Services and other users of the
                  Services to use your Contributions in any manner contemplated
                  by the Services and these Legal Terms.
                  <br />
                  - You have the written consent, release, and/or permission of
                  each and every identifiable individual person in your
                  Contributions to use the name or likeness of each and every
                  such identifiable individual person to enable inclusion and
                  use of your Contributions in any manner contemplated by the
                  Services and these Legal Terms.
                  <br />
                  - Your Contributions are not false, inaccurate, or misleading.
                  <br />
                  - Your Contributions are not unsolicited or unauthorized
                  advertising, promotional materials, pyramid schemes, chain
                  letters, spam, mass mailings, or other forms of solicitation.
                  <br />
                  - Your Contributions are not obscene, lewd, lascivious,
                  filthy, violent, harassing, libelous, slanderous, or otherwise
                  objectionable (as determined by us).
                  <br />
                  - Your Contributions do not ridicule, mock, disparage,
                  intimidate, or abuse anyone.
                  <br />
                  - Your Contributions are not used to harass or threaten (in
                  the legal sense of those terms) any other person and to
                  promote violence against a specific person or class of people.
                  <br />
                  - Your Contributions do not violate any applicable law,
                  regulation, or rule.
                  <br />
                  - Your Contributions do not violate the privacy or publicity
                  rights of any third party.
                  <br />
                  - Your Contributions do not violate any applicable law
                  concerning child pornography, or otherwise intended to protect
                  the health or well-being of minors.
                  <br />
                  - Your Contributions do not include any offensive comments
                  that are connected to race, national origin, gender, sexual
                  preference, or physical handicap.
                  <br />
                  - Your Contributions do not otherwise violate, or link to
                  material that violates, any provision of these Legal Terms, or
                  any applicable law or regulation.
                  <br />
                  Any use of the Services in violation of the foregoing violates
                  these Legal Terms and may result in, among other things,
                  termination or suspension of your rights to use the Services.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">10.</strong>{" "}
                  </span>
                  By posting your Contributions to any part of the Services or
                  making Contributions accessible to the Services by linking
                  your account from the Services to any of your social
                  networking accounts, you automatically grant, and you
                  represent and warrant that you have the right to grant, to us
                  an unrestricted, unlimited, irrevocable, perpetual,
                  non-exclusive, transferable, royalty-free, fully-paid,
                  worldwide right, and license to host, use, copy, reproduce,
                  disclose, sell, resell, publish, broadcast, retitle, archive,
                  store, cache, publicly perform, publicly display, reformat,
                  translate, transmit, excerpt (in whole or in part), and
                  distribute such Contributions (including, without limitation,
                  your image and voice) for any purpose, commercial,
                  advertising, or otherwise, and to prepare derivative works of,
                  or incorporate into other works, such Contributions, and grant
                  and authorize sublicenses of the foregoing. The use and
                  distribution may occur in any media formats and through any
                  media channels.
                  <br />
                  <br />
                  This license will apply to any form, media, or technology now
                  known or hereafter developed, and includes our use of your
                  name, company name, and franchise name, as applicable, and any
                  of the trademarks, service marks, trade names, logos, and
                  personal and commercial images you provide. You waive all
                  moral rights in your Contributions, and you warrant that moral
                  rights have not otherwise been asserted in your Contributions.
                  <br />
                  <br />
                  We do not assert any ownership over your Contributions. You
                  retain full ownership of all of your Contributions and any
                  intellectual property rights or other proprietary rights
                  associated with your Contributions. We are not liable for any
                  statements or representations in your Contributions provided
                  by you in any area on the Services. You are solely responsible
                  for your Contributions to the Services and you expressly agree
                  to exonerate us from any and all responsibility and to refrain
                  from any legal action against us regarding your Contributions.
                  <br />
                  <br />
                  We have the right, in our sole and absolute discretion, (1) to
                  edit, redact, or otherwise change any Contributions; (2) to
                  re-categorize any Contributions to place them in more
                  appropriate locations on the Services; and (3) to pre-screen
                  or delete any Contributions at any time and for any reason,
                  without notice. We have no obligation to monitor your
                  Contributions.
                </li>

                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">11.</strong>{" "}
                  </span>
                  We may provide you areas on the Services to leave review or
                  ratings. When posting a review, you must comply with the
                  following criteria: (1) you should have firsthand experience
                  with the person/entity being reviewed; (2) your reviews should
                  not contain offensive profanity, or abusive, racist,
                  offensive, or hateful language; (3) your reviews should not
                  contain discriminatory references based on religion, race,
                  gender, national origin, age, marital status, sexual
                  orientation, or disability; (4) your reviews should not
                  contain references to illegal activity; (5) you should not be
                  affiliated with competitors if posting negative reviews; (6)
                  you should not make any conclusions as to the legality of
                  conduct; (7) you may not post any false or misleading
                  statements; and (8) you may not organize a campaign
                  encouraging others to post reviews, whether positive or
                  negative.
                  <br />
                  <br />
                  We may accept, reject, or remove reviews in our sole
                  discretion. We have absolutely no obligation to screen reviews
                  or to delete reviews, even if anyone considers reviews
                  objectionable or inaccurate. Reviews are not endorsed by us,
                  and do not necessarily represent our opinions or the views of
                  any of our affiliates or partners. We do not assume liability
                  for any review or for any claims, liabilities, or losses
                  resulting from any review. By posting a review, you hereby
                  grant to us a perpetual, non-exclusive, worldwide,
                  royalty-free, fully paid, assignable, and sublicensable right
                  and license to reproduce, modify, translate, transmit by any
                  means, display, perform, and/or distribute all content
                  relating to review.
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    className="mt-1 h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">12.</strong>{" "}
                  </span>
                  As part of the functionality of the Services, you may link
                  your account with online accounts you have with third-party
                  service providers (each such account, a &quot;Third-Party
                  Account&quot;) by either: (1) providing your Third-Party
                  Account login information through the Services; or (2)
                  allowing us to access your Third-Party Account, as is
                  permitted under the applicable terms and conditions that
                  govern your use of each Third-Party Account. You represent and
                  warrant that you are entitled to disclose your Third-Party
                  Account login information to us and/or grant us access to your
                  Third-Party Account, without breach by you of any of the terms
                  and conditions that govern your use of the applicable
                  Third-Party Account, and without obligating us to pay any fees
                  or making us subject to any usage limitations imposed by the
                  third-party service provider of the Third-Party Account. By
                  granting us access to any Third-Party Account, you understand
                  that (1) we may access, make available, and store (if
                  applicable) any content that you have provided to and stored
                  in your Third-Party Account (the &quot;Social Network
                  Content&quot;) that you have provided to and stored in you
                  Third-Party Account (the &quot;Social Network Content&quot;)
                  so that it is available on and through the Services via your
                  account, including without limitation any friend lists and (2)
                  we may submit to and recieve from your Third-Party Account
                  additional information to the extent your are notified when
                  you link your account with the Third-Party Account. Depending
                  on the Third-Party Accounts you choose and subject to the
                  privacy settings that you have set in such Third-Party
                  Accounts, personally identifiable information that you post to
                  your Third-Party Account may be avilable on and through your
                  account on the Serivces. Please note that if a Third-Party
                  Account or associated service becomes inabailable or our
                  access to such Third-Party Account is terminated bu the
                  third-party service provider, then Social Network Content may
                  no longer be avialble on and through the ervice. You will have
                  the ability to disable the connection between your account on
                  the Services and your Thrid-Party Account at any time. PLEASE
                  NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE
                  PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNT IS GOVERNED
                  SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE
                  PROVIDERS. We make no effort to review any Social Network
                  Content for any purpose, including but not limited to, for
                  accuracy, legality or non-infringement, and we are not
                  responsible for any Social Network Content. You acknowledge
                  and agree that we may access your email address book
                  associated with a Third-Party Account and your contact list
                  stored on your mobile device or table computer solely for
                  purposes of indentifying and informing you of those contacts
                  who have also registered to use the services. You can
                  deactivate the connection between the Services and your
                  Third-Party Account by contacting us using the contact
                  information below or through your account settings (if
                  applicable). We will attempt to delete any information stored
                  on our servers that was obtained through such Third-Party
                  Account, except the username and profile picture that become
                  associated with your account.
                </li>
                {/* 
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">13.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">14.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">15.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">16.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">17.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">18.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">19.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">20.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">21.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">22.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">23.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">24.</strong>{" "}
                </span>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      </Layout1a>
    </>
  );
}
