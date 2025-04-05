
import { useMagicCursor } from "@/hooks/use-magic-cursor";

export default function MagicCursor() {
  const { renderMagicCursor } = useMagicCursor({
    trailCount: 10,
    trailSize: 8,
    trailColor: "rgba(139, 0, 0, 0.7)", // Updated to blood red
    cursorSize: 12, // Increased size for better visibility
    cursorRingSize: 40,
    cursorColor: "#8B0000", // Updated to blood red
    ringColor: "rgba(139, 0, 0, 0.7)", // Updated to blood red
    disableOnMobile: true
  });
  
  return renderMagicCursor();
}
