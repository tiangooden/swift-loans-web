import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Applications",
    default: "Applications",
  },
  description: "",
};

export default function AdminLayout({
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