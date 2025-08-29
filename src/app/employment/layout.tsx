import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employment"
};

export default function EmploymentLayout({
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