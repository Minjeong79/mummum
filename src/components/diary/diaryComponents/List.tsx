import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import { userSelectId } from "../../../redux/slices/user/userWriteSlice";
import MenuFooter from "../footer";
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
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen relative">
        <div className="max-w-lg">
          <div className="px-10 flex flex-col gap-y-7 pt-12">
            <div className="flex justify-between">
              <h3 className="text-sm text-[#555]">멈멈이 기록</h3>
              <button
                className="bg-white p-2.5 rounded-lg"
                onClick={handleWrite}
              >
                작성
              </button>
            </div>
            <div>
              <ul className="li-plus-li">
                {fetchDb.map((item, index) =>
                  item.uuid === userUid ? (
                    <li
                      key={index}
                      className="bg-white w-full p-5 cursor-pointer rounded-lg h-16 flex justify-between items-center"
                      onClick={() => handlePage(item.id)}
                    >
                      <div>{item.content}</div>
                      <div key={index} className="flex">
                        <div>
                          {item.walk === "산책 완료" ? (
                            <div className="w-10">
                              <img src={item.walkimg} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>
                          {item.eat === "밥" ? (
                            <div className="w-10">
                              <img src={item.eatimg} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>
                          {item.pill === "약" ? (
                            <div className="w-10">
                              <img src={item.pillimg} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>
                          {item.hospital === "병원" ? (
                            <div className="w-10">
                              <img src={item.hospitalimg} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>
                          {item.beauty === "미용" ? (
                            <div className="w-10">
                              <img src={item.beautyimg} />
                            </div>
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
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <MenuFooter />
          </div>
        </div>
      </section>
    </section>
  );
};
export default List;
