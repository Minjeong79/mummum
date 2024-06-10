import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/login";
import DogSelect from "./components/themaBg/dogSelect";
import ThemaSelect from "./components/themaBg/themaSelect";
import DogMain from "./components/diary/dogMain";
import Write from "./components/diary/diaryComponents/write";
import View from "./components/diary/diaryComponents/view";
import List from "./components/diary/diaryComponents/List";
import CommunityWrite from "./components/community/communityWrite";
import CommunityView from "./components/community/communityView";
import CommunityList from "./components/community/communityList";
import "./App.css";
import DogName from "./components/themaBg/dogName";
import WalkPage from "./components/walkPage";

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
        <Route path="/walkPage" element={<WalkPage/>} />
        <Route path="/communityWrite" element={<CommunityWrite />} />
        <Route path="/communityView/:id" element={<CommunityView />} />
        <Route path="/communityList" element={<CommunityList />} />
      </Routes>
    </div>
  );
}

export default App;
