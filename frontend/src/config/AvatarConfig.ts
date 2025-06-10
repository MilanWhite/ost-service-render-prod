export const getAvatarSrc = (email?: string) => {
  if (!email) return "";

  // 1) build initials as before
  const parts = email
    .split("@")[0]
    .split(/[\._-]+/)
    .filter((seg) => !/^\d+$/.test(seg));

  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0]?.slice(0, 2).toUpperCase() || "";

  // 2) read the CSS variables from :root
  //    (these must be defined somewhere globally in your CSS)
  const rootStyles = getComputedStyle(document.documentElement);
  const fgHex = rootStyles.getPropertyValue("--color-primary").trim().replace("#", "");
  const bgHex = rootStyles.getPropertyValue("--color-primary-100").trim().replace("#", "");

  // 3) if CSS variables aren’t found, default to some safe value
  const background = bgHex || "0066B1";       // fallback blue if var isn’t set
  const color = fgHex || "2E2E2E";            // fallback gray

  // 4) build the URL using actual hex codes
  return (
    `https://ui-avatars.com/api/` +
    `?name=${initials}` +
    `&size=80` +
    `&background=${background}` +
    `&color=${color}` +
    `&rounded=true`
  );
};