import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import MarkdownEditor from "@/components/Editor/MarkdownEditor";
import MarkdownPreview from "@/components/Preview/MarkdownPreview";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MarkdownEditor />
        <MarkdownPreview />
      </div>
    </div>
  );
}
