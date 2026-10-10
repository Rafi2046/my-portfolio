import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The card shown when the site is shared on LinkedIn, WhatsApp, X and the like.
export const alt = "Ishmak Rahat Rafi — Flutter Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [anton, inter, interMedium, portrait] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Anton-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Inter-400.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-500.woff")),
    readFile(join(process.cwd(), "public/rafi-portrait-circle.png")),
  ]);
  const photo = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0b0b0c",
          color: "#f2f2f0",
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        {/* Green glow behind the portrait */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 60,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(34,197,94,0.35), rgba(34,197,94,0) 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a1a1a8" }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#22c55e" }} />
            Available for new projects
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Anton", fontSize: 150, lineHeight: 0.9, textTransform: "uppercase" }}>Ishmak</div>
            <div style={{ fontFamily: "Anton", fontSize: 150, lineHeight: 0.9, textTransform: "uppercase" }}>Rafi</div>
            <div style={{ marginTop: 28, fontSize: 36, fontWeight: 500, color: "#22c55e" }}>Flutter Developer · iOS &amp; Android</div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#a1a1a8" }}>
            4 apps live on the stores · 1,500+ commits
          </div>
        </div>

        <img
          src={photo}
          alt=""
          width={400}
          height={400}
          style={{ alignSelf: "center", borderRadius: 9999, border: "6px solid rgba(255,255,255,0.08)" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Inter", data: inter, style: "normal", weight: 400 },
        { name: "Inter", data: interMedium, style: "normal", weight: 500 },
      ],
    },
  );
}
