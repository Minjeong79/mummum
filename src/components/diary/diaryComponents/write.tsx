import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxStore";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { customAlphabet } from "nanoid";
import { userWirteId } from "../../../redux/slices/user/userWriteSlice";
import supabase from "../../../store";

interface TopimgC {
  id: number;
  name: string;
  imgurl: string;
}

interface Topimg {
  id: number;
  name: string;
  imgurl: string;
}

interface ImgType {
  id: number;
  walk: string;
  eat: string;
  pill: string;
  hospital: string;
  beauty: string;
}
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

const Write = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const userUid = useAppSelector((state) => state.userLogin.userId);
  const selectDBId = useAppSelector((state) => state.userWriteId.selectId);

  const [imgList, setimgList] = useState<TopimgC[]>([]);
  const [imgBmList, setimgBmList] = useState<Topimg[]>([]);
  const [imgBmListC, setimgBmListC] = useState<Topimg[]>([]);
  const [btnTopSelect, setBtnTopSelect] = useState<string[]>([]);
  const [btnBtSelects, setBtnBtSelects] = useState<string[]>([]);
  const [allimgList, setAllimgList] = useState<ImgType[]>([]);
  const [txtValue, setTextValue] = useState("");
  const [fetchDb, setFetchDb] = useState<DataType[]>([]);

  ////
  const [updatedWalk, setUpdatedWalk] = useState("");
  const [updatedWalkImg, setUpdatedWalkImg] = useState("");
  const [updatedBasicW, setUpdatedBasicW] = useState("");

  const [changeValue, setChangeValue] = useState(false);
  const [changeEValue, setChangeEValue] = useState(false);
  const [changePValue, setChangePValue] = useState(false);
  const [changeHValue, setChangeHValue] = useState(false);
  const [changeBValue, setChangeBValue] = useState(false);
  /////
  const imgTopListHandle = async () => {
    const { data, error } = await supabase.from("diarywriteimgtop").select();
    if (data) {
      setimgList(data);
    } else {
      console.log(error);
    }
  };

  const imgBottomListHandle = async () => {
    const { data, error } = await supabase.from("diarywriteimgbottom").select();
    if (data) {
      setimgBmList(data);
    } else {
      console.log(error);
    }
  };
  const imgBottomListCompleteHandle = async () => {
    const { data, error } = await supabase
      .from("diarywriteeditbottom")
      .select();
    if (data) {
      setimgBmListC(data);
    } else {
      console.log(error);
    }
  };

  const handleImageClick = (item: string) => {
    if (selectDBId) {
      setChangeValue(true);
      setUpdatedWalk(item);
      setUpdatedWalkImg(allimgList[0].walk);
      setUpdatedBasicW(imgList[0].imgurl);
    } else {
      setUpdatedWalk("산책 미완");
      console.log("산책 안할 거야 첫 작성");
    }

    setBtnTopSelect([...btnTopSelect, item]);
  };

  const hadleIageClicks = (item: string) => {
    setBtnBtSelects([...btnBtSelects, item]);
    if (selectDBId) {
      if (item === "밥") {
        setChangeEValue(true);
      }
    }
    if (selectDBId) {
      if (item === "약") {
        setChangePValue(true);
      }
    }
    if (selectDBId) {
      if (item === "병원") {
        setChangeHValue(true);
      }
    }
    if (selectDBId) {
      if (item === "미용") {
        setChangeBValue(true);
      }
    }
  };

  const hadleListImg = async () => {
    const { data, error } = await supabase.from("listimgdb").select();

    if (data) {
      setAllimgList(data);
    } else {
      console.log(error);
    }
  };

  //처음 데이터 임력 시
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!txtValue) {
      window.confirm("내용을 작성 해주세요");
      return;
    }

    const today = new Date();
    const forMattoY = today.getFullYear();
    const forMattoM = String(today.getMonth() + 1).padStart(2, "0");
    const forMattoD = String(today.getDate()).padStart(2, "0");

    const dayDate = new Date(`${forMattoY}.${forMattoM}.${forMattoD}`);

    try {
      const walkN =
        btnTopSelect.find((item) => item === "산책 완료") || "산책 미완";
      const eat = btnBtSelects.find((item) => item === "밥") || "미완";
      const pill = btnBtSelects.find((item) => item === "약") || "미완";
      const hospital = btnBtSelects.find((item) => item === "병원") || "미완";
      const beauty = btnBtSelects.find((item) => item === "미용") || "미완";
      const { error } = await supabase.from("writedb").insert({
        id: numId,
        uuid: userUid,
        walk: walkN,
        walkimg: walkN === "산책 미완" ? null : allimgList[0].walk,
        basicW: walkN === "산책 미완" ? null : imgList[0].imgurl,
        eat: eat,
        eatimg: eat != "미완" ? allimgList[0].eat : null,
        pill: pill,
        pillimg: pill != "미완" ? allimgList[0].pill : null,
        hospital: hospital,
        hospitalimg: hospital != "미완" ? allimgList[0].hospital : null,
        beauty: beauty,
        beautyimg: beauty != "미완" ? allimgList[0].beauty : null,
        content: txtValue,
        date: dayDate,
        basicE: eat != "미완" ? imgBmListC[0].imgurl : null,
        basicP: pill != "미완" ? imgBmListC[1].imgurl : null,
        basicH: hospital != "미완" ? imgBmListC[2].imgurl : null,
        basicB: beauty != "미완" ? imgBmListC[3].imgurl : null,
      });
      console.log(error);
      setTextValue("");

      dispatch(userWirteId(numId));
      nav(`/list`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    window.confirm("작성 취소 멈?");
    nav(`/list`);
  };

  const handleEditDb = async () => {
    const { data, error } = await supabase.from("writedb").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFetchDb(data);
    }
  };

  const handleUpDateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!txtValue) {
      window.confirm("내용을 작성 해주세요");
      return;
    }

    try {
      const eat = btnBtSelects.find((item) => item === "밥") || "미완";
      const pill = btnBtSelects.find((item) => item === "약") || "미완";
      const hospital = btnBtSelects.find((item) => item === "병원") || "미완";
      const beauty = btnBtSelects.find((item) => item === "미용") || "미완";

      fetchDb.map(async (item) => {
        const { error } = await supabase
          .from("writedb")
          .update({
            walk:
              item.walk === "산책 미완" && changeValue
                ? updatedWalk
                : item.walk,
            walkimg: item.walk === "산책 미완" ? updatedWalkImg : item.walkimg,
            basicW: item.walk === "산책 미완" ? updatedBasicW : item.basicW,
            eat: item.eat === "미완" && changeEValue ? eat : item.eat,
            eatimg:
              item.eat === "미완" && changeEValue
                ? allimgList[0].eat
                : item.eatimg,
            basicE:
              item.eat === "미완" && changeEValue
                ? imgBmListC[0].imgurl
                : item.basicE,
            pill: item.pill === "미완" && changePValue ? pill : item.pill,
            pillimg:
              item.pill === "미완" && changePValue
                ? allimgList[0].pill
                : item.pillimg,
            basicP:
              item.pill === "미완" && changePValue
                ? imgBmListC[1].imgurl
                : item.basicP,
            hospital:
              item.hospital === "미완" && changeHValue
                ? hospital
                : item.hospital,
            hospitalimg:
              item.hospital === "미완" && changeHValue
                ? allimgList[0].hospital
                : item.hospitalimg,
            basicH:
              item.hospital === "미완" && changeHValue
                ? imgBmListC[2].imgurl
                : item.basicH,
            beauty:
              item.beauty === "미완" && changeBValue ? beauty : item.beauty,
            beautyimg:
              item.beauty === "미완" && changeBValue
                ? allimgList[0].beauty
                : item.beautyimg,
            basicB:
              item.beauty === "미완" && changeBValue
                ? imgBmListC[3].imgurl
                : item.basicB,
            content: txtValue,
          })
          .eq("id", selectDBId);
        console.log(error);
      });

      setTextValue("");

      dispatch(userWirteId(numId));
      nav(`/list`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hadleListImg();
    imgTopListHandle();
    imgBottomListHandle();
    imgBottomListCompleteHandle();
  }, []);

  useEffect(() => {
    handleEditDb();
  }, [selectDBId]);

  return (
    <section className="container mx-auto bg-[#FFEAD9] h-screen">
      <h3 className="text-center pt-12">2024.03.15</h3>
      <h5>다시 선택 해주세요</h5>
      {selectDBId != null ? (
        <form onSubmit={handleUpDateSubmit}>
          {fetchDb.map((item, idx) =>
            item.id === selectDBId ? (
              <div key={idx}>
                <div>
                  <div>
                    <h3>산책 수정수정</h3>
                    <div>
                      <ul style={{ display: "flex", height: "150px" }}>
                        {imgList.map((item, index) => {
                          return (
                            <li
                              key={index}
                              style={{
                                width: "80px",
                                height: "80px",
                                padding: "0px 10px",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => handleImageClick(item.name)}
                              >
                                <img src={item.imgurl} alt="이미지" />
                              </button>
                              <p>{item.name}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div style={{ marginTop: "50px" }}>
                    <h3>추가 선택</h3>
                    <ul style={{ display: "flex", height: "150px" }}>
                      {imgBmList.map((item, index) => {
                        return (
                          <li
                            key={index}
                            style={{
                              width: "80px",
                              height: "80px",
                              padding: "0px 10px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => hadleIageClicks(item.name)}
                            >
                              <img src={item.imgurl} alt="이미지" />
                            </button>
                            <p style={{ textAlign: "center" }}>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <textarea
                    style={{
                      resize: "none",
                      border: "1px solid #F5BB8C",
                      width: "100%",
                      height: "10em",
                      padding: "10px",
                      margin: "20px",
                      background: "none",
                      outline: "none",
                      borderRadius: "8px",
                    }}
                    value={item.content}
                    onChange={(e) => setTextValue(e.target.value)}
                  ></textarea>
                </div>
                <div style={{ display: "flex" }}>
                  <button type="submit">수정</button>
                  <button onClick={handleCancel}>취소</button>
                </div>
              </div>
            ) : (
              <></>
            )
          )}
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h3>산책</h3>
              <div>
                <ul style={{ display: "flex", height: "150px" }}>
                  {imgList.map((item, index) => {
                    return (
                      <li
                        key={index}
                        style={{
                          width: "80px",
                          height: "80px",
                          padding: "0px 10px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleImageClick(item.name)}
                        >
                          <img src={item.imgurl} alt="이미지" />
                        </button>
                        <p>{item.name}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div style={{ marginTop: "50px" }}>
              <h3>추가 선택</h3>
              <ul style={{ display: "flex", height: "150px" }}>
                {imgBmList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        width: "80px",
                        height: "80px",
                        padding: "0px 10px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => hadleIageClicks(item.name)}
                      >
                        <img src={item.imgurl} alt="이미지" />
                      </button>
                      <p style={{ textAlign: "center" }}>{item.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <textarea
              style={{
                resize: "none",
                border: "1px solid #F5BB8C",
                width: "100%",
                height: "10em",
                padding: "10px",
                margin: "20px",
                background: "none",
                outline: "none",
                borderRadius: "8px",
              }}
              value={txtValue}
              onChange={(e) => setTextValue(e.target.value)}
            ></textarea>
          </div>
          <div style={{ display: "flex" }}>
            <button type="submit">등록</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </form>
      )}
    </section>
  );
};
export default Write;
