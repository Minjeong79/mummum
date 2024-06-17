import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import supabase from "../../store";
import { userLogin } from "../../redux/slices/loginSlice/userLoginSlice";
import "../../style/style.css";
import Logout from "./logoutHeader";

interface UidType {
  uuid: string;
}

const LoginPage = () => {
  const userUid = useAppSelector((state) => state.userLogin.userId);

  const [imageUrlList, setImageUrlList] = useState<string>("");
  const [useridDB, setUserIdDB] = useState<UidType[]>([]);
  const [checkLogin, setCheckLogin] = useState(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  async function signInWithKakao() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `https://zbjwkpzadmxggyahexgv.supabase.co/auth/v1/callback`,
        },
      });
      console.log(data);
      console.log(error);
    } catch (error) {
      console.error("카카오 로그인 중 오류 발생:", error);
    }
  }

  // async function google() {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       queryParams: {
  //         access_type: "offline",
  //         prompt: "consent",
  //       },
  //     },
  //   });
  //   console.log(error);
  // }

  const dogSelectHandle = () => {
    nav(`/dogSelect`);
  };

  const userUidFunc = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    handleUserDb();
    if (user) {
      setCheckLogin(true);
      dispatch(userLogin(user.id));
      useridDB.map((item) => {
        if (user.id === item.uuid) {
          nav(`/dogMain`);
        } else {
          return;
        }
      });
    }
  };

  const handleUserDb = async () => {
    let { data, error } = await supabase.from("userdb_0").select("uuid");
    if (data) {
      setUserIdDB(data);
    } else {
      console.log(error);
    }
  };

  const dogSelectFunc = async () => {
    const { data } = supabase.storage
      .from("img/dogSelect")
      .getPublicUrl("dog1.png");

    setImageUrlList(data.publicUrl);
  };

  useEffect(() => {
    userUidFunc();
    dogSelectFunc();
  }, []);

  useEffect(() => {
    if (checkLogin) {
      useridDB.forEach((item) => {
        if (userUid === item.uuid) {
          nav(`/dogMain`);
        }
      });
    }
  }, [useridDB]);

  console.log(useridDB);
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
        <div className="flex flex-col justify-center items-center h-5/6">
          <div className="flex flex-col items-center gap-y-20">
            <h3 className="text-3xl text-center py-3">
              멈멈이랑 놀아줘!
              <br />
              멈멈이를 기록 해줘!
            </h3>
            <div className="max-w-40 mx-auto  ">
              <img src={imageUrlList} alt="강아지 캐릭터" />
            </div>
            {userUid ? (
              <div>
                <button
                  className="bg-white w-72 h-10 rounded-lg"
                  onClick={dogSelectHandle}
                >
                  강아지 선택 하러가기
                </button>
              </div>
            ) : (
              <div className="w-72 mx-auto">
                <button
                  className="bg-white w-72 h-10 rounded-lg"
                  onClick={signInWithKakao}
                >
                  카카오 로그인
                </button>
                {/* <button onClick={google}>구글 로그인</button> */}
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
