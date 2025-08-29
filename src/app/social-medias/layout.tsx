import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media"
};

export default function SocialMediasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
}