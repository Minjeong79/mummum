import { createSlice } from "@reduxjs/toolkit";

type CityData = {
    response: {
      body: {
        totalCount: number;
        items: {
          cityName: string;
          cityNameEng: string;
          coValue: string;
          dataGubun: string;
          dataTime: string;
          districtCode: string;
          districtNumSeq: string;
          itemCode: string;
          khaiValue: string;
          no2Value: string;
          numOfRows: string;
          o3Value: string;
          pageNo: string;
          pm10Value: string;
          pm25Value: string;
          resultCode: string;
          resultMsg: string;
          returnType: string;
          searchCondition: string;
          serviceKey: string;
          sidoName: string;
          so2Value: string;
          totalCount: string;
        }[];
      };
    };
};
  
  const initialState: CityData = {
    response: {
      body: {
        totalCount: 0,
        items: [
          {
            cityName: "",
            cityNameEng: "",
            coValue: "",
            dataGubun: "",
            dataTime: "",
            districtCode: "",
            districtNumSeq: "",
            itemCode: "",
            khaiValue: "",
            no2Value: "",
            numOfRows: "",
            o3Value: "",
            pageNo: "",
            pm10Value: "",
            pm25Value: "",
            resultCode: "",
            resultMsg: "",
            returnType: "",
            searchCondition: "",
            serviceKey: "",
            sidoName: "",
            so2Value: "",
            totalCount: ""
          }
        ]
      }
    },
  };
  
  const mainPageSlice =  createSlice({
    name:"mainAreaZone",
    initialState,
    reducers:{
        mainDust:(state, action)=>{
        const dust= action.payload;
        state.response = dust;
        },
        // mainArea:(state, action)=>{
        //     const area = action.payload;
        //     state.zone = area;
        // },
    }
  });
export const {mainDust} = mainPageSlice.actions;
export default mainPageSlice.reducer;














