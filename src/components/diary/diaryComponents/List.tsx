import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { customAlphabet } from "nanoid";
import { userSelectId } from "../../../redux/slices/user/userWriteSlice";
import supabase from "../../../store";

import "../../../App.css";

interface DataType {
  id: number;
  uuid: string;
  walk: string;
  eat: string;
  pill: string;
  hospital: string;
  beauty: string;
  content: string;
  walkimg: string;
  eatimg: string;
  pillimg: string;
  hospitalimg: string;
  beautyimg: string;
}

const List = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const userUid = useAppSelector((state) => state.userLogin.userId);

  const [fetchDb, setFetchDb] = useState<DataType[]>([]);

  const handleDb = async () => {
    const { data, error } = await supabase.from("writedb").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFetchDb(data);
    }
  };

  const handleWrite = async () => {
    dispatch(userSelectId(null));
    nav(`/write`);
  };

  const handlePage = (id: number) => {
    dispatch(userSelectId(id));
    console.log(id);
    nav(`/view/${id}`);
  };

  useEffect(() => {
    handleDb();
  }, []);

  // console.log(imgList);

  return (
    <section
      style={{ backgroundColor: "#FFEAD9", width: "100%", height: "100%" }}
    >
      <h3>2024.03</h3>
      <div>
        <ul className="list">
          {fetchDb.map((item, index) =>
            item.uuid === userUid ? (
              <li
                key={index}
                className="list_item"
                onClick={() => handlePage(item.id)}
              >
                <div>{item.content}</div>
                <div key={index} className="list_item_imgs">
                  <div>
                    {item.walk === "산책 완료" ? (
                      <img src={item.walkimg} className="img_size" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.eat === "밥" ? (
                      <img src={item.eatimg} className="img_size" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.pill === "약" ? (
                      <img src={item.pillimg} className="img_size" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.hospital === "병원" ? (
                      <img src={item.hospitalimg} className="img_size" />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {item.beauty === "미용" ? (
                      <img src={item.beautyimg} className="img_size" />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </li>
            ) : (
              <li key={index}></li>
            )
          )}
        </ul>
        <div>
          <button onClick={handleWrite}>작성</button>
        </div>
      </div>
    </section>
  );
};
export default List;
