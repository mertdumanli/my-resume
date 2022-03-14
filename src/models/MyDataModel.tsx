export interface MyDataModel {
    personalInfo: PersonalInfo;
    contactAddresses: ContactAddresses;
    map: Map;
    itemColors: ItemColors;
    itemTexts: ItemTexts[];
    musics: Musics;
}

export interface PersonalInfo {
    profilPhotos: string[];
    position: string[];
    birthplace: string[];
    birthdate: string[];
    gender: string[];
    maritalStatus: string[];
    nationality: string[];
    militaryService: string[];
}

export interface ContactAddresses {
    twitter: string;
    instagram: string;
    facebook: string;
    gmail: string;
    gitHub: string;
    tel: number;
}

export interface Map {
    title: string;
    url: string;
    openAddressEnglish: string;
    openAddressTurkish: string;
}

export interface ItemColors {
    twitter: string[];
    instagram: string[];
    facebook: string[];
    gmail: string[];
    gitHub: string[];
    tel: string[];
    mapOffCanvasHeader: string[];
    mapOffCanvasTitle: string[];
    mapOffCanvasBody: string[];
}

export interface ItemTexts {
    name: string;
    title: string[];
    detailEnglish: string[];
    detailTurkish: string[];
}

export interface Musics {
    links: string[];
    names: string[];
}