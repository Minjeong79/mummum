import { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/reduxStore";
// import { useParams } from "react-router-dom";
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

  const hadleDelete = async (selectDBId: number) => {
    console.log("click");
    window.confirm("삭제 하시겠습니까?");
    const { error } = await supabase
      .from("writedb")
      .delete()
      .eq("id", selectDBId);
    console.log(error);
    nav(`/list`);
  };
  useEffect(() => {
    handleDb();
  }, []);

  console.log(fetchDb);
  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
        <h3 className="text-center pt-12">2024.03.15</h3>
        <div className="p-10 flex flex-col gap-6">
          <div className=" flex justify-between">
            <h3 className="text-lg">하루 기록</h3>
            <button onClick={() => hadleDelete(selectDBId)}>삭제</button>
          </div>

          <div>
            <ul>
              {fetchDb.map((item, index) =>
                item.id === selectDBId ? (
                  <li key={index} className=" flex flex-col gap-6">
                    <h3>{item.date}</h3>
                    <div className="mt-2.5 flex gap-3">
                      <div>
                        {item.basicW ? (
                          <div className="w-16">
                            <img src={item.basicW} />
                            <p className="mt-2.5 text-sm text-center">
                              {item.walk}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {item.basicE ? (
                          <div className="w-16">
                            <img src={item.basicE} />
                            <p className="mt-2.5 text-sm text-center">
                              {item.eat}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {item.basicP ? (
                          <div className="w-16">
                            <img src={item.basicP} />
                            <p className="mt-2.5 text-sm text-center">
                              {item.pill}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {item.basicH ? (
                          <div className="w-16">
                            <img src={item.basicH} />
                            <p className="mt-2.5 text-sm text-center">
                              {item.hospital}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        {item.basicB ? (
                          <div className="w-16">
                            <img src={item.basicB} />
                            <p className="mt-2.5 text-sm text-center">
                              {item.beauty}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="w-full h-40 p-2.5 bg-[#FFDCBF] rounded-md">
                      {item.content}
                    </div>
                  </li>
                ) : (
                  <li key={index}></li>
                )
              )}
            </ul>
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <button
              className="bg-[#FD943F] text-white rounded-lg px-4 py-2"
              onClick={() => hadleEdit(selectDBId)}
            >
              수정
            </button>
            <button
              className="bg-[#D9D9D9] rounded-lg px-4 py-2"
              onClick={() => hadleCancle(selectDBId)}
            >
              취소
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
export default View;
