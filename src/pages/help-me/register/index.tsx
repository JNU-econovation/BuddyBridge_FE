import Button from "@/components/common/Button/Button";
import Dropdown from "@/components/common/DropDown/DropDown";
import { DISABILITY, PLACE } from "@/components/common/DropDown/constants";
import Input from "@/components/common/Input/Input";
import Label from "@/components/common/Label/Label";
import RadioInput from "@/components/common/RadioInput/RadioInput";
import Textarea from "@/components/common/Textarea/Textarea";
import { ko } from "date-fns/locale";

import DropDownImg from "@/icons/dropdown.svg";

import styles from "@/pages/help-me/register/HelpMeRegister.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import CustomDatePicker from "@/components/common/DatePicker/DatePicker";

const cn = classNames.bind(styles);

export default function HelpMeRegister() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className={cn("container")}>
      <p className={cn("title")}>도와줄래요?폼 작성</p>
      <div className={cn("contentContainer")}>
        <div className={cn("formContainer")}>
          <Button className={cn("infoButton")}>내 정보 불러오기</Button>
          <form className={cn("form")}>
            <div className={cn("titleContainer")}>
              <Label className={cn("label")} htmlFor="title">
                제목
              </Label>
              <Input
                className={cn("titleInput")}
                id="title"
                placeholder="구체적으로 필요한 도움을 적어주세요. 예) 이동 도움 필요"
              />
            </div>
            <div className={cn("genderAgeContainer")}>
              <div className={cn("genderContainer")}>
                <Label className={cn("label")} htmlFor="gender">
                  성별
                </Label>
                <RadioInput firstValue="male" secondValue="female" firstLabel="남성" secondLabel="여성" name="gender" />
              </div>
              <div className={cn("ageContainer")}>
                <Label className={cn("label")} htmlFor="age">
                  나이
                </Label>
                <Input className={cn("ageInput")} id="age" placeholder="숫자만 입력" />
              </div>
              <div className={cn("disabilityContainer")}>
                <Label className={cn("label")} htmlFor="disability">
                  장애 유형
                </Label>
                <Dropdown options={DISABILITY} id="disability" />
              </div>
              <div className={cn("helpTypeContainer")}>
                <Label className={cn("label")} htmlFor="help">
                  도움 유형
                </Label>
                <RadioInput
                  firstValue="education"
                  secondValue="life"
                  firstLabel="교육"
                  secondLabel="생활"
                  name="help"
                />
              </div>
              <div className={cn("periodContainer")}>
                <Label className={cn("label")} htmlFor="period ">
                  주기 구분
                </Label>
                <RadioInput
                  firstValue="regular"
                  secondValue="irregular"
                  firstLabel="정기"
                  secondLabel="비정기"
                  name="period"
                />
              </div>
              <Input className={cn("periodDetailInput")} id="periodDetail" placeholder="예) 1째주, 화목" />
            </div>
            <div className={cn("placeContainer")}>
              <Label className={cn("label")} htmlFor="place">
                장소
              </Label>
              <Dropdown options={PLACE} id="place" />
            </div>
            <div className={cn("dateContainer")}>
              <Label className={cn("label")} htmlFor="date">
                기간
              </Label>
              <div className={cn("dateBox")}>
                <div className={cn("date")}>
                  <CustomDatePicker
                    locale={ko}
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    dateFormat="yyyy년 MM월 dd일"
                  />
                  <DropDownImg className={cn("dropDownImg")} />
                </div>
                ~
                <div className={cn("date")}>
                  <CustomDatePicker
                    locale={ko}
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    dateFormat="yyyy년 MM월 dd일"
                  />
                  <DropDownImg className={cn("dropDownImg")} />
                </div>
              </div>
            </div>
            <div className={cn("detailContainer")}>
              <Label className={cn("label")} htmlFor="detail">
                내용
              </Label>
              <Textarea
                placeholder="도움이 필요한 정보를 상세하게 적어주세요. (인원/ 시간/ 세부 장소/ 도움 필요 내용)
ex, 2시에 전대치과병원에서 진료 이동 도움이 필요합니다."
                id="detail"
                className={cn("detailTextarea")}
              />
            </div>
            <div className={cn("buttonContainer")}>
              <Button type="submit" className={cn("button")}>
                제출하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
