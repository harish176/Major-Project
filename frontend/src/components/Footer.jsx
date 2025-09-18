import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 grid md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-base">CONTACT</h3>
          <p className="leading-snug">
            Address: Link Road Number 3, Near Kali Mata Mandir, Bhopal, Madhya
            Pradesh, India 462003
          </p>
          <p>Telephone: +91 755 4051000, 4052000</p>
          <p>FAX: +91-755 2670562</p>
        </div>

        {/* Right Section */}
        <div className="space-y-1 md:text-right">
          <p>
            Email:{" "}
            <span className="text-gray-400">manit@gmail.com</span>,{" "}
            <span className="text-gray-400">
              director@manit.ac.in
            </span>
          </p>
          <p>
            Web:{" "}
            <a
              href="https://www.manit.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              www.manit.ac.in
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex md:justify-end gap-3 pt-1">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaGoogle />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-center py-2 text-xs text-gray-400">
        © {new Date().getFullYear()} All Rights Reserved | Terms of Use and
        Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
