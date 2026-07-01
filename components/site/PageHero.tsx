import Image from "next/image";

/**
 * Wiederkehrender Seiten-Hero der Unterseiten: Vollbild-Foto mit
 * Verlaufs-Overlay, atmendem Siegel und Titelblock am unteren Rand.
 */
export default function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  titleItalic = false,
  subtitle,
  height = "62vh",
  minHeight = 460,
  siegelSide = "right",
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  titleItalic?: boolean;
  subtitle?: string;
  height?: string;
  minHeight?: number;
  siegelSide?: "left" | "right";
}) {
  return (
    <section
      style={{
        position: "relative",
        height,
        minHeight,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "#17301f",
      }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="ph"
        style={{ objectFit: "cover", animation: "kb 24s ease-in-out infinite alternate" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(15,28,18,.5),rgba(15,28,18,.2) 40%,rgba(15,28,18,.92))",
        }}
      />
      <Image
        src="/siegel-mark.png"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        style={{
          position: "absolute",
          [siegelSide]: "6%",
          top: "24%",
          width: "min(28vw,300px)",
          height: "auto",
          opacity: 0.14,
          animation: "breathe 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 28px 56px",
          width: "100%",
        }}
      >
        <span className="eyebrow rise1" style={{ color: "#e0c88d" }}>
          {eyebrow}
        </span>
        <h1
          className="rise2"
          style={{
            fontSize: "clamp(40px,6vw,80px)",
            color: "#f7f1e0",
            lineHeight: 1.02,
            marginTop: 14,
            fontStyle: titleItalic ? "italic" : "normal",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="rise3"
            style={{
              fontSize: 19,
              color: "#e2dcc9",
              maxWidth: 580,
              marginTop: 18,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
