import classNames from "classnames/bind";
import { ko } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";

import Button from "@/components/common/Button/Button";
import CustomDatePicker from "@/components/common/DatePicker/DatePicker";
import { DISABILITY, PLACE } from "@/components/common/DropDown/constants";
import Dropdown from "@/components/common/DropDown/DropDown";
import Input from "@/components/common/Input/Input";
import Label from "@/components/common/Label/Label";
import RadioInput from "@/components/common/RadioInput/RadioInput";
import Textarea from "@/components/common/Textarea/Textarea";
import styles from "@/components/page-layout/helpMeRegisterLayout/components/helpMeRegisterLayout.module.scss";
import DropDownImg from "@/icons/dropdown.svg";

const cn = classNames.bind(styles);

export default function HelpMeRegisterLayout() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <p className={cn("title")}>도와줄래요? 리스트 작성</p>
        <form className={cn("form")} onSubmit={handleSubmit((data) => console.log(data))}>
          <Button type="button" className={cn("getMyInfo")}>
            내 정보 불러오기
          </Button>
          <div className={cn("titleContainer")}>
            <Label className={cn("label")} htmlFor="title">
              제목
            </Label>
            <Input
              className={cn("titleInput")}
              id="title"
              placeholder="구체적으로 필요한 도움을 적어주세요. 예) 이동 도움 필요"
              {...register("title", { required: true })}
            />
          </div>
          <div className={cn("genderAgeContainer")}>
            <div className={cn("genderContainer")}>
              <Label className={cn("label")} htmlFor="gender">
                성별
              </Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <RadioInput {...field} firstValue="남성" secondValue="여성" />}
              />
            </div>
            <div className={cn("ageContainer")}>
              <Label className={cn("label")} htmlFor="age">
                나이
              </Label>
              <Input
                className={cn("ageInput")}
                id="age"
                placeholder="숫자만 입력"
                {...register("age", { required: true })}
              />
            </div>
            <div className={cn("disabilityContainer")}>
              <Label className={cn("label")} htmlFor="disability">
                장애 유형
              </Label>
              <Dropdown
                options={DISABILITY}
                onSelection={(option) => setValue("disability", option)}
                {...register("disability", { required: true })}
              />
            </div>
            <div className={cn("helpTypeContainer")}>
              <Label className={cn("label")} htmlFor="assistanceType">
                도움 유형
              </Label>
              <Controller
                name="assistanceType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <RadioInput {...field} firstValue="교육" secondValue="생활" />}
              />
            </div>
            <div className={cn("periodContainer")}>
              <Label className={cn("label")} htmlFor="scheduleType ">
                주기 구분
              </Label>
              <Controller
                name="scheduleType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <RadioInput {...field} firstValue="정기" secondValue="비정기" />}
              />
            </div>
            <Input
              className={cn("periodDetailInput")}
              id="scheduleDetail"
              placeholder="예) 1째주, 화목"
              {...register("scheduleDetail", { required: true })}
            />
          </div>
          <div className={cn("placeContainer")}>
            <Label className={cn("label")} htmlFor="district">
              장소
            </Label>
            <Dropdown
              options={PLACE}
              onSelection={(option) => setValue("district", option)}
              {...register("district", { required: true })}
            />
          </div>
          <div className={cn("dateContainer")}>
            <Label className={cn("label")} htmlFor="date">
              기간
            </Label>
            <div className={cn("dateBox")}>
              <div className={cn("date")}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomDatePicker
                      locale={ko}
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy년 MM월 dd일"
                      customInputRef={field.ref}
                    />
                  )}
                />
                <DropDownImg className={cn("dropDownImg")} />
              </div>
              ~
              <div className={cn("date")}>
                <Controller
                  name="endDate"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <CustomDatePicker
                      locale={ko}
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy년 MM월 dd일"
                      customInputRef={field.ref}
                    />
                  )}
                />
                <DropDownImg className={cn("dropDownImg")} />
              </div>
            </div>
          </div>
          <div className={cn("detailContainer")}>
            <Label className={cn("label")} htmlFor="content">
              내용
            </Label>
            <Textarea
              placeholder="도움이 필요한 정보를 상세하게 적어주세요. (인원/ 시간/ 세부 장소/ 도움 필요 내용)
ex, 2시에 전대치과병원에서 진료 이동 도움이 필요합니다."
              id="content"
              className={cn("detailTextarea")}
              {...register("content", { required: true })}
            />
          </div>
          <Button className={cn("registerBox")} disabled={!isValid}>
            등록하기
          </Button>
        </form>
      </div>
    </div>
  );
}
