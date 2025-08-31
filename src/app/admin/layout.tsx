import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Swift Loans",
    default: "Swift Loans",
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