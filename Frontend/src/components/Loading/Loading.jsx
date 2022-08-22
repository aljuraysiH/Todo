import { TailSpin } from "react-loader-spinner";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div>
        <TailSpin color="var(--dark)" height={100} width={100} />
      </div>
    </div>
  );
};
export default Loading;
