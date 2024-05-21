import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Label from "@/components/common/Label/Label";
import RadioInput from "@/components/common/RadioInput/RadioInput";

import styles from "@/pages/help-me/register/HelpMeRegister.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function HelpMeRegister() {
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
                {/* <RadioInput /> */}
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
                <p>드롭다운</p>
              </div>
              <div className={cn("helpTypeContainer")}>
                <Label className={cn("label")} htmlFor="help">
                  도움 유형
                </Label>
                <p>라디오 버튼</p>
              </div>
              <div className={cn("periodContainer")}>
                <Label className={cn("label")} htmlFor="period ">
                  주기 구분
                </Label>
                <p>라디오 버튼</p>
              </div>
              <Input className={cn("periodDetailInput")} id="periodDetail" placeholder="예) 1째주, 화목" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
