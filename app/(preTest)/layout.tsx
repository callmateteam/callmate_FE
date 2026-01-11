import PreTestNav from "./_components/PreTestNav";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <PreTestNav />
      <main className="p-5 md:mx-auto md:w-full md:max-w-300 md:px-0 md:py-12">{children}</main>
    </div>
  );
}
