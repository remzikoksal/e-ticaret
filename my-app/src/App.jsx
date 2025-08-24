
import PageContent from "./layout/PageContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <PageContent />
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
    </>
  );
}

export default App;
