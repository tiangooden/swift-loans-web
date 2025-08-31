import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Review",
    default: "Review",
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