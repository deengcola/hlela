import { ImageResponse } from "next/og";

export const alt = "Hlela — Compare & Book Event Hire in South Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              color: "#0d9488",
            }}
          >
            Hlela
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#1a1a1a",
              fontWeight: 600,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            Compare & book event hire in South Africa
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#6b7280",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Stop chasing quotes. Compare, book, done.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
