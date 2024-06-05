import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxStore";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../../../store";

interface DataType {
  id: number;
  uuid: string;
  walk: string;
  eat: string;
  pill: string;
  hospital: string;
  beauty: string;
  content: string;
  date: string;
  walkimg: string;
  eatimg: string;
  pillimg: string;
  hospitalimg: string;
  beautyimg: string;
  basicW: string;
  basicE: string;
  basicP: string;
  basicH: string;
  basicB: string;
}
const View = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const dbId = useAppSelector((state) => state.userWriteId.selectId);

  const [fetchDb, setFetchDb] = useState<DataType[]>([]);
  const handleDb = async () => {
    const { data, error } = await supabase.from("writedb").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFetchDb(data);
    }
  };

  const hadleEdit = (dbId: number) => {
    nav(`/write/${dbId}`);
  };
  const hadleCancle = (dbId: number) => {
    nav(`/view/${dbId}`);
  };
  console.log(dbId);
  // console.log(fetchDb);
  useEffect(() => {
    handleDb();
  }, []);
  return (
    <section
      style={{ backgroundColor: "#FFEAD9", width: "100%", height: "100%" }}
    >
      <h3 style={{ textAlign: "center", padding: "40px" }}>2024.03.15</h3>
      <div>
        <h3>완료</h3>
        <div>
          <ul style={{ display: "flex", height: "150px" }}>
            {fetchDb.map((item, index) =>
              item.id === dbId ? (
                <li key={index}>
                  <h3>{item.date}</h3>

                  <div>
                    <img src={item.basicW} />
                    <img src={item.basicE} />
                    <img src={item.basicP} />
                    <img src={item.basicH} />
                    <img src={item.basicB} />
                  </div>
                  <div>{item.content}</div>
                </li>
              ) : (
                <li key={index}></li>
              )
            )}
          </ul>
        </div>
        <div>
          <button onClick={() => hadleEdit(dbId)}>수정</button>
          <button onClick={() => hadleCancle(dbId)}>취소</button>
        </div>
      </div>
    </section>
  );
};
export default View;
