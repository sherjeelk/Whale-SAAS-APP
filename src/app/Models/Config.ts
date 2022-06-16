

  export interface Title {
    text: string;
    color: string;
    font: string;
  }

  export interface Label {
    text: string;
    color: string;
    font: string;
  }

  export interface UiData {
    color: string;
    text: any;
    font: string;
    italic: boolean;
    underline: boolean;
    bold: boolean;
    font_family: string;
    title: Title;
    label: Label;
    selected?: boolean;
  }

  export interface RadioBtn {
    text: string;
    value: string;
    id: number;
  }

  export interface DynamicData {
    radioBtn: RadioBtn[];
    selectedValue: string;
    uiId: string;
    title: string;
    value: any;
    type: string;
    email?: boolean;
    active?: boolean;
    sub_type: string;
  }

  export interface Step1 {
    id: number;
    type: string;
    title: string;
    icon: string;
    uiData: UiData;
    dynamicData: DynamicData;
    uid: string;
    class: string;
    divider: string;
    uId: string;
  }

  export interface UiData2 {
    color: string;
    font: string;
    italic: boolean;
    underline: boolean;
    selected: boolean;
    bold: boolean;
    font_family: string;
    text: string;
  }

  export interface DynamicData2 {
    uiId: string;
    title: string;
    value: string;
    email?: boolean;
  }

  export interface Step3 {
    id: number;
    class: string;
    type: string;
    uiData: UiData2;
    dynamicData: DynamicData2;
    uid: string;
  }

  export interface Config {
    step1: Step1[];
    step3: Step3[];
  }



