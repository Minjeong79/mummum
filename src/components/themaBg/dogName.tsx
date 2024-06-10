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
    <section>
      <form onSubmit={handleInput}>
        <input
          type="text"
          placeholder="강아지 이름은?"
          value={myDogName}
          onChange={(e) => setMyDogName(e.target.value)}
        />
        <button type="submit"> 등록</button>
      </form>
    </section>
  );
};

export default DogName;
