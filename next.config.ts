import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 keeps text inside the phone mockups sharp.
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
