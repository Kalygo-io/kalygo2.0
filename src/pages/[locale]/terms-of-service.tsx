import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-blue-600">
            6-14-2023
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-xl leading-8"></p>
          <div className="mt-10 max-w-2xl">
            <p>
              This Terms of Service for the various SaaS products owned and
              developed by CMD Software, Inc. ("Company", "we", "us", or "our"),
              describes how and why we might collect, store, use, and/or share
              ("process") your information when you use our services
              ("Services"). Reading this document will help you understand your
              rights and choices. If you do not agree with our policies and
              practices, please do not use our Services. If you have any
              questions or concerns, please contact us.
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
                  When you visit, use, or navigate our Services, we may process
                  personal information depending on how you interact with CMD
                  Software, Inc. product such as Kalygo and Kalygo 2.0. View our
                  privacy for more information regarding how personal
                  information in stored and processed.
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
                  If documents containing sensitive personal infromation are
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
                  We may receive information from public database, marketing
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
                  process your information for other purposes with your consent.
                  We process your information only when we have a valid legal
                  reason to do so that falls within the realm of operating,
                  developing, and delivering the marketed services offered.
                  Please contact us if you have any questions or concerns.
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
                  We may share information and with specific third parties.
                  Learn more about when and with whom we share user data in our
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
              as well other related products and services that refer or link to
              these legal terms.
            </p>
            <p className="mt-8">
              You can contact us by email at legal@cmdlabs.io, or by mail at 225
              NE 59th St, Miami, FL, 33137, USA, Miami, FL 33137, United States.
            </p>
            <p className="mt-8">
              These legal terms constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity, and CMD
              Software, Inc. concerning your access to and use of the Services.
              You agree that by accessing the Services, you have read,
              understood, and agreed to be bound by all of these terms. IF YOU
              DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
              PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE
              IMMEDIATELY.
            </p>
            <p className="mt-8">
              We will provide you with prior notice of any scheduled changes to
              the Services you are using. Changes to legal terms will become
              effective seven days after the notice is given, except if the
              changes apply to new functionality, security updates, bug fixes,
              and a court order, in which case the changes will be effective
              immediately. By continuing to use the Services after the effective
              date of any changes, you agree to be bound by the modified terms.
              If you disagree with such changes, you may terminate Services as
              per the section "TERM AND TERMINATION".
            </p>
            <p className="mt-8">
              The Services are intended for users who are at least 18 years old.
              Persons under the age of 18 are not permitted to use or register
              for the Services.
            </p>
            <p className="mt-8">
              We recommend that you print a copy of these legal terms for your
              records.
            </p>
          </div>
          <div className="mt-16 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Table of Contents
            </h2>
            <ul>
              <li>1. Our Services</li>
              <li>2. Intellectual Property Rights</li>
              <li>3. User Representations</li>
              <li>4. User Registration</li>
              <li>5. Purchases and Payment</li>
              <li>6. Free Trial</li>
              <li>7. Cancellation</li>
              <li>8. Prohibited Activites</li>
              <li>9. User Generated Contributions</li>
              <li>10. Contribution License</li>
              <li>11. Guidelines for Reviews</li>
              <li>12. Social Media</li>
              <li>13. 3rd-party Websites and Content</li>
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
              <li>24. User Data</li>
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
                The information provided when using the Services is not intended
                for distribution to or use by any person or entity in any
                jurisdiction or country where such distribution or use would be
                contrary to law or regulation or which would subject us to any
                registration requirement within such jurisdiction or country.
                Accordingly, those persons who choose to access the Services
                from other locations do so on their own initiative and are
                solely responsible for compliance with local laws, if and to the
                extent local laws are applicable.
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">2.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">3.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">4.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">5.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">6.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">7.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">8.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">9.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">10.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">11.</strong>{" "}
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  className="mt-1 h-5 w-5 flex-none text-blue-600"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-gray-900">12.</strong>{" "}
                </span>
              </li>
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
