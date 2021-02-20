import { useContext, useEffect, useState } from "react";
import IndexLayout from "../Layouts";
import InfoCards from "../components/InfoCards";
import RecentRequest from "../components/RecentRequest";
import { ApiContext } from "../context/ApiContext";
import ShareComponent from "../components/ShareComponent";
import SettingsPrompt from "../components/SettingsPrompt";
import UploadDoc from "../components/UploadDoc";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [data, setData] = useState([]);
  const [applications, setApplications] = useState("0");
  const { userInfo } = useContext(AuthContext).authValue;
  const { getRequest } = useContext(ApiContext).api;

  useEffect(() => {
    getRequest(1).then((res) => {
      setData([...res?.data]);
      setApplications(res.total_results_count);
    });
  }, []);

  return (
    <IndexLayout>
      <InfoCards applications={applications} />

      <div className="container-fluid py-3 px-md-5">
        <div className="row align-items-stretch">
          <RecentRequest data={data} />
          <UploadDoc />
        </div>
        <div className="row align-items-stretch py-2">
          <SettingsPrompt />
          <ShareComponent link={userInfo?.payment_link} />
        </div>
      </div>
    </IndexLayout>
  );
}
