import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return (
    <div className="bg-night h-full w-screen flex gap-2">
      <Sidebar />
      <main className="max-w-8xl flex-1 mx-auto py-4">{children}</main>
    </div>
  );
}

export default RootLayout;