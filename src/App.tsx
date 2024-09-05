import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/login";
import DogSelect from "./components/themaBg/dogSelect";
import ThemaSelect from "./components/themaBg/themaSelect";
import Write from "./components/diary/diaryComponents/write";
import View from "./components/diary/diaryComponents/view";
import List from "./components/diary/diaryComponents/List";
import DogName from "./components/themaBg/dogName";
import MapPage from "./components/map/mapPage";
import './style/style.css'
import DogMain from "./components/main/dogMain";
function App() {
  // const memoziedDispatches = useMemo(() => {
  //   return {
  //     test,
  //   };
  // }, []);

  return (
    <div className="wrap">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dogSelect" element={<DogSelect />} />
        <Route path="/themaSelect" element={<ThemaSelect />} />
        <Route path="/dogName" element={<DogName />} />
        <Route path="/dogMain" element={<DogMain />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:id" element={<Write />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/list" element={<List />} />
        <Route path="/mapPage" element={<MapPage/>} />
      </Routes>
    </div>
  );
}

export default App;
