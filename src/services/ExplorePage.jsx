// ExplorePage.jsx
// Explore Services page. Composes all sub-components.

import { useState } from "react";
import ExploreNavBar from "@/Components/Landing/Navbar";
import SearchFilterBar from "@/components/SearchFilterBar";
import ServiceCard from "@/components/ServiceCard";
import ServiceCardWide from "@/components/ServiceCardWide";
import ExploreFooter from "@/Components/Landing/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const INITIAL_CHIPS = [
  { label: "Top Rated", icon: "verified", active: true },
  { label: "Digital Art" },
  { label: "Essay Review" },
  { label: "Apparel Printing" },
  { label: "Moving Help" },
];

const STANDARD_CARDS = [
  {
    id: 1,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9jPhlHCZVQNR83_LZNZqkvB-pfEdf2onZDiyz1-XUbh7YWfEd_S1DTbLgUtxz4Kd3oiDCQ2SJ9QSRXrm5WUQ8IzoAIKHQab64kbGrZzy6suERpnNyfED_btHJvVoKVWT7MGVoDyiegbdavy8VLyIscmsj7v4izROp4fEofGukrPWljnCrH265ueaQzY49H45SMZHFOwNGrjcNhdeEVL59ji4jaULnqyG3lxrniL0fEvey3UzQHaZOmS2CIIib3p2gpMHuyfARZ2Zp",
    imageAlt: "Student graphic designer working on laptop",
    badge: { label: "Top Rated", variant: "secondary" },
    creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeORM5xShtzYqDiDsJc0wnumGfoiU4Q21FT6IBfzPnG3nLolSOdfW_FyoSifRSY2pQY3rlaS8uswT1QvshNBjxy0jrgZVs4oqeNPurpOwtTA-dVrAKe68ziLppbVO4s0qBxEV7zewr84RoRzg0paS_2Z5wMMopiuzrDXzZ-4ScrSkU9xHK971QHiCjM-_TuIuiSKCM8SWUQCsiYsEDIxFMMpVe806llJcTVXjoqkQAYKJ6uEyeuovnDmj7KGAYpkJVvArTtDmdirvY",
    creatorName: "Alex Rivera",
    creatorRole: "Visual Design Major",
    title: "Custom Logo Design for Student Startups",
    rating: 4.9,
    reviewCount: 124,
    price: "$45",
  },
  {
    id: 2,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOUPKZH0HF2_pqwI0KuleC5skpuxduoLYiGYQNbb8UPQ1LrYtusTlQpnF0AWkA3RZ0pms8rt1G4_azplM7hfCl4HElIRktOC_hMV4x6VttIyyvbyzkBxAvSDrpWjMu1JjF8OfqmQMl_lOMx9GdNlJCi56P_aLGnqNra13rYqz_f2pUHjYbCstGypV3iPx61_ig_Uh3RBFQkmq4K6r4_WzPNKyNSbkVC1KR-m16MYCCJT9sMaf1vhUCwwNBChVHSJVzOXL-uzARDNiZ",
    imageAlt: "Students in tutoring session at library",
    badge: { label: "Quick Delivery", variant: "primary" },
    creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEGmAqkRQ-lsKOn0hUyBxN5I1mrSdHtbfRM2iWtWXDxucO_o8PguK-OQhb3_gUhXXhuTYwrT6kq-rgvq_OPn6VN1k_3r25EksxFecrUz4gBb0H1ldzTHMrLrpfD0hYVa2IcEhqvqfbNxe_hXC4gJIuhEiSrSpR5ZB1umoaEiRWbTmzl-s0JQtnE-og5k0S-iJBv219C6KXgVNMZWVVWWKoXmBtAq7-qgi-pcbTqb8b7Itu3t-l3ShyaZzVaHLLWhMzeV-61J6YREXw",
    creatorName: "Maya Chen",
    creatorRole: "Mathematics Senior",
    title: "Advanced Calculus & Physics Tutoring",
    rating: 5.0,
    reviewCount: 89,
    price: "$30",
  },
  {
    id: 3,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtLCqXIeDJ327YS20E5P3Eaws3baKoyJt8yb3y5hGUDSISqRomAMYk19xQR07yUvhF0CXUONzpm3MPio5esQQs9HmgpJkEvt95VRhYgb_88LA8Cfdg0MdfFvlQG9KF8YXRFbZWFJE3gq1pkMx8DNmiRNh-pz5FZvaUJLgdCzSFUENgBdQtRkVLHc7w64izuwB_Q5stEjNG6zK0ChxuDnEh10lsgyyAxhTflgmkgdtBmwFw0dCmJ1yp8AaqPAHPAakNFrx6pPzcVkaw",
    imageAlt: "DSLR camera at golden hour on campus",
    creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnxE49F8DuaHfmwzQIG8IRpb_s4Y2y9t3t0ojX13-RM4OUVwTdyRWcdabg7NHtlWkjeVPJKaG-oewQA67NiibS8O_aknx170QkRJdaNa3ZNS5I8gmrWF8lysRlDz-W5I4Evw5TZu50ootK3vFVcPwxaAX24VLBb_AP0VtqU_I-JNtf6my6JNLKWcQtVMYrA0UzkDdStRIw5N_rlMBe_9q1qCrOw0tV2-gIrU1JTDUnnAzPjQlfuUfU_vc5LcQ7FC4B9Yb1eqJqsCqy",
    creatorName: "Jordan Lee",
    creatorRole: "Journalism & Media",
    title: "Professional Grad Photos & Portraits",
    rating: 4.8,
    reviewCount: 56,
    price: "$75",
  },
  {
    id: 4,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO_7AJOa8CDALVk9xklsUi0LijDlRDnJEEctizuYGiXk7ekVNkVqZn_sJyoHPN2Xt7xR2JXVzPcGRxjt0VDthhUTo8KUCZDtG91eOmU1VncRpGcoa1TLEeIdbfKENBw5tGiTyqlgc6ZCeoiOwq437MPipUFSufe6scSIDJNwY9sGemi6gcY9EMQ2TXSTW0q-_5va3-xzNCg99PZVwYr4i8Fs7Rq1Rc8Y0d09wOUDh0G5tNz9Mh2mO7r_yWhhI-UCy7Kgw3axJUhYtV",
    imageAlt: "Student coder working at night",
    badge: { label: "Top Rated", variant: "secondary" },
    creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAup32IdSdzHaG0BRTCHh4-R3rS08BILEZOHum-4fHHwu3OmN2IFGesS5it42GOaG9fIGvQQeel2lIusBMuuJMOSU3Cq4kR7N4Siz6WkwvyxmdEpiWzRCmuMqJ_WVuXLHSdm8r06VggDj0PWqUdQPrOzfnbFovV9PLI8OkAY65qbSJEwKZQaQg_Te0K23bmdFUwhDM6BfHJGUfqB7fuQXuGdqKrTgZA_74UeKxW9fQScTrkyQ_yf8CW53F40eTwLQMfzEGXrYOnxVTk",
    creatorName: "Sam Wilson",
    creatorRole: "Computer Science Major",
    title: "Full-Stack Web Development & Debugging",
    rating: 4.9,
    reviewCount: 210,
    price: "$60",
  },
  {
    id: 6,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuABksVNJtEGzlvvaKRjiW9ya4hRl3is_Biz5Ofgb-_I8iWO40R44eZIvAK1Enx8BmGXKFa5WQT2hFspb4Egs7uO2G0O7X48cSWAjHQCG88WFO7PRSjTctJjoL1EhE1aMk9m6MawlQdsNME2BURWO1l7EuNE07QsexUvjqr2dao20woMkIpbi2g2j58HDLKslF10TpsIrfVCR8OwEyo8ZH9xmBOGRNch70YC77VwVmUEt4S3PPFbKTKAGv9Y1H4qWXiLsoHS_IrNoACW",
    imageAlt: "Clean study desk with laptop and notebooks",
    creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUW_sAb5RwQd4j7hfe_qMUQC-MFj9jFU8o_HbNVBzLuaW2Dch79YjVYKLA1k22VxxPeRPSDlwLqLROVsnQg7giUmmyIBSpU-6l-FnsXqJbzb_-BTdZT373mPSL2b_BhhZ5j4UZz9sXaX7E7ltaeFZvFZ5Ie3DbmO4iXdLM6rhcpJY0bA4DSv7fwZ8yZb6k8TqmiMIpNXltcIcL6-fMD5PU6gQauKPHDOfCkmI48fqvfEPM3r8wIwaABHhm6FkAQ2lOLOeUcr66Ox4q",
    creatorName: "Elena Rossi",
    creatorRole: "English Literature PhD Candidate",
    title: "Thesis Proofreading & Essay Polishing",
    rating: 5.0,
    reviewCount: 18,
    price: "$40",
  },
  {
    id: 7,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNJzqGsc-hRHnUt3TGzYEspWdfa3A-BpgGNaaC4Geh_X4btfth-dvjyqU3v-iPHXCBZumAgRHJBFv7ML4KGQvGDsJHmS9ojpVS5y1csqJTZuJ_d7QIlhFHT7spU6wojPgEhdRMbQRq1jf6Ktw7HmGrWYTZFy7ypAhladHzTAf3DCQV1-L27bokM-C76VbCdECZ-FvcvfAvrvS9rRndz0iHM_kn_0-117BZRJrbfiJQ4hDhp2MAXVj8f9T-f3UbwbXTivrfhw01kxo0",
    imageAlt: "Student music producer studio",
    creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtlxCqHFCP3Hy3b4JatWYApgVT-3JsKEbFQYEi5rN_-gSyL2TyXJ5mz4fW6KbDLlWjWaLwStqnpznVcWIudTn8DzZzPvqUiV4zLUjx3CZa4zat_vnQqFPFdrvNSLWWklHuAABF0hNFI-rJjk3hZTxrL6QU966-RtgTBwbVb4-j8muiKMJOrDyshRl8_MFy12kDT3vbKVEnDeaDpawysPaMMXnRQ_CFMBWhZxO4zioUmRO5vTOjnJ4LWJzjQwzLc7UJMUr0TLeXZ2kE",
    creatorName: "Leo Kim",
    creatorRole: "Music Production Major",
    title: "Beat Making & Professional Audio Mixing",
    rating: 4.9,
    reviewCount: 32,
    price: "$55",
  },
];

const WIDE_CARD = {
  imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSHl56krGY2ho5UVpCHVf3qtFQW2bP7d1QM01OR0RiveSlQz51qvftSOeL8V-Cgi0yVs4zXc0_b8fwMn1UlDoQ5vpMM8it2VIHodK33MMsNqr2kJzZ2Gt7pIJvqm-ioHSoOWGjkSRuhU6tUYJ0Z3j6L97c6rkx7qZ2Ua2HCsgw7jWtgppRMGzHCf6qyeA8bNFZ5C9ETgbjF_lkdRKydehUEQy3GO-UhPgp-uWALsXYRzQtuyacQv2PiO6j3YRs9kH-yWxuteMV9hTX",
  imageAlt: "Students helping during move-in day",
  creatorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL2DmwCJVXSrAVsQa0qx4S8ae-KB6bgPOXCEQUE3Hhhth6uBG7GpZcTSybEL2QUYLlVxh3q6mE3DgycgGhd-gWBLBxQPkCNRcmwqLYs3LQOECfF8gO38PQA0MOq7zGm9SwF8SR4_Inb2RI4aiXUbV5VhHsqLALo5yFXMVYdULUgv5UqWsHIur-tlgcaoFCt9f60WvsBFAYf-WCfYam-N9SPhXsRvn_Ijq6Pdrv-3DesUQ3R7JpOGqJORuLh3jxlHTpPUlSzQnigXgO",
  creatorName: "Jake O'Connor",
  creatorRole: "Kinesiology Sophomore",
  title: "Stress-Free Moving & Setup Service",
  description: "Heavy lifting, furniture assembly, and dorm room optimization. Fast and reliable help from a fellow student.",
  rating: 4.7,
  reviewCount: 45,
  price: "$25/hr",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [chips, setChips] = useState(INITIAL_CHIPS);

  function handleChipClick(index) {
    setChips((prev) =>
      prev.map((chip, i) => ({ ...chip, active: i === index ? !chip.active : chip.active }))
    );
  }

  // Split cards: first 4 go before wide card, rest after
  const beforeWide = STANDARD_CARDS.slice(0, 4);
  const afterWide = STANDARD_CARDS.slice(4);

  return (
    <div className="bg-surface font-body text-on-surface">
      <ExploreNavBar />

      <main className="pt-24 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-editorial-gradient mb-4 font-display">
            Explore Services
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-body">
            Find help from students around you. Discover curated talent within your campus community
            for everything from design to tutoring.
          </p>
        </header>

        {/* Search + Filters */}
        <SearchFilterBar chips={chips} onChipClick={handleChipClick} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* First 4 standard cards */}
          {beforeWide.map((card) => (
            <ServiceCard key={card.id} {...card} />
          ))}

          {/* Wide bento card */}
          <ServiceCardWide {...WIDE_CARD} />

          {/* Remaining standard cards */}
          {afterWide.map((card) => (
            <ServiceCard key={card.id} {...card} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <button className="bg-surface-container-lowest border border-outline-variant/30 text-primary font-bold px-12 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-md">
            Load More Services
          </button>
          <p className="text-on-surface-variant text-sm font-medium">
            Showing 1–12 of 348 services
          </p>
        </div>
        </div>
      </main>

      <ExploreFooter />
    </div>
  );
}
