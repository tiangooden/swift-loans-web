import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bank Accounts"
};

export default function BankAccountsLayout({
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