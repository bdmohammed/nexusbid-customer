// import Image from "next/image";

// export default function ContactInfo() {
//   return (
//     <div className="space-y-6">

//       <div
//         className="
//         bg-(--surface)
//         border
//         border-(--border)
//         rounded-2xl
//         p-6
//       "
//       >
//         <h3 className="font-semibold text-xl mb-6">
//           Get in Touch
//         </h3>

//         <InfoItem
//           title="Global HQ"
//           value="401 Congress Ave, Suite 1540 Austin, TX 78701 USA"
//         />

//         <InfoItem
//           title="Support Email"
//           value="support@nexusbid.io"
//         />

//         <InfoItem
//           title="Phone Number"
//           value="+1 (512) 555-0198"
//         />

//         <InfoItem
//           title="Office Hours"
//           value="Mon - Fri, 8AM - 6PM"
//         />
//       </div>

//       <div
//         className="
//         relative
//         overflow-hidden
//         rounded-2xl
//         border
//         border-(--border)
//         h-65
//       "
//       >
//         <Image
//           src="/contact/contact-office.png"
//           alt="Office"
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div
//         className="
//         bg-[var(--surface)]
//         border
//         border-[var(--border)]
//         rounded-2xl
//         p-6
//       "
//       >
//         <h4 className="font-semibold">
//           Looking for immediate answers?
//         </h4>

//         <p className="mt-2 text-sm text-[var(--muted)]">
//           Browse enterprise documentation.
//         </p>
//       </div>

//     </div>
//   );
// }

// function InfoItem({ title, value }) {
//   return (
//     <div className="mb-5">
//       <p className="text-xs text-(--muted) uppercase">
//         {title}
//       </p>

//       <p className="mt-1">
//         {value}
//       </p>
//     </div>
//   );
// }

import Image from "next/image";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div
        className="
          bg-[var(--surface)]
          border
          border-[var(--border)]
          rounded-2xl
          p-8
        "
      >
        <h3
          className="
            text-3xl
            font-bold
            text-[var(--foreground)]
            mb-8
          "
        >
          Get in Touch
        </h3>

        <InfoItem
          image="/contact/area.png"
          title="GLOBAL HQ"
          value="401 Congress Ave, Suite 1540 Austin, TX 78701, USA"
        />

        <InfoItem
          image="/contact/mail.png"
          title="SUPPORT EMAIL"
          value="support@nexusbid.io"
        />

        <InfoItem
          image="/contact/call.png"
          title="PHONE NUMBER"
          value="+1 (512) 555-0198"
        />

        <InfoItem
          image="/contact/time.png"
          title="OFFICE HOURS"
          value="Mon - Fri: 8:00 AM - 6:00 PM CST"
        />
      </div>

      {/* Office Image */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[var(--border)]
          h-[260px]
        "
      >
        <Image
          src="/contact/contact-office.png"
          alt="Office"
          fill
          className="object-cover"
        />
      </div>

      {/* Help Card */}

      <div
        className="
          bg-[var(--surface)]
          border
          border-[var(--border)]
          rounded-2xl
          p-6
        "
      >
        <h4
          className="
            font-semibold
            text-[var(--foreground)]
          "
        >
          Looking for immediate answers?
        </h4>

        <p
          className="
            mt-2
            text-sm
            text-[var(--muted)]
          "
        >
          Browse enterprise documentation.
        </p>
      </div>
    </div>
  );
}

interface InfoItemProps {
  image: string;
  title: string;
  value: string;
}
function InfoItem({ image, title, value }: InfoItemProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
        mb-8
      "
    >
      {/* Icon Box */}

      <div
        className="
          w-12
          h-12
          min-w-12
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          flex
          items-center
          justify-center
        "
      >
        <Image
          src={image}
          alt={title}
          width={18}
          height={18}
          className="object-contain"
        />
      </div>

      {/* Content */}

      <div>
        <h5
          className="
            text-xs
            uppercase
            tracking-[1px]
            text-[var(--muted)]
            font-semibold
            mb-1
          "
        >
          {title}
        </h5>

        <p
          className="
            text-base
            leading-7
            text-[var(--foreground)]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}
