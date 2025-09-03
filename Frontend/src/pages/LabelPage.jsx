import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";
import NoteInput from "../components/NoteInput";
import NotesBoard from "../components/NotesBoard";
import { useParams } from "react-router-dom";
import { useGetLabels } from "../hooks/useLabelApi";

export default function LabelPage() {
  const { id } = useParams();
  const { data: labels, loading, error } = useGetLabels("http://localhost:4000/api/labels");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading labels</div>;

  // Find the label object by ID
  const currentLabel = labels.find((label) => label._id === id);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div>
          <SideDrawer />
        </div>
        <div className="flex-1 overflow-y-auto p-10">
          <div className="flex justify-center items-center w-full h-auto">
            {currentLabel ? (
              <NoteInput defaultLabels={[currentLabel]} />
            ) : (
              <div>Label not found</div>
            )}
          </div>
          <div className="flex justify-center items-center w-full h-auto">
            <NotesBoard currentLabelId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
