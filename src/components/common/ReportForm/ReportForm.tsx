import { FormEvent, useState } from "react";

import classNames from "classnames/bind";

import { ReportTypes } from "./constants/index";
import styles from "./ReportForm.module.scss";
import InfoIcon from "../../../../public/icons/info.svg";


const cn = classNames.bind(styles);

interface formProps {
    nickname: string;
    postId: number;
    postType: string;
    setIsReportOpen: (value:boolean) => void;
}

export default function ReportForm ({nickname, postId, postType, setIsReportOpen}:formProps) {
    const [reportType, setReportType] = useState("");
    const [reportContent, setReportContent] = useState("");

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
    };

    return(
        <div className={cn("reportFormContainer")}>
            <div className={cn("header")}>
                <h2 className={cn("headerText")}>신고하기</h2>
                <button onClick={()=>setIsReportOpen(false)} className={cn("closeBtn")}>X</button>
            </div>
            <form onSubmit={handleSubmit} className={cn("contentBox")}>
                <div className={cn("postInfo")}>
                    <p className={cn("postInfoContent")}>
                        <span className={cn("postInfoLabel")}>작성자 닉네임</span>
                        <span className={cn("bar")}>|</span> 
                        {nickname}
                    </p>
                    <p className={cn("postInfoContent")}>
                        <span className={cn("postInfoLabel")}>게시글 정보</span>
                        <span className={cn("bar")}>|</span>
                        {postId}
                    </p>
                </div>
                <div className={cn("reportInfo")}>
                    <div className={cn("reportTypeBox")}>
                        <span className={cn("reportInfoLabel")}>신고 유형</span>
                        <select 
                            value={reportType} 
                            required 
                            onChange={(e) => setReportType(e.target.value)} 
                            className={cn("selectTypeBox",{defaultMsg:reportType===""})}>
                            <option value="">신고할 유형을 선택해 주세요.</option>
                            {ReportTypes.map(({label, value}, index) => (
                                <option key = {index} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cn("reportContentBox")}>
                        <span className={cn("reportInfoLabel")}>신고 내용</span>
                        <textarea 
                            placeholder="신고 이유 및 내용을 자세하게 설명해 주세요" 
                            required={reportType === "기타"} 
                            onChange={(e) => setReportContent(e.target.value)}
                            className={cn("reportContent")}
                        />
                    </div>
                </div>
                <div className={cn("noticeBox")}>
                    <p><InfoIcon className={cn("infoIcon")}/>신고하는 것에 해당하는지와 신고 내용이 맞는지 다시 한 번 확인하여 주시기 바랍니다.</p>
                    <p><InfoIcon className={cn("infoIcon")}/>신고를 제출하면 사실 관계 확인을 위해 신고자에게 객관적인 자료를 요청할 수 있습니다.</p>
                    <p>
                        <InfoIcon className={cn("infoIcon")}/>
                        신고자 정보 및 신고 내용은 신고 대상에게 공개되지 않으나, 사실 관계 확인에 꼭 필요한 신고 내용의 일부는 언급될 수 있습니다.
                    </p>
                    <p>
                        <InfoIcon className={cn("infoIcon")}/>
                        신고 대상은 Buddy Bridge 이용 약관에 따라 활동 제한 등 불이익을 받을 수 있으며, 사실 관계 확인 시 서로의 과실일 경우 신고자 또한 활동 제한 등의 불이익을 받을 수 있습니다.
                    </p>
                </div>
                <button className={cn("submitBtn",{takerReport:postType==="taker"})}>신고하기</button>
            </form>
        </div>
    );
}
