export default function Logo({ size = 36 }) {
  const s = size;
  const w = Math.round(s * 1.2);
  return (
    <svg width={w} height={s} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="0,50 14,0 20,0 6,50" fill="#F59E0B" />
      <polygon points="6,50 20,0 24,0 10,50" fill="#D97706" />
      <polygon points="20,50 34,0 40,0 26,50" fill="#1E40AF" />
      <polygon points="26,50 40,0 44,0 30,50" fill="#1E3A8A" />
      <polygon points="40,50 54,0 60,0 46,50" fill="#F59E0B" />
      <polygon points="46,50 60,0 60,0 52,50" fill="#D97706" />
    </svg>
  );
}
