import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import addDogNameTHunk from "../../redux/thunks/dogthunk/addDogNameThunk";
import Logout from "../login/logoutHeader";

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
      {userUid ? <Logout/>:<></> }
        <div className="flex flex-col justify-center items-center min-h-screen px-10">
          <div className="flex flex-col items-center gap-y-36">
            <h3 className="text-3xl text-center py-3">
              멈멈이 이름을
              <br />
              적어줘
            </h3>
            <form onSubmit={handleInput} className="flex gap-3">
              <input
                type="text"
                className="p-2 rounded-lg invalid:border-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="멈멈이 이름은?"
                value={myDogName}
                onChange={(e) => setMyDogName(e.target.value)}
              />
              <button type="submit" className="bg-[#FD943F] text-white rounded-lg px-4 py-2"> 등록</button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DogName;
