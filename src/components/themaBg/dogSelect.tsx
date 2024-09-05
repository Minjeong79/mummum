import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import addDogSelect from "../../redux/thunks/dogthunk/addDogThunk";
import Logout from "../login/logoutHeader";
import { DogType } from "../../lib/type";


const DogSelect = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [imageUrlList, setImageUrlList] = useState<DogType[]>([]);

  const imgListHandle = async () => {
    let { data, error } = await supabase.from("dogimgdb").select("*");
    if (data) {
      setImageUrlList(data);
    } else {
      console.log(error);
    }
  };

const imgClickhandle = async (index: number) => {
    const dogNum = `dog${index}`;
    await dispatch(addDogSelect({ userUid: userUid, name: dogNum }));
    nav(`/themaSelect`);
  };

  useEffect(() => {
    imgListHandle();
  }, []);

  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
        {userUid ? (
          <section className="pt-2 px-10">
            <Logout />
          </section>
        ) : (
          <section className="h-11"></section>
        )}
        <div className="flex flex-col justify-center items-center h-5/6 px-10">
          <div className="flex flex-col items-center gap-y-36">
            <h3 className="text-3xl text-center py-3">
              멈멈이의 색상을
              <br />
              선택 해줘
            </h3>
            <ul className="flex flex-row justify-center items-center gap-x-9 mt-5">
              {imageUrlList.map((item, index) => {
                return (
                  <li key={index} className="min-w-16 max-w-24">
                    <button id="" onClick={() => imgClickhandle(index)}>
                      <img src={item.url} alt="강아지이미지" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};
export default DogSelect;
