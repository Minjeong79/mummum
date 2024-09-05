import { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../../store";
import { DetailDataType } from "../../../lib/type";

const View = () => {
  const nav = useNavigate();
  const selectDBId = useAppSelector((state) => state.userWriteId.selectId);
  const [fetchDb, setFetchDb] = useState<DetailDataType[]>([]);

  const handleDb = async () => {
    const { data, error } = await supabase.from("writedb").select();
    if (error) {
      throw error;
    } else {
      setFetchDb(data);
    }
  };

  const hadleEdit = (selectDBId: number) => {
    nav(`/write/${selectDBId}`);
  };
  const hadleCancle = () => {
    nav(`/list`);
  };

  const hadleDelete = async (selectDBId: number) => {
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

  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
        <div className="p-10 flex flex-col gap-6">
          <div className=" flex justify-between">
            <h3 className="text-lg">하루 기록</h3>
            <button
              className="bg-[#D9D9D9] rounded-lg px-4 py-2"
              onClick={() => hadleDelete(selectDBId)}
            >
              삭제
            </button>
          </div>

          <div>
            <ul>
              {fetchDb.map((item, index) =>
                item.id === selectDBId ? (
                  <li key={index} className=" flex flex-col gap-6">
                    <h3 className="text-center pt-12 text-stone-700">
                      {item.date}
                    </h3>
                    <div className="mt-2.5 flex gap-3">
                      {item.basicW ? (
                        <div className="w-16">
                          <img src={item.basicW} />
                          <p className="mt-2.5 text-sm text-center">
                            {item.walk}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden"></div>
                      )}

                      {item.basicE ? (
                        <div className="w-16">
                          <img src={item.basicE} />
                          <p className="mt-2.5 text-sm text-center">
                            {item.eat}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden"></div>
                      )}

                      {item.basicP ? (
                        <div className="w-16">
                          <img src={item.basicP} />
                          <p className="mt-2.5 text-sm text-center">
                            {item.pill}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden"></div>
                      )}

                      {item.basicH ? (
                        <div className="w-16">
                          <img src={item.basicH} />
                          <p className="mt-2.5 text-sm text-center">
                            {item.hospital}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden"></div>
                      )}

                      {item.basicB ? (
                        <div className="w-16">
                          <img src={item.basicB} />
                          <p className="mt-2.5 text-sm text-center">
                            {item.beauty}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden"></div>
                      )}
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
          <div className="relative">
            <div className="flex flex-row gap-4 justify-center items-center">
              <button
                className="bg-[#FD943F] text-white rounded-lg px-4 py-2"
                onClick={() => hadleEdit(selectDBId)}
              >
                수정
              </button>
              <button
                className="bg-[#D9D9D9] rounded-lg px-4 py-2"
                onClick={hadleCancle}
              >
                취소
              </button>
            </div>
            <div className="absolute right-0">
            <button
                className="bg-[#A4A4A4] rounded-lg px-4 py-2 text-white"
                onClick={hadleCancle}
              >
                목록
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default View;
