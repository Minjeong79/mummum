import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxStore";
import { useNavigate } from "react-router-dom";
import { customAlphabet } from "nanoid";
import { userWirteId } from "../../../redux/slices/user/userWriteSlice";
import supabase from "../../../store";
import { DetailDataType, ImgType, Topimg, TopimgC } from "../../../lib/type";
import { dateFunc } from "../../../lib/db";

const Write = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const nanoid = customAlphabet("123456789", 9);
  const numId = Number(nanoid());

  const userUid = useAppSelector((state) => state.userLogin.userId);
  const selectDBId = useAppSelector((state) => state.userWriteId.selectId);

  const imgRef_t0 = useRef<HTMLImageElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [imgList, setimgList] = useState<TopimgC[]>([]);
  const [imgBmList, setimgBmList] = useState<Topimg[]>([]);
  const [imgBmListC, setimgBmListC] = useState<Topimg[]>([]);
  const [btnTopSelect, setBtnTopSelect] = useState<string[]>([]);
  const [btnBtSelects, setBtnBtSelects] = useState<string[]>([]);
  const [allimgList, setAllimgList] = useState<ImgType[]>([]);
  const [txtValue, setTextValue] = useState("");
  const [fetchDb, setFetchDb] = useState<DetailDataType[]>([]);

  const [walkNums, setWalkNums] = useState<number>(2);
  const [eatNums, seteatNums] = useState<number>(2);
  const [pillNums, setPillNums] = useState<number>(2);
  const [hospitalNums, setHospitalNums] = useState<number>(2);
  const [beautyNums, setBeatyNums] = useState<number>(2);

  const daydate = dateFunc();

  const imgTopListHandle = async () => {
    const { data, error } = await supabase.from("diarywriteimgtop").select();
    if (data) {
      setimgList(data);
    } else {
      throw error;
    }
  };

  const imgBottomListHandle = async () => {
    const { data, error } = await supabase.from("diarywriteimgbottom").select();
    if (data) {
      setimgBmList(data);
    } else {
      throw error;
    }
  };
  const imgBottomListCompleteHandle = async () => {
    const { data, error } = await supabase
      .from("diarywriteeditbottom")
      .select();
    if (data) {
      setimgBmListC(data);
    } else {
      throw error;
    }
  };

  const handleImageClick = (item: string) => {
    setWalkNums(walkNums + 1);
    if (imgRef_t0.current) {
      if (
        imgRef_t0.current.src.includes("img_icon1-1.png") &&
        walkNums % 2 === 0
      ) {
        imgRef_t0.current.src =
          "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon1.png";
        setBtnTopSelect([item]);
      } else {
        imgRef_t0.current.src =
          "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon1-1.png";
        setBtnTopSelect([]);
      }
    }
  };

  const setImgRef = (index: number) => (el: HTMLImageElement | null) => {
    imgRefs.current[index] = el;
  };
  const hadleIageClicks = (item: string) => {
    imgRefs.current.forEach((img, index) => {
      if (img) {
        switch (item) {
          case "밥":
            if (index === 0) {
              seteatNums(eatNums + 1);
              if (img.src.includes("img_icon2-1.png")) {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon2.png";
              } else {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon2-1.png";
              }
            }
            break;
          case "약":
            if (index === 1) {
              setPillNums(pillNums + 1);
              if (img.src.includes("img_icon3-1.png")) {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon3.png";
              } else {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon3-1.png";
              }
            }
            break;
          case "병원":
            if (index === 2) {
              setHospitalNums(hospitalNums + 1);
              if (img.src.includes("img_icon4-1.png")) {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon4.png";
              } else {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon4-1.png";
              }
            }
            break;
          case "미용":
            if (index === 3) {
              setBeatyNums(beautyNums + 1);
              if (img.src.includes("img_icon5-1.png")) {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon5.png";
              } else {
                img.src =
                  "https://zbjwkpzadmxggyahexgv.supabase.co/storage/v1/object/public/img/wirteImg/img_icon5-1.png";
              }
            }
            break;
          default:
            break;
        }
      }
    });
    setBtnBtSelects([...btnBtSelects, item]);
  };

  const hadleListImg = async () => {
    const { data, error } = await supabase.from("listimgdb").select();
    if (data) {
      setAllimgList(data);
    } else {
      throw error;
    }
  };
  console.log(btnTopSelect);
  //처음 데이터 입력 시
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!txtValue) {
      window.confirm("내용을 작성 해주세요");
      return;
    }

    const walkN = btnTopSelect.find((item) => item === "산책") || "미완";
    const eat = btnBtSelects.find((item) => item === "밥") || "미완";
    const pill = btnBtSelects.find((item) => item === "약") || "미완";
    const hospital = btnBtSelects.find((item) => item === "병원") || "미완";
    const beauty = btnBtSelects.find((item) => item === "미용") || "미완";
    const { error } = await supabase.from("writedb").insert({
      id: numId,
      uuid: userUid,
      walk: walkNums % 2 === 1 ? walkN : "미완",
      walkimg: walkN != "미완" ? allimgList[0].walk : null,
      basicW: walkN === "미완" ? imgList[0].imgurl : imgList[0].imgurlO,
      eat: eatNums % 2 === 1 ? eat : "미완",
      eatimg: eat != "미완" ? allimgList[0].eat : null,
      pill: pillNums % 2 === 1 ? pill : "미완",
      pillimg: pill != "미완" ? allimgList[0].pill : null,
      hospital: hospitalNums % 2 === 1 ? hospital : "미완",
      hospitalimg: hospital != "미완" ? allimgList[0].hospital : null,
      beauty: beautyNums % 2 === 1 ? beauty : "미완",
      beautyimg: beauty != "미완" ? allimgList[0].beauty : null,
      content: txtValue,
      date: daydate,
      basicE: eat != "미완" ? imgBmListC[0].imgurl : imgBmList[0].imgurl,
      basicP: pill != "미완" ? imgBmListC[1].imgurl : imgBmList[1].imgurl,
      basicH: hospital != "미완" ? imgBmListC[2].imgurl : imgBmList[2].imgurl,
      basicB: beauty != "미완" ? imgBmListC[3].imgurl : imgBmList[3].imgurl,
    });
    console.log(error);
    setTextValue("");

    dispatch(userWirteId(numId));
    nav(`/list`);
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
  //데이터 수정
  const handleUpDateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!txtValue) {
      window.confirm("내용을 작성 해주세요");
      return;
    }

    try {
      fetchDb.map(async (item) => {
        console.log(selectDBId === item.id);
        if (selectDBId === item.id) {
          const { error } = await supabase
            .from("writedb")
            .update({
              content: txtValue,
            })
            .eq("id", selectDBId);
          console.log(error);
        }
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
    <section className="bg-[#E9CEB9]">
      <section className="max-w-lg mx-auto bg-[#FFEAD9] h-screen">
        {selectDBId != null ? (
          <form onSubmit={handleUpDateSubmit} className="p-10">
            {fetchDb.map((item, idx) =>
              item.id === selectDBId ? (
                <div key={idx}>
                  <h3 className="text-center pt-12">{item.date}</h3>
                  <div className="flex flex-col gap-y-8">
                    <div>
                      <h3 className="text-lg">산책</h3>
                      <div>
                        <ul>
                          <li key={idx} className="w-16 read-only">
                            <button
                              className="mt-2.5 cursor-default"
                              type="button"
                            >
                              <img src={item.basicW} alt="이미지" />
                            </button>
                            <p className="mt-2.5 text-sm text-center">
                              {item.walk}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg">추가 선택</h3>
                      <ul className="flex flex-row gap-x-4">
                        <li className="w-16">
                          <div>
                            <button
                              className="mt-2.5 cursor-default read-only"
                              type="button"
                            >
                              <img src={item.basicE} alt="이미지" />
                            </button>
                            <p className="mt-2.5 text-sm text-center">
                              {item.eat}
                            </p>
                          </div>
                        </li>
                        <li className="w-16">
                          <div>
                            <button
                              className="mt-2.5 cursor-default read-only "
                              type="button"
                            >
                              <img src={item.basicP} alt="이미지" />
                            </button>
                            <p className="mt-2.5 text-sm text-center">
                              {item.pill}
                            </p>
                          </div>
                        </li>
                        <li className="w-16">
                          <div>
                            <button
                              className="mt-2.5 cursor-default read-only"
                              type="button"
                            >
                              <img src={item.basicH} alt="이미지" />
                            </button>
                            <p className="mt-2.5 text-sm text-center">
                              {item.hospital}
                            </p>
                          </div>
                        </li>
                        <li className="read-only w-16">
                          <div>
                            <button
                              className="mt-2.5 cursor-default"
                              type="button"
                            >
                              <img src={item.basicB} alt="이미지" />
                            </button>
                            <p className="mt-2.5 text-sm text-center">
                              {item.beauty}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <textarea
                      className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
                      defaultValue={item.content}
                      onChange={(e) => setTextValue(e.target.value)}
                    ></textarea>
                    <div className="flex justify-center gap-3">
                      <button
                        type="submit"
                        className="bg-[#FD943F] text-white rounded-lg px-4 py-2"
                      >
                        수정
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-[#D9D9D9] rounded-lg px-4 py-2"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-10">
            <div className="flex flex-col gap-y-8">
              <div>
                <h3 className="text-lg">산책</h3>
                <div>
                  <ul>
                    {imgList.map((item, index) => {
                      return (
                        <li key={index} className="w-16">
                          <button
                            className="mt-2.5"
                            type="button"
                            onClick={() => handleImageClick(item.name)}
                          >
                            <img
                              ref={imgRef_t0}
                              src={item.imgurl}
                              alt={item.name}
                            />
                          </button>
                          <p className="mt-2.5 text-sm text-center">
                            {item.name}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg">추가 선택</h3>
                <ul className="flex flex-row gap-x-4">
                  {imgBmList.map((item, index) => {
                    return (
                      <li key={index} className="w-16 text-center">
                        <button
                          className="mt-2.5"
                          type="button"
                          onClick={() => hadleIageClicks(item.name)}
                        >
                          <img
                            ref={setImgRef(index)}
                            src={item.imgurl}
                            alt={item.name}
                          />
                        </button>
                        <p className="mt-2.5 text-sm text-center">
                          {item.name}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <textarea
                className="resize-none border border-[#F5BB8C] w-full h-40 p-2.5 bg-transparent outline-none rounded-md"
                value={txtValue}
                onChange={(e) => setTextValue(e.target.value)}
              ></textarea>
              <div className="flex justify-center  gap-3">
                <button
                  type="submit"
                  className="bg-[#FD943F] text-white rounded-lg px-4 py-2"
                >
                  등록
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-[#D9D9D9] rounded-lg px-4 py-2"
                >
                  취소
                </button>
              </div>
            </div>
          </form>
        )}
      </section>
    </section>
  );
};
export default Write;
