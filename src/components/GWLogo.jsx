import Image from "next/image";

/**
 * Gameweek XI logo rendered from /gw-logo.png.
 *
 * @param {{ size?: number }} props
 */
export default function GWLogo({ size = 80 }) {
  return (
    <Image
      src="/gw-logo.png"
      alt="Gameweek XI logo"
      width={size}
      height={size}
    />
  );
}
