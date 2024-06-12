import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import addDogNameTHunk from "../../redux/thunks/dogthunk/addDogNameThunk";

const DogName = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [myDogName, setMyDogName] = useState("");

  const handleInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addDogNameTHunk({ uuid: userUid, dogname: myDogName }));
      setMyDogName("");
      nav(`/dogMain`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
        <div className="flex flex-col justify-center items-center min-h-screen px-10">
          <div className="flex flex-col items-center gap-y-36">
            <h3 className="text-3xl text-center py-3">
              멈멈이 이름을
              <br />
              적어줘
            </h3>
            <div>
              선택 한 강아지와 어떤 테마 선택 했는지 보여지게
              <br/>아니면 다시 선택 할 수 있게 뒤로 가기 필요
            </div>
            <form onSubmit={handleInput}>
              <input
                type="text"
                placeholder="멈멈이 이름은?"
                value={myDogName}
                onChange={(e) => setMyDogName(e.target.value)}
              />
              <button type="submit"> 등록</button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DogName;
