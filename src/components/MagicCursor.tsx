
import { useMagicCursor } from "@/hooks/use-magic-cursor";

export default function MagicCursor() {
  const { renderMagicCursor } = useMagicCursor({
    trailCount: 10,
    trailSize: 8,
    trailColor: "rgba(68, 221, 221, 0.7)",
    cursorSize: 8,
    cursorRingSize: 40,
    cursorColor: "#44DDDD",
    ringColor: "rgba(68, 221, 221, 0.5)",
    disableOnMobile: true
  });
  
  return renderMagicCursor();
}
