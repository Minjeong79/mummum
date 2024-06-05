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

  const selectDBId = useAppSelector((state) => state.userWriteId.selectId);

  const [fetchDb, setFetchDb] = useState<DataType[]>([]);
  const handleDb = async () => {
    const { data, error } = await supabase.from("writedb").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFetchDb(data);
    }
  };

  const hadleEdit = (selectDBId: number) => {
    nav(`/write/${selectDBId}`);
  };
  const hadleCancle = (selectDBId: number) => {
    nav(`/view/${selectDBId}`);
  };
  console.log(selectDBId);
  
  const hadleDelete = async(selectDBId: number)=>{
    console.log('click');
    window.confirm('삭제 하시겠습니까?')
      const { error } = await supabase
      .from('writedb')
      .delete()
      .eq('id', selectDBId);
      
      nav(`/list`);
    }
  useEffect(() => {
    handleDb();
  }, []);

  console.log(fetchDb);
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
              item.id === selectDBId ? (
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
          <button onClick={() => hadleDelete(selectDBId)}>삭제</button>
          <button onClick={() => hadleEdit(selectDBId)}>수정</button>
          <button onClick={() => hadleCancle(selectDBId)}>취소</button>
        </div>
      </div>
    </section>
  );
};
export default View;
