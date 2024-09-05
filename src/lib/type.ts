export interface DataType {
    id: number;
    uuid: string;
    walk: string;
    eat: string;
    pill: string;
    hospital: string;
    beauty: string;
    content: string;
    walkimg: string;
    eatimg: string;
    pillimg: string;
    hospitalimg: string;
    beautyimg: string;
  }

  export interface DetailDataType {
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

  export interface TopimgC {
    id: number;
    name: string;
    imgurl: string;
    imgurlO: string;
  }

  export interface Topimg {
    id: number;
    name: string;
    imgurl: string;
  }
  
  export interface ImgType {
    id: number;
    walk: string;
    eat: string;
    pill: string;
    hospital: string;
    beauty: string;
  }
 
  export interface BackBgType {
    id: number;
    backurl: string;
    menutext: string;
  }


  export interface CityDataList {
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
  }
  export interface Address {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
    zip_code: string;
  }
  export interface ResultItem {
    address: Address;
  }
  export interface DogNameType {
    uuid: string;
    dogname: string;
  }

  export interface UidType {
    uuid: string;
  }

  export interface Position {
    lat: number;
    lng: number;
  }
  
  export interface Marker {
    position: Position;
    content: string;
    address: string;
  }
  export interface DogType{
    name:string;
    url:string;
  }

  export interface ThemaType {
    id: number;
    url: string;
    title: string;
  }