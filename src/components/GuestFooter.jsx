import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
} from "react-icons/fi";

export default function GuestFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="contact"
      className="border-t border-[#E7E0D8] bg-[#2D2723] text-white"
    >
      <div className="mx-auto max-w-[1320px] px-6 py-14">

        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[14px] bg-[#B49455] text-[22px] font-semibold text-white">
                H
              </div>

              <div>
                <h2 className="font-serif text-[24px]">
                  Hejmana Boutique
                </h2>

                <p className="text-[12px] tracking-[0.18em] text-[#D8C8A5] uppercase">
                  Premium Fashion
                </p>
              </div>
            </div>

            <p className="mt-5 text-[13px] leading-7 text-[#D5D0CB]">
              Hejmana Boutique menghadirkan koleksi fashion premium
              dengan sentuhan elegan dan modern untuk melengkapi
              gaya terbaik Anda.
            </p>

            <div className="mt-6 flex gap-3">
              <SocialButton icon={<FiInstagram />} />
              <SocialButton icon={<FiFacebook />} />
              <SocialButton icon={<FiTwitter />} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[17px] font-medium">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-[13px] text-[#D5D0CB]">
              <FooterLink href="#home" label="Home" />
              <FooterLink href="#about" label="About Boutique" />
              <FooterLink href="#products" label="Products" />
              <FooterLink href="#promo" label="Promo" />
              <FooterLink href="#membership" label="Membership" />
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-[17px] font-medium">
              Our Services
            </h3>

            <ul className="mt-5 space-y-3 text-[13px] text-[#D5D0CB]">
              <li>Exclusive Collections</li>
              <li>Personal Styling</li>
              <li>VIP Membership</li>
              <li>Gift Packaging</li>
              <li>Fashion Consultation</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[17px] font-medium">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-[13px] text-[#D5D0CB]">

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-[#D8C8A5]" />

                <p>
                  Jl. Fashion Avenue No. 88
                  <br />
                  Jakarta, Indonesia
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-[#D8C8A5]" />

                <p>+62 812 3456 7890</p>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-[#D8C8A5]" />

                <p>hello@hejmana.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 border-t border-[#4B433E]" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

          <p className="text-[12px] text-[#C9C2BC]">
            © 2026 Hejmana Boutique.
            All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-[12px] bg-[#B49455] px-4 py-2 text-[12px] transition hover:bg-[#A6854A]"
          >
            <FiArrowUp />

            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ==========================
   COMPONENTS
========================== */

function SocialButton({ icon }) {
  return (
    <button
      type="button"
      className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#3D3632] text-[16px] transition hover:bg-[#B49455]"
    >
      {icon}
    </button>
  );
}

function FooterLink({ href, label }) {
  const handleClick = () => {
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="transition hover:text-[#D8C8A5]"
      >
        {label}
      </button>
    </li>
  );
}
