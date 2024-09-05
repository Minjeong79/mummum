import { useAppDispatch } from "../../redux/reduxStore";
import { userLogout } from "../../redux/slices/loginSlice/userLoginSlice";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";

const Logout = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleLogout = async () => {
    const popup = window.confirm("로그아웃 할래 멈?");
    if (popup) {
      const { error } = await supabase.auth.signOut();
      nav(`/`);
      console.log(error);
      
      localStorage.clear();
      dispatch(userLogout(""));
     
    } else {
      return;
    }
  };
  return (
    <section className="max-w-lg mx-auto flex justify-end">
      <button
        className="bg-white rounded-lg text-xs p-1"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </section>
  );
};

export default Logout;
